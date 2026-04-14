// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Scroll Reveal Animation
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');

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
        
        const updateDeck = () => {
            const numSlides = activeSlides.length;
            
            // Sembunyikan yang tidak cocok filter
            allSlides.forEach(slide => {
                if (!activeSlides.includes(slide)) {
                    slide.style.opacity = '0';
                    slide.style.pointerEvents = 'none';
                    // Kita scale turun ke belakang & hide supaya transisi filter terasa halus
                    slide.style.transform = 'translateY(100px) scale(0.5)';
                    slide.style.zIndex = -1;
                } else {
                    slide.style.pointerEvents = 'auto';
                }
            });

            if (numSlides === 0) return;

            activeSlides.forEach((slide, i) => {
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
        };

        // Event listener klik pada kartu
        allSlides.forEach((slide) => {
            slide.addEventListener('click', (e) => {
                let i = activeSlides.indexOf(e.currentTarget);
                if (i === -1) return; // Ignore if hidden
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
                // Kembalikan ke indeks 0 tiap pindah kategori
                currentOffset = 0; 
                updateDeck();
            });
        });

        // Initialize deck
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

});
