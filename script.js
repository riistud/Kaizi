document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.querySelectorAll('span').forEach(span => span.style.transform = 'none');
                    hamburger.querySelectorAll('span')[1].style.opacity = '1';
                }
            }
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const header = document.querySelector('header');
    let prevScrollPos = window.pageYOffset;
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollPos = window.pageYOffset;
            header.style.top = prevScrollPos > currentScrollPos ? '0' : '-80px';
            header.style.background = currentScrollPos > 50 ? 
                (document.body.dataset.theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)') : 
                (document.body.dataset.theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)');
            prevScrollPos = currentScrollPos;
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle?.querySelector('i');
    if (themeToggle && toggleIcon) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.dataset.theme || 'light';
            document.body.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
            toggleIcon.className = currentTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('theme', document.body.dataset.theme);
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.dataset.theme = savedTheme;
            toggleIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    const musicToggle = document.getElementById('music-toggle');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const audio = new Audio('asset/songs.mp3');
    if (musicToggle && playIcon && pauseIcon) {
        musicToggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(() => {
                    console.error('Failed to play audio');
                });
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline-block';
            } else {
                audio.pause();
                playIcon.style.display = 'inline-block';
                pauseIcon.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});
