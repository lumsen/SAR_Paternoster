// Admin functionality for admin.html - Modernized version
document.addEventListener('DOMContentLoaded', function() {
    // Wait for storage to be available
    const waitForStorage = () => {
        if (typeof storage !== 'undefined') {
            initAdmin();
        } else {
            setTimeout(waitForStorage, 10);
        }
    };
    waitForStorage();

    function initAdmin() {
        const password = storage.getConfig().adminPassword;
    const loginBtn = document.getElementById('loginBtn');
    let currentTab = 'articlesTab';

    // Modern login function
    function login() {
        const passwordEl = document.getElementById('password');
        const inputPwd = passwordEl.value.trim();

        // Add loading state
        loginBtn.innerHTML = 'Anmeldung...';
        loginBtn.disabled = true;

        if (inputPwd === password) {
            // Successful login animation
            document.getElementById('login').style.transform = 'translateY(-20px)';
            document.getElementById('login').style.opacity = '0';

            setTimeout(() => {
                document.getElementById('login').style.display = 'none';
                document.getElementById('adminPanel').style.display = 'block';
                document.getElementById('adminPanel').style.opacity = '0';
                document.getElementById('adminPanel').style.transform = 'translateY(20px)';

                // Fade in panel
                setTimeout(() => {
                    document.getElementById('adminPanel').style.opacity = '1';
                    document.getElementById('adminPanel').style.transform = 'translateY(0)';

                    // Load data and show interface
                    setTimeout(() => {
                        loadArticles();
                        loadLogs();
                        switchTab('articlesTab');
                    }, 100);
                }, 50);
            }, 300);
        } else {
            // Error animation
            passwordEl.style.borderColor = '#ff3333';
            passwordEl.style.boxShadow = '0 0 8px rgba(255, 51, 51, 0.5)';
            passwordEl.classList.add('input-error');

            loginBtn.innerHTML = 'Anmelden';
            loginBtn.disabled = false;

            setTimeout(() => {
                passwordEl.style.borderColor = '';
                passwordEl.style.boxShadow = '';
                passwordEl.classList.remove('input-error');
                passwordEl.focus();
            }, 1500);

            alert('Falsches Passwort');
            passwordEl.value = '';
        }
    }

    // Add event listeners
    loginBtn.addEventListener('click', login);
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            login();
        }
    });

    // Tab switching with smooth animations
    const tabs = document.querySelectorAll('.admin-nav button');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Visual feedback
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
                const tabId = this.dataset.tab;
                switchTab(tabId);
            }, 100);
        });
    });

    function switchTab(tabId) {
        if (currentTab === tabId) return; // No change needed

        const previousTab = document.getElementById(currentTab);
        const targetTab = document.getElementById(tabId);

        if (!targetTab) {
            // Tab not found error (removed console.error for production)
            return;
        }

        // Smooth transition
        if (previousTab) {
            previousTab.style.transform = 'translateX(0)';
            previousTab.style.opacity = '0';

            setTimeout(() => {
                previousTab.classList.remove('active');
                previousTab.style.opacity = '';
                previousTab.style.transform = '';
            }, 200);
        }

        targetTab.style.transform = 'translateX(20px)';
        targetTab.style.opacity = '0';
        targetTab.classList.add('active');

        setTimeout(() => {
            targetTab.style.transform = 'translateX(0)';
            targetTab.style.opacity = '1';
        }, 50);

        currentTab = tabId;

        // Update active navigation button
        document.querySelectorAll('.admin-nav button').forEach(btn => {
            btn.classList.remove('active');
        });

        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);

        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    // Article management
    function loadArticles() {
        try {
            const articles = storage.getArticles();
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) {
            // Table not found - retry after delay (removed console.error for production)
            // Retry loading after a short delay in case DOM is still rendering
            setTimeout(() => loadArticles(), 500);
            return;
        }
            tbody.innerHTML = '';
            articles.forEach((article, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td contenteditable="true" data-field="name" data-index="${index}">${article.name}</td>
                    <td>${article.code}</td>
                    <td contenteditable="true" data-field="group" data-index="${index}">${article.group}</td>
                    <td contenteditable="true" data-field="location" data-index="${index}">${article.location}</td>
                    <td contenteditable="true" data-field="stock" data-index="${index}">${article.stock}</td>
                    <td>
                        <input type="checkbox" ${article.approved ? 'checked' : ''} data-field="approved" data-index="${index}">
                    </td>
                    <td>
                        <button class="delete-btn" data-index="${index}">Löschen</button>
                        ${article.stock === 0 ? `<button class="reactivate-btn" data-index="${index}">Reaktivieren</button>` : ''}
                    </td>
                `;
                tbody.appendChild(row);
            });
            // Wait for DOM update before adding event listeners
            setTimeout(() => {
                try {
                    // Event listeners for contenteditable and buttons
                    document.querySelectorAll('#inventoryTableBody td[contenteditable]').forEach(cell => {
                        cell.addEventListener('blur', function() {
                            const index = this.dataset.index;
                            const field = this.dataset.field;
                            const value = this.textContent.trim();
                            let processedValue = value;

                            if (field === 'stock') {
                                processedValue = parseInt(value) || 0;
                                this.textContent = processedValue; // Update display
                            }

                            updateArticleField(index, field, processedValue);
                        });
                        cell.addEventListener('keypress', function(e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                this.blur();
                            }
                        });
                    });
                    document.querySelectorAll('#inventoryTableBody input[type="checkbox"]').forEach(cb => {
                        cb.addEventListener('change', function() {
                            const index = this.dataset.index;
                            updateArticleField(index, 'approved', this.checked);
                        });
                    });
                    document.querySelectorAll('#inventoryTableBody .delete-btn').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const index = this.dataset.index;
                            deleteArticle(index);
                        });
                    });
                    document.querySelectorAll('#inventoryTableBody .reactivate-btn').forEach(btn => {
                        btn.addEventListener('click', function() {
                            const index = this.dataset.index;
                            reactivateArticle(index);
                        });
                    });
                    // Articles table loaded successfully - removed console.log for production
                } catch (error) {
                    // Error adding event listeners - removed console.error for production
                }
            }, 0);
        } catch (error) {
            // Error loading article table - removed console.error for production
        }
    }

    function updateArticleField(index, field, value) {
        const articles = storage.getArticles();
        const article = articles[index];
        if (article) {
            article[field] = value;
            storage.saveArticles(articles);
            // Update datalists if necessary
            if (field === 'name' || field === 'code') {
                loadArticleSelect();
                init();
            }
        }
    }

    function deleteArticle(index) {
        const articles = storage.getArticles();
        if (confirm(`Artikel "${articles[index].name}" löschen?`)) {
            articles.splice(index, 1);
            storage.saveArticles(articles);
            loadArticles();
        }
    }

    function reactivateArticle(index) {
        const articles = storage.getArticles();
        articles[index].approved = true;
        storage.saveArticles(articles);
        loadArticles();
    }

    document.getElementById('addArticleBtn').addEventListener('click', function() {
        const name = document.getElementById('articleName').value.trim();
        const group = document.getElementById('articleGroup').value.trim();
        const location = document.getElementById('articleLocation').value.trim();
        const stock = parseInt(document.getElementById('articleStock').value);
        const approved = document.getElementById('articleApproved').checked;
        const imageFile = document.getElementById('articleImage').files[0];
        
        if (name && group && location && !isNaN(stock)) {
            const articles = storage.getArticles();
            const id = 'P' + (articles.length + 1).toString().padStart(4, '0');
            const article = {
                id: id,
                name: name,
                group: group,
                location: location,
                approved: approved,
                stock: stock,
                image: imageFile ? URL.createObjectURL(imageFile) : '',
                code: id
            };
            articles.push(article);
            storage.saveArticles(articles);
            loadArticles();
            // Clear form
            document.querySelectorAll('#articlesTab input').forEach(input => {
                input.value = '';
                if (input.type === 'checkbox') input.checked = false;
            });
        } else {
            alert('Bitte alle Felder ausfüllen');
        }
    });

    // Code generation
    document.getElementById('generateCodesBtn').addEventListener('click', function() {
        const articleId = document.getElementById('articleSelect').value;
        const qty = parseInt(document.getElementById('qty').value);
        const container = document.getElementById('codesContainer');
        container.innerHTML = '';

        // Generate random display strings for the barcodes (not the actual encoding)
        function generateRandomDisplay() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            const length = Math.floor(Math.random() * 3) + 6; // 6-8 chars
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        }

        // Open new window for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Barcode-Ausdruck - ${articleId}</title>
                <style>
                    body {
                        font-family: monospace;
                        margin: 20px;
                        background: white;
                        color: black;
                    }
                    .barcode-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        justify-content: center;
                    }
                    .barcode-item {
                        border: 1px solid #ccc;
                        padding: 10px;
                        text-align: center;
                        page-break-inside: avoid;
                    }
                    h1 {
                        text-align: center;
                        color: #333;
                        margin-bottom: 30px;
                    }
                    @media print {
                        .barcode-item {
                            border: none !important;
                            page-break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <h1>Artikel: ${articleId}</h1>
                <div class="barcode-container" id="barcodesPrint"></div>
            </body>
            </html>
        `);

        const printContainer = printWindow.document.getElementById('barcodesPrint');

        // Generate barcodes in print window with random display strings
        for (let i = 0; i < qty; i++) {
            const itemDiv = printWindow.document.createElement('div');
            itemDiv.className = 'barcode-item';

            const title = printWindow.document.createElement('h3');
            title.textContent = generateRandomDisplay();
            itemDiv.appendChild(title);

            const canvas = printWindow.document.createElement('canvas');
            canvas.className = 'print-barcode';
            canvas.style.maxWidth = '300px';

            itemDiv.appendChild(canvas);
            printContainer.appendChild(itemDiv);

            // Generate the barcode on the canvas (actual encoding stays the same)
            JsBarcode(canvas, articleId, {
                format: 'CODE128',
                width: 2,
                height: 80,
                displayValue: false, // Remove text display under barcode
                background: '#ffffff',
                lineColor: '#000000'
            });
        }

        // Show local thumbnails (hide actual code for security)
        for (let i = 0; i < Math.min(qty, 6); i++) { // Show max 6 thumbnails
            const canvas = document.createElement('canvas');
            canvas.className = 'barcode';
            canvas.style.border = '1px solid #0f0';
            canvas.style.margin = '5px';
            canvas.style.background = '#000';
            canvas.style.maxHeight = '90px';

            JsBarcode(canvas, articleId, { // Actually generate from the selected article ID
                format: 'CODE128',
                width: 1,
                height: 60,
                displayValue: false, // No text under thumbnails
                background: '#ffffff', // White background
                lineColor: '#000000' // Black barcode lines
            });

            container.appendChild(canvas);
        }

        if (qty > 6) {
            const moreText = document.createElement('p');
            moreText.textContent = `... und ${qty - 6} weitere Codes`;
            moreText.style.color = '#00ff41';
            container.appendChild(moreText);
        }

        // Add print button to print window
        const printBtn = printWindow.document.createElement('button');
        printBtn.textContent = 'Drucken';
        printBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        `;
        printBtn.onclick = function() {
            printWindow.print();
            setTimeout(() => printWindow.close(), 1000);
        };

        printWindow.document.body.appendChild(printBtn);

        // Auto-focus print window and trigger print
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 1000);
    });

    // Load article select
    function loadArticleSelect() {
        const articles = storage.getArticles();
        const select = document.getElementById('articleSelect');
        select.innerHTML = '';
        articles.forEach(article => {
            const option = document.createElement('option');
            option.value = article.code;
            option.textContent = article.name;
            select.appendChild(option);
        });
    }

    // Test mode - Reuse exact same functionality as ausgabe.js
    function testDisplayArticle(article) {
        document.getElementById('testArticleName').textContent = article.name || '-';
        document.getElementById('testArticleGroup').textContent = article.group || '-';
        document.getElementById('testArticleLocation').textContent = article.location || '-';
        document.getElementById('testArticleApproved').textContent = article.approved ? 'Ja' : 'Nein';
        document.getElementById('testArticleStock').textContent = article.stock;
        document.getElementById('testArticleDisplay').style.display = 'block';
    }

    function testClearDisplay() {
        document.getElementById('testArticleName').textContent = '-';
        document.getElementById('testArticleGroup').textContent = '-';
        document.getElementById('testArticleLocation').textContent = '-';
        document.getElementById('testArticleApproved').textContent = '-';
        document.getElementById('testArticleStock').textContent = '-';
        document.getElementById('testArticleDisplay').style.display = 'none';
    }

    function testProcessScan(code) {
        const articles = storage.getArticles();
        const article = articles.find(a => a.code === code || a.id === code);

        if (article) {
            if (!article.approved) {
                document.getElementById('testStatusText').textContent = 'Artikel nicht freigegeben.';
                testClearDisplay();
                return;
            }
            if (article.stock <= 0) {
                document.getElementById('testStatusText').textContent = 'Artikel ausverkauft.';
                testClearDisplay();
                return;
            }
            testDisplayArticle(article);
            // Simulation - DO NOT reduce stock in test mode
            document.getElementById('testStatusText').textContent = 'Test erfolgreich. (Stock: ' + article.stock + ')';
        } else {
            document.getElementById('testStatusText').textContent = 'Ungültiger Code.';
            testClearDisplay();
        }
        document.getElementById('testScanInput').value = '';
        document.getElementById('testScanInput').focus();
    }

    document.getElementById('testScanInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const code = document.getElementById('testScanInput').value.trim();
            if (code) {
                testProcessScan(code);
            }
        }
    });

    document.getElementById('simulateScanBtn').addEventListener('click', function() {
        const input = document.querySelector('#testTab input[type="text"][list]');
        const code = input.value.trim();
        document.getElementById('testScanInput').value = code;
        input.value = '';
        if (code) {
            testProcessScan(code);
        }
    });

    // Logs
    function loadLogs() {
        const logs = storage.getLogs();
        const display = document.getElementById('logsDisplay');
        display.innerHTML = '';
        logs.reverse().slice(0, 20).forEach(log => {
            const item = document.createElement('div');
            item.innerHTML = `<p>${log.timestamp}: Artikel ${log.articleName} (${log.articleId}) - Vor: ${log.stockBefore}, Nach: ${log.stockAfter}</p>`;
            display.appendChild(item);
        });
    }

    document.getElementById('exportLogsBtn').addEventListener('click', function() {
        const logs = storage.getLogs();
        const csv = logs.map(log => `${log.timestamp},${log.articleId},${log.articleName},${log.stockBefore},${log.stockAfter}`).join('\n');
        const blob = new Blob(['Timestamp,ArticleID,ArticleName,StockBefore,StockAfter\n' + csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'logs.csv';
        a.click();
    });

    // Initialize
    function init() {
        loadArticleSelect();
        // Load datalist for test
        const datalist = document.getElementById('articleList');
        const articles = storage.getArticles();
        articles.forEach(article => {
            const option = document.createElement('option');
            option.value = article.code;
            datalist.appendChild(option);
        });
    }

    init();
    }
});
