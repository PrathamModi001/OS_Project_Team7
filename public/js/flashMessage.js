function flashMessage(message, duration = 3000, show = true) {
    const flashMessage = document.getElementById('flash-message');
    flashMessage.innerText = message;
    flashMessage.style.display = show ? 'block' : 'none';
    setTimeout(() => {
        flashMessage.style.display = 'none';
    }, duration);
}