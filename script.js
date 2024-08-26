// Simulate boot process
window.addEventListener('load', () => {
    const bootScreen = document.getElementById('boot-screen');
    const lockScreen = document.getElementById('lock-screen');
    const mainUI = document.getElementById('main-ui');

    // ブート画面の表示とロック画面への切り替え
    if (bootScreen && lockScreen && mainUI) {
        bootScreen.classList.remove('hidden'); // ブート画面を表示
        setTimeout(() => {
            bootScreen.classList.add('hidden'); // ブート画面を非表示
            lockScreen.classList.remove('hidden'); // ロック画面を表示
            playStartupSound(); // スタートアップ音を再生
        }, 3000); // 3秒後にロック画面に切り替え
    } else {
        console.error('One or more elements are missing.');
    }
});

// Unlock button functionality
document.getElementById('unlock-button').addEventListener('click', () => {
    const lockScreen = document.getElementById('lock-screen');
    const mainUI = document.getElementById('main-ui');

    if (lockScreen && mainUI) {
        lockScreen.classList.add('hidden'); // ロック画面を非表示
        mainUI.classList.remove('hidden'); // メインUIを表示
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
        const response = await fetch('sounds/startup-sound.mp3'); // 音声ファイルのパス
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
