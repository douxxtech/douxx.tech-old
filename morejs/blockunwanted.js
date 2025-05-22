//blocks unwanted actions


document.addEventListener("contextmenu", (e) => e.preventDefault());

document.onselectstart = () => false;
document.onmousedown = () => false;

function ctrlShiftKey(e, keyCode) {
    return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

// Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
document.onkeydown = (e) => {
    if (
        event.keyCode === 123 ||
        ctrlShiftKey(e, "I") ||
        ctrlShiftKey(e, "J") ||
        ctrlShiftKey(e, "C") ||
        (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
    ) {
        return false;
    }
};