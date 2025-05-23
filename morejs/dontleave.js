const messages = [
    "Where are you going uh ?",
    "Are ya leaving bruh ?  <img src='assets/img//skull.svg' width='32' height='32' class='alert-skull'>",
    "Stay here brother",
    "3==>",
    `<img src='assets/img/screamer1.webp' width='${window.screen.width}' height='${window.screen.height}' class='alert-screamer'>`,
    "invaders must die.",
    "Dont leave me alone !",
    "check out futureofthe.tech",
    "check out noskid.today",
    getSystemInfo()
];


let city = ""
let isp = ""
let country = ""
let ip = ""

let alertOverlay = document.getElementById("alert-overlay");
if (!alertOverlay) {
    alertOverlay = document.createElement("div");
    alertOverlay.id = "alert-overlay";
    alertOverlay.style.display = "none";
    alertOverlay.style.position = "fixed";
    alertOverlay.style.top = "0";
    alertOverlay.style.left = "0";
    alertOverlay.style.width = "100%";
    alertOverlay.style.height = "100%";
    alertOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    alertOverlay.style.zIndex = "9999";
    alertOverlay.style.justifyContent = "center";
    alertOverlay.style.alignItems = "center";
    alertOverlay.style.color = "white";
    alertOverlay.style.fontSize = "24px";
    alertOverlay.style.textAlign = "center";
    alertOverlay.style.cursor = "pointer";
    document.body.appendChild(alertOverlay);
}

let isAlertShown = false;

document.addEventListener("mouseleave", (event) => {
      if (event.clientY <= 0 && !isAlertShown) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      alertOverlay.innerHTML = randomMessage;
      alertOverlay.style.display = "flex";
      isAlertShown = true;
    }
});

document.addEventListener("mouseenter", () => {
      if (isAlertShown) {
      alertOverlay.style.display = "none";
      isAlertShown = false;
    }
});

alertOverlay.addEventListener("click", () => {
    alertOverlay.style.display = "none";
    isAlertShown = false;
});

function getSystemInfo() {
    let info = '[+] Hostname: ' + window.location.hostname + '<br>';
    info += '[+] User Agent: ' + navigator.userAgent + '<br>';
    info += '[+] Language: ' + navigator.language + '<br>';
    info += '[+] Screen Resolution: ' + window.screen.width + 'x' + window.screen.height + '<br>';
    info += '[+] Browser Width: ' + window.innerWidth + '<br>';
    info += '[+] Browser Height: ' + window.innerHeight + '<br>';
    info += '[+] Location: ' + window.location.href + '<br>';
    info += '[+] Timezone Offset: ' + new Date().getTimezoneOffset() + ' minutes<br>';
    info += '[+] Vendor: ' + navigator.vendor + '<br>';
    info += '[+] Languages: ' + navigator.languages + '<br>';
    
    if (navigator.connection) {
        info += '[+] Effective Connection Type: ' + navigator.connection.effectiveType + '<br>';
        info += '[+] Downlink: ' + navigator.connection.downlink + ' Mbps<br>';
    }

    return info;
}

async function getIpInfo() {
    try {
        const response = await fetch('https://ip.douxx.tech');
        const data = await response.json();
    
        if (data.status === 'success') {
            country = data.country;
            city = data.city;
            isp = data.isp;
            ip = data.query;
            ok = "success";

            if (country) messages.push(`I'm planning to visit ${country} this summer!`);
            if (city) messages.push(`Is the life in ${city} good ?`);
            if (isp) messages.push(`Nah men don't tell me you're with ${isp}  <img src='assets/img/skull.svg' width='32' height='32' class='alert-skull'> <img src='assets/img/skull.svg' width='32' height='32' class='alert-skull'>`);
            if (ip) messages.push(`Okey i'm leaking this: ${ip}`);
        }
    } catch (error) {
        console.log(error);
    }
}

getIpInfo();

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'w') {
        event.preventDefault();
    }
});

for (let i = 0; i < 20; i++) {
    console.log('%cHold up!', 'color: #5865f2; font-size: 100px; font-weight: bold; text-shadow: 2px 2px black;');
    console.log('%cInvaders must die. Go away!', 'color: red; font-style: italic; font-size: 20px;');
    console.log('%cIf you need any help, Contact @douxx.xyz on discord or send a mail to douxx@douxx.tech!', 'color: white; font-size: 18px;');
}