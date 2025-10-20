// Scanning functionality for ausgabe.html
document.addEventListener('DOMContentLoaded', function() {
    const scanInput = document.getElementById('scanInput');
    const statusText = document.getElementById('statusText');
    const articleName = document.getElementById('articleName');
    const articleGroup = document.getElementById('articleGroup');
    const articleLocation = document.getElementById('articleLocation');
    const articleApproved = document.getElementById('articleApproved');
    const articleStock = document.getElementById('articleStock');
    const articleImage = document.getElementById('articleImage');

    function displayArticle(article) {
        articleName.textContent = article.name || '-';
        articleGroup.textContent = article.group || '-';
        articleLocation.textContent = article.location || '-';
        articleApproved.textContent = article.approved ? 'AUTHORIZED' : 'UNAUTHORIZED';
        articleStock.textContent = article.stock;
        if (article.image) {
            articleImage.src = article.image;
            articleImage.style.display = 'block';
        } else {
            articleImage.style.display = 'none';
        }
        // Apply modern UI states
        articleDisplay.classList.remove('waiting', 'error');
        articleDisplay.classList.add('scanned');
    }

    function clearDisplay() {
        articleName.textContent = '-';
        articleGroup.textContent = '-';
        articleLocation.textContent = '-';
        articleApproved.textContent = '-';
        articleStock.textContent = '-';
        articleImage.style.display = 'none';
        // Apply ready state
        const articleDisplay = document.getElementById('articleDisplay');
        articleDisplay.classList.remove('scanned', 'error', 'waiting');
        articleDisplay.classList.add('ready');
    }

    function processScan(code) {
        const status = document.getElementById('status');
        const articles = storage.getArticles();
        const article = articles.find(a => a.code === code || a.id === code);

        // Set scanning state
        status.classList.remove('ready', 'success', 'error');
        status.classList.add('waiting');

        if (article) {
            if (!article.approved) {
                statusText.textContent = 'ACCESS DENIED - Article not authorized';
                status.classList.remove('waiting');
                status.classList.add('error');
                clearDisplay();
                return;
            }
            if (article.stock <= 0) {
                statusText.textContent = 'OUT OF STOCK';
                status.classList.remove('waiting');
                status.classList.add('error');
                clearDisplay();
                return;
            }
            displayArticle(article);
            // Reduce stock
            article.stock -= 1;
            if (article.stock === 0) {
                article.approved = false; // Deactivate if stock is 0
            }
            storage.saveArticles(articles);

            // Log the issuance
            const logs = storage.getLogs();
            logs.push({
                timestamp: new Date().toISOString(),
                articleId: article.id,
                articleName: article.name,
                stockBefore: article.stock + 1,
                stockAfter: article.stock
            });
            storage.saveLogs(logs);

            statusText.textContent = `DISPENSATION COMPLETE - Remaining: ${article.stock}`;
            status.classList.remove('waiting');
            status.classList.add('success');
        } else {
            statusText.textContent = 'INVALID CODE DETECTED';
            status.classList.remove('waiting');
            status.classList.add('error');
            clearDisplay();
        }
        scanInput.value = '';
        scanInput.focus();
    }

    scanInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const code = scanInput.value.trim();
            if (code) {
                processScan(code);
            }
        }
    });

    // Focus on input at start
    scanInput.focus();
});
