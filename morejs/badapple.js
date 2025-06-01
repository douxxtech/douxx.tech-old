//Badapl.js | taken from noskid.today
async function playBadApl(event) {
  event.preventDefault();

  try {
    const response = await fetch('https://raw.githubusercontent.com/douxxtech/noskid.today/refs/heads/main/assets/vids/ba.tmov');
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

    console.log(`Loaded BadAPL ascii: ${validFrames.length} frames`);
    console.log(`Duration: ${metadata.playback.totalDurationMs / 1000}s`);
    console.log(`FPS: ${metadata.ascii.fps}`);

    const frameDuration = metadata.playback.frameDuration || (1000 / metadata.ascii.fps);
    const audio = new Audio('https://github.com/douxxtech/noskid.today/raw/refs/heads/main/assets/audio/ba.mp3');

    await new Promise((resolve, reject) => {
      audio.addEventListener('canplaythrough', resolve, { once: true });
      audio.addEventListener('error', () => reject('Audio failed to load'), { once: true });
    });

    let currentFrame = 0;
    let startTime = null;
    let playbackInterval = null;

    function displayFrame() {
      if (currentFrame >= validFrames.length) {
        log('BadApl console playback finished', 'success');
        if (playbackInterval) clearInterval(playbackInterval);
        return;
      }

      console.clear();
      console.log(`Frame ${currentFrame + 1}/${validFrames.length}`);
      console.log(`Time: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
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
            console.log('Audio playback failed: ' + err);
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
        console.log('Console BadApl Stopped');
      },
      metadata: metadata,
      totalFrames: validFrames.length
    };

  } catch (error) {
    console.error('Error playing badapl ascii: ' + error);
    return null;
  }
}

window.addEventListener('resize', (event) => {
    playBadApl(event);
});