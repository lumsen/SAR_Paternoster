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

        if (random < 0.08) { // 8% chance for critical error (increased from 3%)
            setSystemState('critical');
            statusText.textContent = errorMessages[Math.floor(Math.random() * errorMessages.length)];

            // Show overlay error briefly with more intensity
            const overlay = document.createElement('div');
            overlay.className = 'overlay-error';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    45deg,
                    #ff0000,
                    #ff0000 5px,
                    #000 5px,
                    #000 10px
                );
                opacity: 0.8;
                z-index: 9999;
                animation: errorFlash 0.1s infinite;
            `;
            document.body.appendChild(overlay);

            setTimeout(() => {
                if (document.body.contains(overlay)) document.body.removeChild(overlay);
            }, 3000); // Longer overlay

            // Recovery time - longer and more variable
            if (glitchTimeout) clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => setSystemState('normal'), 8000 + Math.random() * 12000);

        } else if (random < 0.18) { // 10% chance for error (increased from 5%)
            setSystemState('error');
            statusText.textContent = errorMessages[Math.floor(Math.random() * errorMessages.length)];

            if (glitchTimeout) clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => setSystemState('normal'), 4000 + Math.random() * 8000); // Longer errors

        } else if (random < 0.30) { // 12% chance for warning (increased from 7%)
            setSystemState('warning');

            if (glitchTimeout) clearTimeout(glitchTimeout);
            glitchTimeout = setTimeout(() => setSystemState('normal'), 2500 + Math.random() * 4500);

        } else if (random < 0.35) { // 5% chance for minor glitch (new)
            triggerMinorGlitch();
        }
        // 65% chance stays normal (reduced from 85%)
    }

    function triggerMinorGlitch() {
        // Quick visual disturbance
        const articleDisplay = document.getElementById('articleDisplay');
        const scanInput = document.getElementById('scanInput');

        articleDisplay.style.transform = 'translateX(2px)';
        scanInput.style.borderColor = '#ff6b35';

        const glitchSound = Math.random();
        if (glitchSound < 0.3) {
            // Simulate minor interference
            const oldText = statusText.textContent;
            statusText.textContent = 'STATIC INTERFERENCE';
            setTimeout(() => statusText.textContent = oldText, 500);
        }

        setTimeout(() => {
            articleDisplay.style.transform = '';
            scanInput.style.borderColor = '';
        }, 200);
    }

    // Simulate Tesla coil-like interference (more frequent and dramatic)
    function teslaInterference() {
        if (Math.random() < 0.005) { // 0.5% chance every cycle (increased from 0.1%)
            const interferenceLength = 2000 + Math.random() * 8000; // Longer flashes
            const interferenceInterval = 30; // Faster flashing

            setSystemState('critical');

            let count = 0;
            const interferenceTimer = setInterval(() => {
                count++;
                const colors = ['#ff0000', '#ffffff', '#00ffff', '#ffff00', '#ff00ff'];
                const flash = colors[count % colors.length];
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

    // Continuous monitoring for issues - more frequent (every 1-2 seconds)
    setInterval(() => {
        if (isSystemStable && currentState === 'normal') {
            simulateSystemInstability();
            teslaInterference();
        }
    }, 1000 + Math.random() * 1000); // 1-2 seconds instead of 5

    // Initial warm-up sequence
    setTimeout(() => {
        setSystemState('warning');
        setTimeout(() => {
            setSystemState('normal');
        }, 3000);
    }, 1000);
});
