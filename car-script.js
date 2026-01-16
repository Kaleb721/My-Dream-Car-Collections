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
      function initializeAllFeatures() {
        console.log("Car Collection Website Initialized!");
        function updateVisitorCounter() {
            if (!sessionStorage.getItem('visitorCounted')) {
                let count = localStorage.getItem('carSiteVisitorCount') || 0;
                count = parseInt(count) + 1;
                localStorage.setItem('carSiteVisitorCount', count);
                sessionStorage.setItem('visitorCounted', 'true');
            }
            const currentCount = localStorage.getItem('carSiteVisitorCount') || '0';
            const footer = document.querySelector('footer');
            if (footer && !document.getElementById('visitorCounter')) {
                const counterSpan = document.createElement('span');
                counterSpan.id = 'visitorCounter';
                counterSpan.textContent = `👁️ Total Unique Visitors: ${currentCount}`;
                footer.appendChild(counterSpan);
            }
        }
        updateVisitorCounter();
        const cars = [
            { id: 'jesko', name: 'Koenigsegg Jesko' },
            { id: 'gtr', name: 'Nissan GTR R35' },
            { id: 'urus', name: 'Lamborghini Urus' },
            { id: 'charger', name: '1970 Dodge Charger' }
        ];
        if (!localStorage.getItem('carLikes')) {
            const initialLikes = {};
            cars.forEach(car => initialLikes[car.id] = 0);
            localStorage.setItem('carLikes', JSON.stringify(initialLikes));
        }
        function addLikeButtons() {
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                if (index < cars.length && !section.querySelector('.like-container')) {
                    const car = cars[index];
                    const carLikes = JSON.parse(localStorage.getItem('carLikes'));
                    const userLikes = JSON.parse(localStorage.getItem('userCarLikes') || '{}');
                    const hasLiked = userLikes[car.id] || false;
                    const container = document.createElement('div');
                    container.className = 'like-container';
                    const likeButton = document.createElement('button');
                    likeButton.className = `like-button ${hasLiked ? 'liked' : ''}`;
                    likeButton.dataset.carId = car.id;
                    likeButton.innerHTML = `
                        <span class="like-icon">${hasLiked ? '❤️' : '🤍'}</span>
                        <span class="like-text">${hasLiked ? 'Liked' : 'Like'}</span>
                    `;
                    
                    likeButton.addEventListener('click', function() {
                        handleLikeClick(car.id, car.name);
                    });
                    const likesCounter = document.createElement('div');
                    likesCounter.className = 'likes-counter';
                    likesCounter.innerHTML = `
                        <span>${carLikes[car.id]}</span>
                        <span>likes</span>
                    `;
                    container.appendChild(likeButton);
                    container.appendChild(likesCounter);
                    const carImage = section.querySelector('.car-display-img');
                    if (carImage) {
                        carImage.parentNode.insertBefore(container, carImage.nextSibling);
                    } else {
                        section.appendChild(container);
                    }
                }
            });
            updateTotalLikes();
        }
            function handleLikeClick(carId, carName) {
            const carLikes = JSON.parse(localStorage.getItem('carLikes'));
            const userLikes = JSON.parse(localStorage.getItem('userCarLikes') || '{}');
            const button = document.querySelector(`.like-button[data-car-id="${carId}"]`);
            const counter = button?.parentNode.querySelector('.likes-counter span:first-child');
            if (userLikes[carId]) {
                userLikes[carId] = false;
                carLikes[carId] = Math.max(0, carLikes[carId] - 1);
                button.innerHTML = '<span class="like-icon">🤍</span><span class="like-text">Like</span>';
                button.classList.remove('liked');
                showLikeNotification(`Removed like from ${carName}`, 'info');
            } else {
                userLikes[carId] = true;
                carLikes[carId] = (carLikes[carId] || 0) + 1;
                button.innerHTML = '<span class="like-icon">❤️</span><span class="like-text">Liked</span>';
                button.classList.add('liked');
                showLikeNotification(`You liked ${carName}!`, 'success');
            }
            localStorage.setItem('carLikes', JSON.stringify(carLikes));
            localStorage.setItem('userCarLikes', JSON.stringify(userLikes));
            if (counter) {
                counter.textContent = carLikes[carId];
            }
            updateTotalLikes();
        }
        function updateTotalLikes() {
            const carLikes = JSON.parse(localStorage.getItem('carLikes'));
            let totalLikes = 0;
            for (const carId in carLikes) {
                totalLikes += carLikes[carId];
            }
            let totalLikesElement = document.getElementById('totalLikes');
            if (!totalLikesElement) {
                totalLikesElement = document.createElement('div');
                totalLikesElement.id = 'totalLikes';
                const footer = document.querySelector('footer');
                if (footer) footer.appendChild(totalLikesElement);
            }
            
            totalLikesElement.innerHTML = `🔥 Total Likes: <span>${totalLikes}</span>`;
        }
        function showLikeNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = 'like-notification';
            notification.textContent = message;

            if (type === 'success') {
                notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            } else {
                notification.style.background = 'linear-gradient(135deg, #ff9800, #ff5722)';
            }
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.transform = 'translateY(0)';
                notification.style.opacity = '1';
            }, 10);
            setTimeout(() => {
                notification.style.transform = 'translateY(100px)';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 500);
            }, 3000);
        }
        addLikeButtons();
    }
});