//Url.js | Change the URL every 5 seconds with a random message // from noskid.today


const urlmsg = [
    'Hello, world',
    'douxx@douxx.tech btw',
    'check out noskid.today :)',
    'invaders must die',
    'haiiiiii',
    'UwU',
    '@douxx.xyz on discord',
    '@douxxtech on github'
];

let currentMessage = '';
let showedError = false;

function getRandomMessage() {
    let randomMessage;
    do {
        randomMessage = urlmsg[Math.floor(Math.random() * urlmsg.length)];
    } while (randomMessage === currentMessage && urlmsg.length > 1);
    return randomMessage;
}

function changeUrl(urlmsg) {
    if (history.replaceState) {
        urlmsg = urlmsg.replace(/\s+/g, '-');
        const url = `${window.location.origin}${window.location.pathname}?${message}`;
        history.replaceState(null, '', url);
    } else {
        if (!showedError) {
            log('History API not supported, unable to change URL.', 'error');
            showedError = true;
        }
    }
}

function updateMessage() {
    const urlmsg = getRandomMessage();
    currentMessage = urlmsg;
    changeUrl(urlmsg);
}

updateMessage();

setInterval(updateMessage, 5000);