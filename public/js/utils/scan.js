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
        articleApproved.textContent = article.approved ? 'Ja' : 'Nein';
        articleStock.textContent = article.stock;
        if (article.image) {
            articleImage.src = article.image;
            articleImage.style.display = 'block';
        } else {
            articleImage.style.display = 'none';
        }
        document.getElementById('articleDisplay').style.display = 'block';
    }

    function clearDisplay() {
        articleName.textContent = '-';
        articleGroup.textContent = '-';
        articleLocation.textContent = '-';
        articleApproved.textContent = '-';
        articleStock.textContent = '-';
        articleImage.style.display = 'none';
        document.getElementById('articleDisplay').style.display = 'none';
    }

    function processScan(code) {
        const articles = storage.getArticles();
        const article = articles.find(a => a.code === code || a.id === code);

        if (article) {
            if (!article.approved) {
                statusText.textContent = 'Artikel nicht freigegeben.';
                clearDisplay();
                return;
            }
            if (article.stock <= 0) {
                statusText.textContent = 'Artikel ausverkauft.';
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

            statusText.textContent = 'Entnahme erfolgreich. Restbestand: ' + article.stock;
        } else {
            statusText.textContent = 'Ungültiger Code.';
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
