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
    }});