(() => {
    const root = document.documentElement;
    const body = document.body;
    const themeToggle = document.querySelector('#themeToggle');
    const menuToggle = document.querySelector('#menuToggle');
    const mobileNav = document.querySelector('#mobileNav');

    const updateThemeLabel = () => {
        const isDark = root.dataset.theme === 'dark';
        if (themeToggle) {
            themeToggle.textContent = isDark ? 'Light' : 'Dark';
            themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
        }
    };

    updateThemeLabel();

    themeToggle?.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = nextTheme;
        localStorage.setItem('theme', nextTheme);
        updateThemeLabel();
    });

    const closeMenu = () => {
        if (!mobileNav || !menuToggle) return;
        mobileNav.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu';
        body.classList.remove('menu-open');
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuToggle.focus();
        }
    });

    menuToggle?.addEventListener('click', () => {
        const open = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!open));
        menuToggle.textContent = open ? 'Menu' : 'Close';
        mobileNav.hidden = open;
        body.classList.toggle('menu-open', !open);
    });

    mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    const revealItems = document.querySelectorAll('.reveal');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    } else if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, instance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                instance.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const filterButtons = [...document.querySelectorAll('.filter-bar button')];
    const gameCards = [...document.querySelectorAll('.game-card')];
    const filterStatus = document.querySelector('#filterStatus');
    const pagePrev = document.querySelector('#pagePrev');
    const pageNext = document.querySelector('#pageNext');
    const pageNumbers = document.querySelector('#pageNumbers');
    const pageSize = 3;
    let currentFilter = 'all';
    let currentPage = 1;

    const filteredCards = () => gameCards.filter((card) => {
        const categories = (card.dataset.categories || '').split(',');
        return currentFilter === 'all' || categories.includes(currentFilter);
    });

    const renderArchive = () => {
        const cards = filteredCards();
        const total = cards.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        currentPage = Math.min(Math.max(1, currentPage), totalPages);
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;

        gameCards.forEach((card) => { card.hidden = true; });
        cards.forEach((card, index) => {
            card.hidden = index < start || index >= end;
        });

        filterButtons.forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.filter === currentFilter));
        });

        if (filterStatus) {
            if (total === 0) {
                filterStatus.textContent = 'No games in this filter';
            } else {
                const from = start + 1;
                const to = Math.min(end, total);
                filterStatus.textContent = `Showing ${from}-${to} of ${total} game${total === 1 ? '' : 's'}`;
            }
        }

        if (pageNumbers) {
            pageNumbers.replaceChildren();
            for (let page = 1; page <= totalPages; page += 1) {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = String(page);
                button.setAttribute('aria-label', `Page ${page}`);
                button.setAttribute('aria-current', page === currentPage ? 'page' : 'false');
                button.addEventListener('click', () => {
                    currentPage = page;
                    renderArchive();
                });
                pageNumbers.append(button);
            }
        }

        if (pagePrev) pagePrev.disabled = currentPage <= 1 || total === 0;
        if (pageNext) pageNext.disabled = currentPage >= totalPages || total === 0;
    };

    filterButtons.forEach((button) => button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        currentPage = 1;
        renderArchive();
    }));
    pagePrev?.addEventListener('click', () => {
        currentPage -= 1;
        renderArchive();
    });
    pageNext?.addEventListener('click', () => {
        currentPage += 1;
        renderArchive();
    });
    renderArchive();

    const dialog = document.querySelector('#gameDialog');
    const dialogClose = document.querySelector('#dialogClose');
    const dialogImage = document.querySelector('#dialogImage');
    const dialogTitle = document.querySelector('#dialogTitle');
    const dialogRole = document.querySelector('#dialogRole');
    const dialogDescription = document.querySelector('#dialogDescription');
    const dialogLink = document.querySelector('#dialogLink');
    let lastTrigger = null;

    const closeDialog = () => {
        if (dialog?.open) dialog.close();
    };

    gameCards.forEach((card) => {
        card.addEventListener('click', (event) => {
            if (!dialog?.showModal) return;
            event.preventDefault();
            lastTrigger = card;
            const image = card.querySelector('img');
            if (image) {
                dialogImage.src = image.currentSrc || image.src;
                dialogImage.alt = image.alt;
            }
            dialogTitle.textContent = card.querySelector('h3')?.textContent || '';
            dialogRole.textContent = card.dataset.role || '';
            dialogDescription.textContent = card.dataset.description || '';
            dialogLink.href = card.dataset.href;
            dialog.showModal();
            body.classList.add('dialog-open');
            dialogClose.focus();
        });
    });

    dialogClose?.addEventListener('click', closeDialog);
    dialog?.addEventListener('click', (event) => {
        if (event.target === dialog) closeDialog();
    });

    dialog?.addEventListener('close', () => {
        body.classList.remove('dialog-open');
        lastTrigger?.focus();
    });
})();

// Ponytail: native <dialog> and IntersectionObserver cover modal and reveal needs;
// add a dedicated router only if this stays multi-page.
