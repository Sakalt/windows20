// explorer.js

document.getElementById('explorer-button').addEventListener('click', () => {
    const explorer = document.getElementById('explorer');
    explorer.classList.toggle('hidden');
    if (!explorer.classList.contains('hidden')) {
        initializeExplorer();
    }
});

function initializeExplorer() {
    // Define HTML content for the explorer
    const explorerHtml = `
        <div id="explorer-window">
            <div id="explorer-title-bar">
                <button id="back-button">戻る</button>
                <button id="forward-button">進む</button>
                <button id="close-button">閉じる</button>
            </div>
            <div id="file-list">
                <!-- File items will be dynamically created here -->
            </div>
        </div>
    `;

    // Add the HTML to the explorer content area
    document.getElementById('explorer').innerHTML = explorerHtml;

    // Initialize file navigation
    let currentPath = '/';
    let history = [currentPath];
    let historyIndex = 0;

    function updateFileList(path) {
        // Simulate a file system
        const files = {
            '/': ['Documents', 'Downloads', 'Pictures', 'Videos'],
            '/Documents': ['file1.txt', 'file2.docx'],
            '/Downloads': ['setup.exe', 'installer.pkg'],
            '/Pictures': ['image1.jpg', 'image2.png'],
            '/Videos': ['video1.mp4', 'video2.mov']
        };

        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';

        if (files[path]) {
            files[path].forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.textContent = file;
                fileItem.className = 'file-item';
                fileItem.addEventListener('click', () => {
                    const newPath = `${path}/${file}`;
                    if (files[newPath]) {
                        currentPath = newPath;
                        updateFileList(newPath);
                        history = history.slice(0, historyIndex + 1);
                        history.push(currentPath);
                        historyIndex++;
                    }
                });
                fileList.appendChild(fileItem);
            });
        }
    }

    function updateNavigationButtons() {
        document.getElementById('back-button').disabled = historyIndex <= 0;
        document.getElementById('forward-button').disabled = historyIndex >= history.length - 1;
    }

    document.getElementById('back-button').addEventListener('click', () => {
        if (historyIndex > 0) {
            historyIndex--;
            currentPath = history[historyIndex];
            updateFileList(currentPath);
            updateNavigationButtons();
        }
    });

    document.getElementById('forward-button').addEventListener('click', () => {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            currentPath = history[historyIndex];
            updateFileList(currentPath);
            updateNavigationButtons();
        }
    });

    document.getElementById('close-button').addEventListener('click', () => {
        document.getElementById('explorer').classList.add('hidden');
    });

    // Initialize with the root directory
    updateFileList(currentPath);
}
