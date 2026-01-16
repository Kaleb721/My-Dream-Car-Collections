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
            const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                let isValid = true;
                const errorMessages = [];
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const categoryInputs = document.querySelectorAll('input[name="category"]');
                const makeInput = document.getElementById('make');
                const yearSelect = document.getElementById('year');
                const reasonTextarea = document.getElementById('reason');
                if (!nameInput.value.trim()) {
                    isValid = false;
                    highlightError(nameInput, 'Name is required');
                    errorMessages.push('Name is required');
                } else {
                    removeError(nameInput);
                }
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
                    isValid = false;
                    highlightError(emailInput, 'Valid email is required');
                    errorMessages.push('Valid email is required');
                } else {
                    removeError(emailInput);
                }
                let categorySelected = false;
                categoryInputs.forEach(input => {
                    if (input.checked) categorySelected = true;
                });
                if (!categorySelected) {
                    isValid = false;
                    const categoryGroup = document.querySelector('.radio-group');
                    highlightError(categoryGroup, 'Please select a category');
                    errorMessages.push('Category selection is required');
                }
                if (!makeInput.value.trim()) {
                    isValid = false;
                    highlightError(makeInput, 'Make & Model is required');
                    errorMessages.push('Make & Model is required');
                } else {
                    removeError(makeInput);
                }
                if (!yearSelect.value) {
                    isValid = false;
                    highlightError(yearSelect, 'Year is required');
                    errorMessages.push('Year selection is required');
                } else {
                    removeError(yearSelect);
                }
                if (!reasonTextarea.value.trim() || reasonTextarea.value.trim().length < 20) {
                    isValid = false;
                    highlightError(reasonTextarea, 'Please provide a detailed reason (at least 20 characters)');
                    errorMessages.push('Detailed reason is required (minimum 20 characters)');
                } else {
                    removeError(reasonTextarea);
                }
                if (isValid) {
                    showFormMessage('success', '🎉 Suggestion Submitted Successfully!<p>Thank you for your car suggestion. We\'ll review it and consider adding it to our collection!</p>');
                    setTimeout(() => contactForm.reset(), 3000);
                } else {
                    showFormMessage('error', `<h3>⚠️ Please fix the following errors:</h3><ul>${errorMessages.map(error => `<li>${error}</li>`).join('')}</ul>`);
                }
            });
        }
         function highlightError(element, message) {
            element.style.borderColor = '#ff3b30';
            element.style.borderWidth = '2px';
            const existingError = element.nextElementSibling;
            if (existingError && existingError.classList.contains('error-message')) {
                existingError.remove();
            }
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-message';
            errorSpan.textContent = message;
            element.parentNode.insertBefore(errorSpan, element.nextSibling);
        }
        function removeError(element) {
            element.style.borderColor = '';
            element.style.borderWidth = '';
            
            const existingError = element.nextElementSibling;
            if (existingError && existingError.classList.contains('error-message')) {
                existingError.remove();
            }
        }
        function showFormMessage(type, html) {
            document.querySelectorAll('.form-message').forEach(msg => msg.remove());
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-message ${type}-message`;
            messageDiv.innerHTML = html;
            const form = document.querySelector('form');
            if (type === 'error') {
                form.parentNode.insertBefore(messageDiv, form);
            } else {
                form.parentNode.insertBefore(messageDiv, form.nextSibling);
                setTimeout(() => {
                    messageDiv.style.opacity = '0';
                    setTimeout(() => messageDiv.remove(), 1000);
                }, 3000);
            }
        } 
          document.querySelectorAll('img:not(.logo):not(.youtube-links img)').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                openImageModal(this.src, this.alt);
            });
        });
        function openImageModal(src, alt) {
            const modal = document.createElement('div');
            modal.id = 'imageModal';
            const modalContent = document.createElement('div');
            modalContent.style.position = 'relative';
            modalContent.style.maxWidth = '90%';
            modalContent.style.maxHeight = '90%';
            const modalImg = document.createElement('img');
            modalImg.src = src;
            modalImg.alt = alt;
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function() {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            });
            const caption = document.createElement('div');
            caption.textContent = alt;
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalImg);
            modalContent.appendChild(caption);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            setTimeout(() => modal.style.opacity = '1', 10);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.opacity = '0';
                    setTimeout(() => modal.remove(), 300);
                }
            });
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        modal.remove();
                        document.removeEventListener('keydown', closeModal);
                    }, 300);
                }
            });
        }
        const performanceTable = document.querySelector('.performance-table');
        if (performanceTable) {
            const headers = performanceTable.querySelectorAll('th');
            
            headers.forEach((header, index) => {
                if (index > 0) { 
                    header.style.cursor = 'pointer';
                    header.innerHTML += ' <span style="font-size:0.8rem;">↕</span>';
                    
                    header.addEventListener('click', function() {
                        sortTable(index);
                    });
                }
            });
            function sortTable(columnIndex) {
                const tbody = performanceTable.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                const isNumeric = columnIndex === 1 || columnIndex === 2; 
                rows.sort((a, b) => {
                    let aValue = a.cells[columnIndex].textContent;
                    let bValue = b.cells[columnIndex].textContent;
                    if (isNumeric) {
                        aValue = parseFloat(aValue.replace(/[^\d.]/g, ''));
                        bValue = parseFloat(bValue.replace(/[^\d.]/g, ''));
                        return aValue - bValue;
                    } else {
                        return aValue.localeCompare(bValue);
                    }
                });
                if (JSON.stringify(rows) === JSON.stringify(Array.from(tbody.querySelectorAll('tr')))) {
                    rows.reverse();
                }
                rows.forEach(row => tbody.appendChild(row));
            }
        }
             const mainHeader = document.querySelector('h1');
        if (mainHeader && mainHeader.textContent.includes('My Dream Car Collection')) {
            const cars = [
                {
                    name: "Koenigsegg Jesko",
                    description: "Experience the pinnacle of hypercar engineering",
                    color: "#FF3B30"
                },
                {
                    name: "Nissan GTR R35",
                    description: "Godzilla - The legendary Japanese performance icon",
                    color: "#0066CC"
                },
                {
                    name: "Lamborghini Urus",
                    description: "Supercar performance meets SUV practicality",
                    color: "#FFCC00"
                },
                {
                    name: "1970 Dodge Charger",
                    description: "American muscle at its finest",
                    color: "#8B0000"
                }
            ];
            const randomCar = cars[Math.floor(Math.random() * cars.length)];
            const carOfTheDay = document.createElement('div');
            carOfTheDay.className = 'car-of-the-day';
            const isLightMode = document.body.classList.contains('light-mode');
            carOfTheDay.style.borderLeftColor = randomCar.color;
            carOfTheDay.style.background = `linear-gradient(135deg, ${randomCar.color}22, ${isLightMode ? '#ffffff' : '#1a2029'})`;
            carOfTheDay.innerHTML = `
                <h3 style="color: ${randomCar.color}; margin-bottom: 10px;">
                    🏆 Car of the Day: ${randomCar.name}
                </h3>
                <p style="color: ${isLightMode ? '#444' : '#e0e0e0'};">
                    ${randomCar.description}
                </p>
                <small style="color: ${isLightMode ? '#666' : '#b0b0b0'};">
                    Refresh page to see a different featured car!
                </small>
            `;
            const nav = document.querySelector('nav');
            if (nav) {
                const existingCarOfDay = document.querySelector('.car-of-the-day');
                if (existingCarOfDay) {
                    existingCarOfDay.remove();
                }
                nav.parentNode.insertBefore(carOfTheDay, nav.nextSibling);
            }
        }
    }
});