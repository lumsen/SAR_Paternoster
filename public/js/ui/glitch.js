// Glitch effects for ausgabe.html - Authentic industrial system simulation
document.addEventListener('DOMContentLoaded', function() {
    let isSystemStable = true;
    const articleDisplay = document.getElementById('articleDisplay');
    const statusText = document.getElementById('statusText');
    const scanSection = document.querySelector('.scan-section');
    const glitchText = document.querySelector('.glitch-text');
    const scanInput = document.getElementById('scanInput');

    // Industrial system error states and behaviors
    const systemStates = {
        normal: {
            colors: { text: '#0f0', border: '#0f0' },
            flicker: false,
            message: 'System bereit'
        },
        warning: {
            colors: { text: '#ffa500', border: '#ffa500' },
            flicker: true,
            message: 'Warnung: Systeminstabilität'
        },
        error: {
            colors: { text: '#ff0000', border: '#ff0000' },
            flicker: true,
            message: 'FEHLER: Systemausfall'
        },
        critical: {
            colors: { text: '#ff00ff', border: '#ff0000' },
            flicker: true,
            message: 'KRITISCH: Datenkorruption'
        }
    };

    const errorMessages = [
        'Scanner-Kalibrierung fehlgeschlagen',
        'Datenbankzugriff verzögert',
        'Netzwerkzeitüberschreitung',
        'Datenspezifikationsfehler',
        'Speicherbereich überlastet',
        'Signalstörung erkannt',
        'Protokollfehler',
        'Sicherheitsrigor verletzt',
        'Authentifizierung unterbrochen',
        'Hardware-Handshake fehlgeschlagen'
    ];

    let currentState = 'normal';
    let glitchTimeout = null;

    function setSystemState(state) {
        currentState = state;
        const stateData = systemStates[state];
        const statusElement = document.getElementById('status');

        // Update colors
        document.body.style.color = stateData.colors.text;
        articleDisplay.style.borderColor = stateData.colors.border;

        // Handle flickering
        if (stateData.flicker) {
            statusElement.classList.add('flicker');
            scanInput.classList.add('flicker');
        } else {
            statusElement.classList.remove('flicker');
            scanInput.classList.remove('flicker');
        }

        // Set status message
        statusText.textContent = stateData.message;

        // Add error classes
        statusElement.className = state === 'error' || state === 'critical' ? 'status error' : 'status';
        articleDisplay.className = state === 'critical' ? 'article-display glitch' : 'article-display';
        scanSection.className = state === 'warning' ? 'scan-section glitch' : 'scan-section';

        // Visual corruption for critical state
        if (state === 'critical') {
            articleDisplay.classList.add('glitch');
            document.querySelectorAll('.article-info p').forEach(p => {
                if (Math.random() < 0.5) p.classList.add('corrupted');
            });
            if (glitchText) glitchText.setAttribute('data-text', glitchText.textContent);
        } else {
            articleDisplay.classList.remove('glitch');
            document.querySelectorAll('.corrupted').forEach(el => el.classList.remove('corrupted'));
        }
    }

    function simulateSystemInstability() {
        const random = Math.random();

        if (random < 0.03) { // 3% chance for critical error
            setSystemState('critical');
            statusText.textContent = errorMessages[Math.floor(Math.random() * errorMessages.length)];

            // Show overlay error briefly
            const overlay = document.createElement('div');
            overlay.className = 'overlay-error';
            document.body.appendChild(overlay);

            setTimeout(() => {
                if (document.body.contains(overlay)) document.body.removeChild(overlay);
            }, 2000);

            // Recovery time
            if (glitchTimeout) clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => setSystemState('normal'), 5000 + Math.random() * 10000);

        } else if (random < 0.08) { // 5% chance for error
            setSystemState('error');
            statusText.textContent = errorMessages[Math.floor(Math.random() * errorMessages.length)];

            if (glitchTimeout) clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => setSystemState('normal'), 3000 + Math.random() * 5000);

        } else if (random < 0.15) { // 7% chance for warning
            setSystemState('warning');

            if (glitchTimeout) clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => setSystemState('normal'), 2000 + Math.random() * 3000);
        }
        // 85% chance stays normal
    }

    // Simulate Tesla coil-like interference (rare but dramatic)
    function teslaInterference() {
        if (Math.random() < 0.001) { // 0.1% chance every cycle
            const interferenceLength = 1000 + Math.random() * 5000;
            const interferenceInterval = 50;

            setSystemState('critical');

            let count = 0;
            const interferenceTimer = setInterval(() => {
                count++;
                const flash = count % 2 === 0 ? '#ff0000' : '#ffffff';
                document.body.style.background = flash;

                if (count >= interferenceLength / interferenceInterval) {
                    clearInterval(interferenceTimer);
                    document.body.style.background = '#000';
                    setSystemState('normal');
                }
            }, interferenceInterval);
        }
    }

    // Simulate gradual system wear (gets worse over time, like real hardware)
    let uptime = 0;
    setInterval(() => {
        uptime += 10000; // 10 second intervals

        // System becomes more unstable after prolonged use
        if (uptime > 300000) { // 5 minutes
            simulateSystemInstability();
        }
    }, 10000);

    // Continuous monitoring for issues
    setInterval(() => {
        if (isSystemStable && currentState === 'normal') {
            simulateSystemInstability();
            teslaInterference();
        }
    }, 5000);

    // Initial warm-up sequence
    setTimeout(() => {
        setSystemState('warning');
        setTimeout(() => {
            setSystemState('normal');
        }, 3000);
    }, 1000);
});
