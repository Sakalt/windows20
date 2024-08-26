document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('browser-button').addEventListener('click', () => {
        const browser = document.getElementById('browser');
        browser.classList.toggle('hidden');
        if (!browser.classList.contains('hidden')) {
            initializeBrowser();
        }
    });

    function initializeBrowser() {
        // Define HTML content for the browser
        const browserHtml = `
            <div id="browser-window">
                <div id="browser-title-bar">
                    <button id="minimize-button">_</button>
                    <button id="maximize-button">[]</button>
                    <button id="close-button">X</button>
                </div>
                <div id="browser-controls">
                    <button id="back-button">戻る</button>
                    <button id="forward-button">進む</button>
                    <button id="refresh-button">更新</button>
                    <input type="text" id="url-input" placeholder="URLを入力">
                    <button id="go-button">移動</button>
                </div>
                <div id="tabs">
                    <!-- Tabs will be dynamically created here -->
                </div>
                <div id="browser-content">
                    <!-- Browser content will be dynamically loaded here -->
                </div>
            </div>
        `;

        // Add the HTML to the browser content area
        document.getElementById('browser').innerHTML = browserHtml;

        // Initialize tabs
        let tabs = [];
        let activeTab = null;

        function createTab(title, content) {
            const tabButton = document.createElement('button');
            tabButton.textContent = title;
            tabButton.addEventListener('click', () => {
                setActiveTab(title);
            });

            document.getElementById('tabs').appendChild(tabButton);

            const tabContent = document.createElement('div');
            tabContent.innerHTML = content;
            tabContent.style.display = 'none';
            document.getElementById('browser-content').appendChild(tabContent);

            tabs.push({ title, content: tabContent });
            if (activeTab === null) {
                setActiveTab(title);
            }
        }

        function setActiveTab(title) {
            tabs.forEach(tab => {
                tab.content.style.display = tab.title === title ? 'block' : 'none';
            });
            activeTab = title;
        }

        // Button functionalities
        document.getElementById('back-button').addEventListener('click', () => {
            if (activeTab !== null) {
                alert('戻る');
                // Add code to navigate back in history
            }
        });

        document.getElementById('forward-button').addEventListener('click', () => {
            if (activeTab !== null) {
                alert('進む');
                // Add code to navigate forward in history
            }
        });

        document.getElementById('refresh-button').addEventListener('click', () => {
            if (activeTab !== null) {
                alert('更新');
                // Add code to refresh the content of the active tab
            }
        });

        document.getElementById('go-button').addEventListener('click', () => {
            const url = document.getElementById('url-input').value;
            if (url) {
                createTab(url, `<iframe src="${url}" width="100%" height="100%" style="border: none;"></iframe>`);
            }
        });

        // Initialize with a default tab
        createTab('Home', '<h1>Welcome to the browser</h1><p>This is a mock browser.</p>');

        // Window controls
        document.getElementById('minimize-button').addEventListener('click', () => {
            document.getElementById('browser-window').style.display = 'none';
        });

        document.getElementById('maximize-button').addEventListener('click', () => {
            const browserWindow = document.getElementById('browser-window');
            if (browserWindow.style.width === '100%' && browserWindow.style.height === '100%') {
                browserWindow.style.width = '';
                browserWindow.style.height = '';
                browserWindow.style.top = '';
                browserWindow.style.left = '';
            } else {
                browserWindow.style.width = '100%';
                browserWindow.style.height = '100%';
                browserWindow.style.top = '0';
                browserWindow.style.left = '0';
            }
        });

        document.getElementById('close-button').addEventListener('click', () => {
            document.getElementById('browser').classList.add('hidden');
        });

        // Drag functionality
        dragElement(document.getElementById('browser-window'));

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
