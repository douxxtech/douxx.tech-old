// Badapl.js | Logs bad apple in the dev console when devtools opens | from noskid.today
async function playBadApl() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/dpipstudio/noskid.today/refs/heads/main/website/assets/vids/ba.tmov');
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const content = await response.text();
    const jsonEndIndex = content.indexOf('\n#=');
    const jsonString = content.substring(0, jsonEndIndex);
    const metadata = JSON.parse(jsonString);
    const framesContent = content.substring(jsonEndIndex + 1);

    const frames = framesContent.split(metadata.ascii.frameDelimiter || '!$$!');
    const validFrames = frames
      .filter(frame => frame.length > 0)
      .map(frame => frame.replace(/^\n+|\n+$/g, ''));

    console.log(`Loaded BadAPL ascii: ${validFrames.length} frames`, 'success');
    console.log(`Duration: ${metadata.playback.totalDurationMs / 1000}s`, 'success');
    console.log(`FPS: ${metadata.ascii.fps}`, 'success');

    console.clear();
    console.log('%c⚠️ EPILEPSY WARNING ⚠️', 'color: red; font-size: 24px; font-weight: bold;');
    console.log('%cThis animation contains rapidly flashing images', 'color: orange; font-size: 16px;');
    console.log('%cIf you have epilepsy or are sensitive to flashing lights,', 'color: orange; font-size: 16px;');
    console.log('%cplease close this console now.', 'color: orange; font-size: 16px;');
    console.log('%cAnimation will start in 5 seconds...', 'color: yellow; font-size: 14px;');

    await new Promise(resolve => setTimeout(resolve, 5000));

    const frameDuration = metadata.playback.frameDuration || (1000 / metadata.ascii.fps);
    const audio = new Audio('https://raw.githubusercontent.com/douxxtech/noskid.today/refs/heads/main/assets/audio/ba.mp3');

    await new Promise((resolve, reject) => {
      audio.addEventListener('canplaythrough', resolve, { once: true });
      audio.addEventListener('error', () => reject('Audio failed to load'), { once: true });
    });

    let currentFrame = 0;
    let startTime = null;
    let playbackInterval = null;

    function displayFrame() {
      if (currentFrame >= validFrames.length) {
        console.log('BadApl console playback finished', 'success');
        if (playbackInterval) clearInterval(playbackInterval);
        return;
      }

      console.clear();
      console.log(`Frame ${currentFrame + 1}/${validFrames.length}`);
      console.log(`Time: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
      console.log('Github -> github.com/douxxtech/noskid.today');
      console.log('Contact -> douxx@douxx.tech');
      console.log('');
      console.log(validFrames[currentFrame]);
      currentFrame++;
    }

    await new Promise((resolve, reject) => {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setTimeout(resolve, 100);
          })
          .catch(err => {
            console.log('Audio playback failed: ' + err, 'error');
            resolve();
          });
      } else {
        setTimeout(resolve, 200);
      }
    });

    startTime = Date.now();
    displayFrame();

    playbackInterval = setInterval(() => {
      displayFrame();
    }, frameDuration);

    return {
      stop: () => {
        if (playbackInterval) clearInterval(playbackInterval);
        audio.pause();
        audio.currentTime = 0;
        console.log('Console BadApl Stopped', 'success');
      },
      metadata: metadata,
      totalFrames: validFrames.length
    };

  } catch (error) {
    console.error('Error playing badapl ascii: ' + error);
    return null;
  }
}

function isMobileDevice() { // thanks to claude ngl
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
  const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 1024;

  const hasMobileFeatures = typeof window.orientation !== 'undefined' ||
    /Mobi|Android/i.test(navigator.userAgent);

  return isMobileUA || (isTouchDevice && isSmallScreen) || hasMobileFeatures;
}

if (!isMobileDevice()) {
  let initialOuterHeight = window.outerHeight;
  let initialInnerHeight = window.innerHeight;
  let lastTriggered = 0;

  function detectDevtools() {
    const currentOuterHeight = window.outerHeight;
    const currentInnerHeight = window.innerHeight;

    const outerDiff = Math.abs(currentOuterHeight - initialOuterHeight);
    const innerDiff = Math.abs(currentInnerHeight - initialInnerHeight);

    const significantChange = innerDiff > 100 || (outerDiff > 50 && innerDiff > outerDiff);

    const now = Date.now();
    const timeSinceLastTrigger = now - lastTriggered;

    if (significantChange && timeSinceLastTrigger > 2000) {
      console.log('Devtools opening detected!', 'success');
      lastTriggered = now;

      playBadApl();
    }
  }

  function devtoolsDetectionLoop() {
    let devtools = {
      open: false,
      orientation: null
    };

    setInterval(() => {
      const heightThreshold = window.outerHeight - window.innerHeight > 200;
      const widthThreshold = window.outerWidth - window.innerWidth > 200;

      if (!(heightThreshold && widthThreshold) &&
          ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || heightThreshold || widthThreshold)) {

        if (!devtools.open) {
          devtools.open = true;
          console.log('Devtools opened detected via polling!', 'success');
          const fakeEvent = { preventDefault: () => {} };
          playBadApl(fakeEvent);
        }
      } else {
        devtools.open = false;
      }
    }, 500);
  }

  window.addEventListener('resize', () => {
    setTimeout(detectDevtools, 100);
  });

  devtoolsDetectionLoop();

  console.log('BadApple devtools detection enabled (Desktop detected)', 'success');
}
