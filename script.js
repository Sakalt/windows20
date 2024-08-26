// Simulate boot process
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('boot-screen').classList.add('hidden');
        document.getElementById('lock-screen').classList.remove('hidden');
        playStartupSound(); // Play startup sound after boot process
    }, 3000); // Boot screen for 3 seconds
});

// Unlock button functionality
document.getElementById('unlock-button').addEventListener('click', () => {
    document.getElementById('boot-screen').classList.add('hidden'); // Hide the boot screen
    document.getElementById('lock-screen').classList.add('hidden');
    document.getElementById('main-ui').classList.remove('hidden');
});

// Start menu functionality
document.getElementById('start-menu-button').addEventListener('click', () => {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.toggle('hidden');
});

// Function to play startup sound
async function playStartupSound() {
    try {
        const response = await fetch('sounds/startup-sound.mp3'); // Replace with your audio file path
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
