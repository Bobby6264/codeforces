// Birthday celebration with authentication and falling flowers

// Flower emojis for animation
const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️'];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthentication();
});

// Authentication functionality
function initializeAuthentication() {
    const authInput = document.getElementById('auth-input');
    const authSubmit = document.getElementById('auth-submit');
    const authError = document.getElementById('auth-error');
    
    // Focus on input when page loads
    authInput.focus();
    
    // Handle Enter key press
    authInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAuthentication();
        }
    });
    
    // Handle button click
    authSubmit.addEventListener('click', checkAuthentication);
    
    function checkAuthentication() {
        const answer = authInput.value.trim().toLowerCase();
        
        if (answer === 'bubu') {
            // Correct answer - show success and load main content
            authSubmit.textContent = '✅ Welcome BUBU!';
            authSubmit.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';
            
            setTimeout(() => {
                document.getElementById('auth-modal').style.display = 'none';
                document.getElementById('main-content').classList.remove('hidden');
                initializeMainContent();
            }, 1000);
            
        } else {
            // Wrong answer - show error
            authError.classList.remove('hidden');
            authInput.value = '';
            authInput.focus();
            
            // Hide error after 3 seconds
            setTimeout(() => {
                authError.classList.add('hidden');
            }, 3000);
        }
    }
}

// Initialize main content after authentication
function initializeMainContent() {
    initializeFlowerRain();
    initializeEventListeners();
}

// Create falling flowers animation
function initializeFlowerRain() {
    const flowersContainer = document.getElementById('flowers-container');
    
    // Create initial flowers
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFlower(flowersContainer), i * 1000);
    }
    
    // Continue creating flowers every 2 seconds
    setInterval(() => createFlower(flowersContainer), 2000);
}

function createFlower(container) {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    
    // Random horizontal position
    flower.style.left = Math.random() * 100 + '%';
    
    // Random animation duration (3-7 seconds)
    const duration = Math.random() * 4 + 3;
    flower.style.animationDuration = duration + 's';
    
    // Random size
    const size = Math.random() * 10 + 15;
    flower.style.fontSize = size + 'px';
    
    container.appendChild(flower);
    
    // Remove flower after animation completes
    setTimeout(() => {
        if (flower.parentNode) {
            flower.parentNode.removeChild(flower);
        }
    }, duration * 1000);
}

// Initialize event listeners for main content
function initializeEventListeners() {
    // Magic button (surprise reveal)
    const revealBtn = document.getElementById('reveal-btn');
    const surprise = document.getElementById('surprise');
    const container = document.querySelector('.container');
    
    revealBtn.addEventListener('click', function() {
        // Hide main content
        container.classList.add('hidden-content');
        
        // Show surprise
        surprise.classList.remove('hidden');
        
        // Create extra flowers for celebration
        createCelebrationFlowers();
    });
}

// Message Slider functionality
let currentMessageIndex = 0;
const totalMessages = 5;

function initializeMessageSlider() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');
    const messagesContainer = document.querySelector('.messages-container');
    
    // Navigation button events
    prevBtn.addEventListener('click', () => changeMessage(-1));
    nextBtn.addEventListener('click', () => changeMessage(1));
    
    // Dot navigation events
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToMessage(index));
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    messagesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    messagesContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    // Mouse drag support for desktop
    let isDragging = false;
    let startMouseX = 0;
    
    messagesContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startMouseX = e.clientX;
        messagesContainer.style.cursor = 'grabbing';
    });
    
    messagesContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    messagesContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        messagesContainer.style.cursor = 'grab';
        
        const endMouseX = e.clientX;
        const diff = startMouseX - endMouseX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                changeMessage(1); // Swipe left - next message
            } else {
                changeMessage(-1); // Swipe right - previous message
            }
        }
    });
    
    messagesContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        messagesContainer.style.cursor = 'grab';
    });
    
    // Set initial cursor
    messagesContainer.style.cursor = 'grab';
    
    // // Auto-advance messages (optional)
    // setInterval(() => {
    //     changeMessage(1);
    // }, 10000); // Change message every 10 seconds
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeMessage(1); // Swipe left - next message
        } else {
            changeMessage(-1); // Swipe right - previous message
        }
    }
}

function changeMessage(direction) {
    const messages = document.querySelectorAll('.message');
    const dots = document.querySelectorAll('.dot');
    const currentMessageSpan = document.getElementById('current-message');
    
    // Remove active class from current message and dot
    messages[currentMessageIndex].classList.remove('active');
    dots[currentMessageIndex].classList.remove('active');
    
    // Update index
    currentMessageIndex += direction;
    
    // Handle wrapping
    if (currentMessageIndex >= totalMessages) {
        currentMessageIndex = 0;
    } else if (currentMessageIndex < 0) {
        currentMessageIndex = totalMessages - 1;
    }
    
    // Add active class to new message and dot
    messages[currentMessageIndex].classList.add('active');
    dots[currentMessageIndex].classList.add('active');
    
    // Update counter
    currentMessageSpan.textContent = currentMessageIndex + 1;
    
    // Add some animation effects
    createMessageSparkles();
}

function goToMessage(index) {
    const messages = document.querySelectorAll('.message');
    const dots = document.querySelectorAll('.dot');
    const currentMessageSpan = document.getElementById('current-message');
    
    // Remove active class from current message and dot
    messages[currentMessageIndex].classList.remove('active');
    dots[currentMessageIndex].classList.remove('active');
    
    // Update index
    currentMessageIndex = index;
    
    // Add active class to new message and dot
    messages[currentMessageIndex].classList.add('active');
    dots[currentMessageIndex].classList.add('active');
    
    // Update counter
    currentMessageSpan.textContent = currentMessageIndex + 1;
    
    // Add some animation effects
    createMessageSparkles();
}

function createMessageSparkles() {
    const messagesContainer = document.querySelector('.messages-container');
    const rect = messagesContainer.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createSparkle(x, y);
        }, i * 50);
    }
}

function createCelebrationFlowers() {
    const flowersContainer = document.getElementById('flowers-container');
    
    // Create burst of flowers
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFlower(flowersContainer), i * 100);
    }
}

// Add some interactive sparkle effects
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#feca57';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Add sparkle effect CSS animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(20) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add sparkles when clicking on buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button') && !e.target.matches('#auth-submit')) {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const x = e.clientX + (Math.random() - 0.5) * 100;
                const y = e.clientY + (Math.random() - 0.5) * 100;
                createSparkle(x, y);
            }, i * 50);
        }
    }
});

// Add some extra dynamic effects for authenticated users
function startDynamicEffects() {
    setInterval(() => {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const newLeft = Math.random() * 100;
            particle.style.left = newLeft + '%';
        });
    }, 10000);
}

// Console messages for fun
console.log('� Birthday Authentication System Active! �');
console.log('💭 Answer the question correctly to enter the celebration! 💭');
