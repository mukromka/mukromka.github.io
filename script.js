// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Scroll Reveal Animation (supports multiple reveal classes)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger point

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check and event listener
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    /* ==========================================================================
       Wheel Circular Deck Carousel
       ========================================================================== */
    const allSlides = Array.from(document.querySelectorAll('.carousel-slide'));
    if (allSlides.length > 0) {
        let activeSlides = [...allSlides];
        let currentOffset = 0;
        
        allSlides.forEach(slide => slide.classList.remove('reveal'));

        // --- Dot indicator setup ---
        const dotsContainer = document.querySelector('.carousel-dots');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');

        const isMobile = () => window.innerWidth <= 600;

        const buildDots = () => {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            activeSlides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to project ${i + 1}`);
                if (i === currentOffset) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentOffset = i;
                    updateDeck();
                });
                dotsContainer.appendChild(dot);
            });
        };

        const updateDots = () => {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentOffset);
            });
        };
        
        const updateDeck = () => {
            const numSlides = activeSlides.length;
            
            // Sembunyikan yang tidak cocok filter
            allSlides.forEach(slide => {
                if (!activeSlides.includes(slide)) {
                    slide.style.opacity = '0';
                    slide.style.pointerEvents = 'none';
                    slide.style.transform = 'translateY(100px) scale(0.5)';
                    slide.style.zIndex = -1;
                    slide.setAttribute('data-mobile-hidden', 'true');
                } else {
                    slide.style.pointerEvents = 'auto';
                }
            });

            if (numSlides === 0) return;

            if (isMobile()) {
                // Mobile: show only the active slide
                activeSlides.forEach((slide, i) => {
                    if (i === currentOffset) {
                        slide.style.position = 'relative';
                        slide.style.transform = 'none';
                        slide.style.opacity = '1';
                        slide.style.filter = 'none';
                        slide.style.zIndex = 10;
                        slide.removeAttribute('data-mobile-hidden');
                    } else {
                        slide.style.opacity = '0';
                        slide.style.position = 'absolute';
                        slide.style.pointerEvents = 'none';
                        slide.style.zIndex = -1;
                        slide.setAttribute('data-mobile-hidden', 'true');
                    }
                });
            } else {
                // Desktop: stacked deck effect
                activeSlides.forEach((slide, i) => {
                    slide.style.position = 'absolute';
                    slide.removeAttribute('data-mobile-hidden');

                    let diff = (i - currentOffset) % numSlides;
                    if (diff < -Math.floor(numSlides / 2)) diff += numSlides;
                    if (diff > Math.floor(numSlides / 2)) diff -= numSlides;
                    
                    let zIndex = 100 - Math.abs(diff);
                    let translateX = diff * 55; 
                    
                    let scale = diff === 0 ? 1 : 0.85 - (Math.abs(diff) * 0.1);
                    let opacity = Math.abs(diff) > 1 ? 0 : (diff === 0 ? 1 : 0.6);
                    let filter = diff === 0 ? 'none' : `blur(${Math.abs(diff) * 2}px)`;

                    slide.style.transform = `translateX(${translateX}%) scale(${scale})`;
                    slide.style.zIndex = zIndex;
                    slide.style.opacity = opacity;
                    slide.style.filter = filter;
                });
            }

            updateDots();
        };

        // Event listener klik pada kartu (desktop only)
        allSlides.forEach((slide) => {
            slide.addEventListener('click', (e) => {
                if (isMobile()) return; // Skip on mobile
                let i = activeSlides.indexOf(e.currentTarget);
                if (i === -1) return;
                const numSlides = activeSlides.length;
                
                let diff = (i - currentOffset) % numSlides;
                if (diff < -Math.floor(numSlides / 2)) diff += numSlides;
                if (diff > Math.floor(numSlides / 2)) diff -= numSlides;
                
                if (diff === 0) {
                    currentOffset = (currentOffset + 1) % numSlides;
                } else {
                    currentOffset = (currentOffset + diff + numSlides) % numSlides;
                }
                updateDeck();
            });
        });

        // --- Prev / Next buttons ---
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const numSlides = activeSlides.length;
                if (numSlides === 0) return;
                currentOffset = (currentOffset - 1 + numSlides) % numSlides;
                updateDeck();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const numSlides = activeSlides.length;
                if (numSlides === 0) return;
                currentOffset = (currentOffset + 1) % numSlides;
                updateDeck();
            });
        }

        // --- Touch swipe support for mobile ---
        const carouselTrack = document.querySelector('.carousel-track');
        if (carouselTrack) {
            let touchStartX = 0;
            let touchEndX = 0;
            const SWIPE_THRESHOLD = 50;

            carouselTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            carouselTrack.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                const numSlides = activeSlides.length;
                if (numSlides === 0) return;

                if (Math.abs(diff) > SWIPE_THRESHOLD) {
                    if (diff > 0) {
                        currentOffset = (currentOffset + 1) % numSlides;
                    } else {
                        currentOffset = (currentOffset - 1 + numSlides) % numSlides;
                    }
                    updateDeck();
                }
            }, { passive: true });
        }

        // Event listener klik pada filter
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const filterValue = e.currentTarget.getAttribute('data-filter');
                
                if (filterValue === 'all') {
                    activeSlides = [...allSlides];
                } else {
                    activeSlides = allSlides.filter(slide => {
                        const cats = slide.getAttribute('data-categories') || '';
                        return cats.split(',').includes(filterValue);
                    });
                }
                currentOffset = 0; 
                buildDots();
                updateDeck();
            });
        });

        // Handle resize between mobile/desktop
        let lastMobile = isMobile();
        window.addEventListener('resize', () => {
            const nowMobile = isMobile();
            if (nowMobile !== lastMobile) {
                lastMobile = nowMobile;
                updateDeck();
            }
        });

        // Initialize
        buildDots();
        updateDeck();
    }

    /* ==========================================================================
       Smooth Navbar Background
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    /* ==========================================================================
       Hamburger Mobile Menu
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ==========================================================================
       Dark Mode Toggle
       ========================================================================== */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            if (current === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '☀️';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '🌙';
            }
        });
    }

    /* ==========================================================================
       Back to Top Button
       ========================================================================== */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       Skeleton Loading - Remove skeleton class when images load
       ========================================================================== */
    document.querySelectorAll('img.skeleton').forEach(img => {
        if (img.complete) {
            img.classList.remove('skeleton');
        } else {
            img.addEventListener('load', () => {
                img.classList.remove('skeleton');
            });
            img.addEventListener('error', () => {
                img.classList.remove('skeleton');
            });
        }
    });

    /* ==========================================================================
       Game Showcase Pagination
       ========================================================================== */
    const gameGrid = document.querySelector('.game-grid');
    const gameCards = gameGrid ? Array.from(gameGrid.querySelectorAll('.game-card')) : [];
    const gamePrevBtn = document.querySelector('.game-page-prev');
    const gameNextBtn = document.querySelector('.game-page-next');
    const gameDotsContainer = document.querySelector('.game-page-dots');
    const gameFilterBtns = document.querySelectorAll('.game-filter-btn');

    if (gameGrid && gameCards.length > 0 && gameDotsContainer) {
        let activeGameCards = [...gameCards];
        let activeGameIndex = 0;
        let gameScrollTicking = false;
        const isCenteredGameScroll = () => window.innerWidth <= 900;

        const getVisibleGameCount = () => {
            if (isCenteredGameScroll() || activeGameCards.length === 0) return 1;
            const styles = window.getComputedStyle(gameGrid);
            const gap = parseFloat(styles.columnGap || styles.gap) || 0;
            const cardWidth = activeGameCards[0].offsetWidth;
            return Math.max(1, Math.floor((gameGrid.clientWidth + gap) / (cardWidth + gap)));
        };

        const getMaxGameIndex = () => Math.max(0, activeGameCards.length - getVisibleGameCount());

        const scrollToGame = (index) => {
            if (activeGameCards.length === 0) return;
            const targetIndex = Math.max(0, Math.min(index, getMaxGameIndex()));
            const targetCard = activeGameCards[targetIndex];
            const startLeft = targetCard.offsetLeft - gameGrid.offsetLeft;
            const centeredLeft = startLeft - ((gameGrid.clientWidth - targetCard.clientWidth) / 2);
            gameGrid.scrollTo({
                left: isCenteredGameScroll() ? centeredLeft : startLeft,
                behavior: 'smooth'
            });
        };

        const buildGameDots = () => {
            gameDotsContainer.innerHTML = '';
            const dotCount = getMaxGameIndex() + 1;
            for (let index = 0; index < dotCount; index++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'game-page-dot';
                dot.setAttribute('aria-label', `Go to game page ${index + 1}`);
                dot.addEventListener('click', () => scrollToGame(index));
                gameDotsContainer.appendChild(dot);
            }
        };

        const updateGamePagination = () => {
            if (activeGameCards.length === 0) {
                activeGameIndex = 0;
                if (gamePrevBtn) gamePrevBtn.disabled = true;
                if (gameNextBtn) gameNextBtn.disabled = true;
                return;
            }

            const gridRect = gameGrid.getBoundingClientRect();
            const gridCenter = gridRect.left + (gridRect.width / 2);
            const closestIndex = activeGameCards.reduce((closest, card, index) => {
                const cardRect = card.getBoundingClientRect();
                const closestRect = activeGameCards[closest].getBoundingClientRect();
                const currentPosition = isCenteredGameScroll() ? cardRect.left + (cardRect.width / 2) : cardRect.left;
                const closestPosition = isCenteredGameScroll() ? closestRect.left + (closestRect.width / 2) : closestRect.left;
                const targetPosition = isCenteredGameScroll() ? gridCenter : gridRect.left;
                const currentDistance = Math.abs(currentPosition - targetPosition);
                const closestDistance = Math.abs(closestPosition - targetPosition);
                return currentDistance < closestDistance ? index : closest;
            }, 0);

            activeGameIndex = Math.min(closestIndex, getMaxGameIndex());
            gameDotsContainer.querySelectorAll('.game-page-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === activeGameIndex);
            });

            if (gamePrevBtn) gamePrevBtn.disabled = activeGameIndex === 0;
            if (gameNextBtn) gameNextBtn.disabled = activeGameIndex === getMaxGameIndex();
        };

        const applyGameFilter = (filterValue) => {
            activeGameCards = gameCards.filter(card => {
                const categories = card.getAttribute('data-categories') || '';
                return filterValue === 'all' || categories.split(',').includes(filterValue);
            });

            gameCards.forEach(card => {
                card.hidden = !activeGameCards.includes(card);
            });

            activeGameIndex = 0;
            buildGameDots();
            gameGrid.scrollTo({ left: 0, behavior: 'smooth' });
            window.requestAnimationFrame(updateGamePagination);
        };

        if (gamePrevBtn) {
            gamePrevBtn.addEventListener('click', () => scrollToGame(activeGameIndex - 1));
        }

        if (gameNextBtn) {
            gameNextBtn.addEventListener('click', () => scrollToGame(activeGameIndex + 1));
        }

        gameGrid.addEventListener('scroll', () => {
            if (gameScrollTicking) return;
            gameScrollTicking = true;
            window.requestAnimationFrame(() => {
                updateGamePagination();
                gameScrollTicking = false;
            });
        }, { passive: true });

        gameFilterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                gameFilterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
                e.currentTarget.classList.add('active');
                applyGameFilter(e.currentTarget.getAttribute('data-filter'));
            });
        });

        window.addEventListener('resize', () => {
            buildGameDots();
            updateGamePagination();
        });
        buildGameDots();
        updateGamePagination();
    }

    /* ==========================================================================
       Game Screenshot Galleries
       ========================================================================== */
    document.querySelectorAll('.game-gallery').forEach(gallery => {
        const track = gallery.querySelector('.game-gallery-track');
        const screenshots = gallery.querySelectorAll('.game-screenshot');
        const prevBtn = gallery.querySelector('.game-gallery-prev');
        const nextBtn = gallery.querySelector('.game-gallery-next');
        const dotsContainer = gallery.querySelector('.game-gallery-dots');
        let currentIndex = 0;

        if (screenshots.length <= 1) {
            // Hide nav for single-image cards
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }

        // Build dots
        screenshots.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('game-gallery-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        const updateGallery = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dotsContainer.querySelectorAll('.game-gallery-dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
        };

        const goTo = (index) => {
            currentIndex = (index + screenshots.length) % screenshots.length;
            updateGallery();
        };

        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex - 1); });
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(currentIndex + 1); });

        // Touch swipe
        let startX = 0;
        gallery.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].screenX; }, { passive: true });
        gallery.addEventListener('touchend', (e) => {
            const diff = startX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) goTo(currentIndex + (diff > 0 ? 1 : -1));
        }, { passive: true });
    });

});
