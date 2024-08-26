document.addEventListener('DOMContentLoaded', () => {
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
                    <button id="minimize-button">_</button>
                    <button id="maximize-button">[]</button>
                    <button id="close-button">X</button>
                </div>
                <div id="explorer-sidebar">
                    <ul>
                        <li><button id="home-button">ホーム</button></li>
                        <li><button id="documents-button">ドキュメント</button></li>
                        <li><button id="downloads-button">ダウンロード</button></li>
                    </ul>
                </div>
                <div id="explorer-content">
                    <!-- Explorer content will be dynamically loaded here -->
                </div>
            </div>
        `;

        // Add the HTML to the explorer content area
        document.getElementById('explorer').innerHTML = explorerHtml;

        // Button functionalities
        document.getElementById('home-button').addEventListener('click', () => {
            loadExplorerContent('home');
        });

        document.getElementById('documents-button').addEventListener('click', () => {
            loadExplorerContent('documents');
        });

        document.getElementById('downloads-button').addEventListener('click', () => {
            loadExplorerContent('downloads');
        });

        function loadExplorerContent(section) {
            const contentDiv = document.getElementById('explorer-content');
            if (section === 'home') {
                contentDiv.innerHTML = '<h2>ホーム</h2><p>ホームディレクトリの内容</p>';
            } else if (section === 'documents') {
                contentDiv.innerHTML = '<h2>ドキュメント</h2><p>ドキュメントの内容</p>';
            } else if (section === 'downloads') {
                contentDiv.innerHTML = '<h2>ダウンロード</h2><p>ダウンロードの内容</p>';
            }
        }

        // Initialize with the home section
        loadExplorerContent('home');

        // Window controls
        document.getElementById('minimize-button').addEventListener('click', () => {
            document.getElementById('explorer-window').style.display = 'none';
        });

        document.getElementById('maximize-button').addEventListener('click', () => {
            const explorerWindow = document.getElementById('explorer-window');
            if (explorerWindow.style.width === '100%' && explorerWindow.style.height === '100%') {
                explorerWindow.style.width = '';
                explorerWindow.style.height = '';
                explorerWindow.style.top = '';
                explorerWindow.style.left = '';
            } else {
                explorerWindow.style.width = '100%';
                explorerWindow.style.height = '100%';
                explorerWindow.style.top = '0';
                explorerWindow.style.left = '0';
            }
        });

        document.getElementById('close-button').addEventListener('click', () => {
            document.getElementById('explorer').classList.add('hidden');
        });

        // Drag functionality
        dragElement(document.getElementById('explorer-window'));

        function dragElement(elmnt) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id + '-title-bar')) {
                // if present, the header is where you move the DIV from:
                document.getElementById(elmnt.id + '-title-bar').onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
});
