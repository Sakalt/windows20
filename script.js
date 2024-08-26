// Simulate boot process
window.addEventListener('load', () => {
    const bootScreen = document.getElementById('boot-screen');
    const lockScreen = document.getElementById('lock-screen');
    const mainUI = document.getElementById('main-ui');

    if (bootScreen && lockScreen && mainUI) {
        setTimeout(() => {
            bootScreen.classList.add('hidden');
            lockScreen.classList.remove('hidden');
            playStartupSound(); // Play startup sound after boot process
        }, 3000); // Boot screen for 3 seconds
    } else {
        console.error('One or more elements are missing.');
    }
});

// Unlock button functionality
document.getElementById('unlock-button').addEventListener('click', () => {
    const bootScreen = document.getElementById('boot-screen');
    const lockScreen = document.getElementById('lock-screen');
    const mainUI = document.getElementById('main-ui');

    if (bootScreen && lockScreen && mainUI) {
        bootScreen.classList.add('hidden'); // Hide the boot screen
        lockScreen.classList.add('hidden');
        mainUI.classList.remove('hidden');
    } else {
        console.error('One or more elements are missing.');
    }
});

// Start menu functionality
document.getElementById('start-menu-button').addEventListener('click', () => {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('hidden');
});

// Function to play startup sound
async function playStartupSound() {
    try {
        const response = await fetch('sounds/startup-sound.mp3'); // Path to audio file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    } catch (error) {
        console.error('Error playing startup sound:', error);
    }
}
