// script.js

// Simulate boot process
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('boot-screen').classList.add('hidden');
        document.getElementById('lock-screen').classList.remove('hidden');
    }, 3000); // Boot screen for 3 seconds
});

// Unlock button functionality
document.getElementById('unlock-button').addEventListener('click', () => {
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('main-ui').classList.remove('hidden');
});

// Start menu functionality
document.getElementById('start-menu-button').addEventListener('click', () => {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('hidden');
});
