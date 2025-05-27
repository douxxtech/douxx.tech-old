function changeTitle() {
    document.title = "/!\\ ALERT /!\\";
}

function restoreTitle() {
    document.title = "Oh, there is no alert, I just want you back here";
}

window.addEventListener('blur', changeTitle);
window.addEventListener('focus', restoreTitle);
