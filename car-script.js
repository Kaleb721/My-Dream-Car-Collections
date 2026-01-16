document.addEventListener('DOMContentLoaded', function() {
    function initializeModeToggle() {
        const modeBtn = document.createElement('button');
        modeBtn.id = 'modeToggle';
        modeBtn.title = 'Toggle Dark/Light Mode';
        const savedMode = localStorage.getItem('carSiteMode');
        if (savedMode === 'light') {
            document.body.classList.add('light-mode');
        }
        updateModeButton(modeBtn);
        modeBtn.addEventListener('click', function() {
            const isLightMode = document.body.classList.contains('light-mode');
            document.body.classList.toggle('light-mode');
            localStorage.setItem('carSiteMode', document.body.classList.contains('light-mode') ? 'light' : 'dark');
            updateModeButton(modeBtn);
            showModeNotification(document.body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode');
        });
        modeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(30deg)';
        });
        modeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        document.body.appendChild(modeBtn);
    }
       function updateModeButton(button) {
        const isLightMode = document.body.classList.contains('light-mode');
        button.innerHTML = isLightMode ? '☀️' : '🌙';
        if (isLightMode) {
            button.style.background = 'linear-gradient(135deg, #ffcc00, #ff9800)';
            button.style.color = '#333';
            button.style.border = '2px solid #ffcc00';
        } else {
            button.style.background = 'linear-gradient(135deg, #2a2f35, #1a2029)';
            button.style.color = '#ff6b35';
            button.style.border = '2px solid #ff6b35';
        }
    }
    function showModeNotification(modeName) {
        const notification = document.createElement('div');
        notification.className = 'mode-notification';
        notification.innerHTML = `Switched to <strong>${modeName}</strong>`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }
    initializeModeToggle();
    if (!sessionStorage.getItem('carSiteHasLoaded')) {
        showLoadingScreen();
    } else {
        setTimeout(initializeAllFeatures, 100);
    }
    function showLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        const spinner = document.createElement('div');
        const text = document.createElement('div');
        text.textContent = 'Revving Up...';
        loadingScreen.appendChild(spinner);
        loadingScreen.appendChild(text);
        document.body.appendChild(loadingScreen);
        document.body.classList.add('loading');
        sessionStorage.setItem('carSiteHasLoaded', 'true');
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
                document.body.classList.remove('loading');
                showWelcomeMessage();
                initializeAllFeatures();
            }, 500);
        }, Math.random() * 1000 + 2000);
    }
    
    function showWelcomeMessage() {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.id = 'welcome-message';
        welcomeMsg.innerHTML = `
            <strong>🏎️ Welcome to Dream Cars!</strong>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Start your engines!</p>
        `;
        document.body.appendChild(welcomeMsg);
        setTimeout(() => {
            welcomeMsg.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            welcomeMsg.style.transform = 'translateX(150%)';
            setTimeout(() => welcomeMsg.remove(), 500);
        }, 4000);
    }
});