//Url.js | Change the URL every 5 seconds with a random message // from noskid.today


const messages = [
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
        randomMessage = messages[Math.floor(Math.random() * messages.length)];
    } while (randomMessage === currentMessage && messages.length > 1);
    return randomMessage;
}

function changeUrl(message) {
    if (history.replaceState) {
        message = message.replace(/\s+/g, '-');
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
    const message = getRandomMessage();
    currentMessage = message;
    changeUrl(message);
}

updateMessage();

setInterval(updateMessage, 5000);