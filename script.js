document.addEventListener('DOMContentLoaded', function() {
    // Loader timeout
    setTimeout(() => {
        document.querySelector('.loader').classList.add('fade-out');
        
        // Play birthday audio
        const audio = document.getElementById('birthdayAudio');
        const musicToggle = document.getElementById('musicToggle');
        let isPlaying = false;
        
        // Music toggle functionality
        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Play Music</span>';
            } else {
                audio.play().then(() => {
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i> <span>Pause Music</span>';
                }).catch(e => {
                    console.log('Audio play prevented:', e);
                    musicToggle.innerHTML = '<i class="fas fa-music"></i> <span>Play Music</span>';
                });
            }
            isPlaying = !isPlaying;
        });
        
        // Create floating hearts
        createFloatingHearts();
    }, 2000);

    // Navigation functionality
    const coverScreen = document.querySelector('.cover-screen');
    const journeySection = document.querySelector('.journey-section');
    const momentsSection = document.querySelector('.moments-section');
    const messageSection = document.querySelector('.message-section');
    
    // Show cover screen initially
    coverScreen.classList.add('active');
    
    // Update progress bar
    function updateProgressBar(currentSection) {
        const progressBar = document.querySelector('.progress-bar');
        let width = 0;
        
        if (currentSection === 'cover') width = 0;
        else if (currentSection === 'journey') width = 33;
        else if (currentSection === 'moments') width = 66;
        else if (currentSection === 'message') width = 100;
        
        progressBar.style.width = `${width}%`;
    }
    
    // Journey button
    document.querySelector('.journey-btn').addEventListener('click', function() {
        coverScreen.classList.remove('active');
        journeySection.classList.add('active');
        updateProgressBar('journey');
        animateTimelineItems();
    });
    
    // Moments button
    document.querySelector('.moments-btn').addEventListener('click', function() {
        journeySection.classList.remove('active');
        momentsSection.classList.add('active');
        updateProgressBar('moments');
        animateGalleryItems();
    });
    
    // Message button
    document.querySelector('.message-btn').addEventListener('click', function() {
        momentsSection.classList.remove('active');
        messageSection.classList.add('active');
        updateProgressBar('message');
        startCountUp();
    });
    
    // Restart button
    document.querySelector('.restart-btn').addEventListener('click', function() {
        messageSection.classList.remove('active');
        coverScreen.classList.add('active');
        updateProgressBar('cover');
    });
    
    // Animate timeline items
    function animateTimelineItems() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 300);
        });
    }
    
    // Animate gallery items
    function animateGalleryItems() {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }
    
    // Countup animation
    function startCountUp() {
        const counters = document.querySelectorAll('.count');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(startCountUp, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }
    
    // Create floating hearts
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartIcons = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍'];
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            // Random position and size
            const size = Math.random() * 30 + 20;
            heart.style.fontSize = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
            
            container.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, 300);
    }
});