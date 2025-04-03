const passwordScreen = document.getElementById('password-screen');
const mainScreen = document.getElementById('main-screen');
const currentTimeElement = document.querySelector('.current-time');

// Check if user is already authenticated
if (!sessionStorage.getItem('authenticated')) {
    passwordScreen.classList.add('active');
    mainScreen.classList.add('hidden');
} else {
    passwordScreen.classList.remove('active');
    mainScreen.classList.remove('hidden');
}

function checkPassword() {
    const passwordInput = document.getElementById('password-input');
    if (passwordInput.value === 'king') {
        sessionStorage.setItem('authenticated', 'true');
        passwordScreen.classList.remove('active');
        mainScreen.classList.remove('hidden');
        updateCurrentTime();
    } else {
        alert('Incorrect password');
        passwordInput.value = '';
    }
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTimeElement.textContent = `${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// Update time every second if authenticated
if (sessionStorage.getItem('authenticated')) {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
} 
