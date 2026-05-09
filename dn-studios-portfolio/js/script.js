// DN STUDIOS – Multi-page logic: Dark mode, active nav, mobile menu, filter (if exists)
(function() {
  // Dark mode toggle & localStorage
  const toggleBtn = document.getElementById('darkModeToggle');
  const body = document.body;
  const loadTheme = () => {
    const saved = localStorage.getItem('dn_theme');
    if (saved === 'dark') {
      body.classList.add('dark');
      updateIcon(true);
    } else {
      body.classList.remove('dark');
      updateIcon(false);
    }
  };
  const updateIcon = (isDark) => {
    if (toggleBtn) {
      const isSubDir = window.location.pathname.includes('/docs/');
      const assetPath = isSubDir ? '../assets/' : 'assets/';
      toggleBtn.innerHTML = isDark ? `<img src="${assetPath}icon_sun.svg" alt="Light Mode">` : `<img src="${assetPath}icon_moon.svg" alt="Dark Mode">`;
    }
  };
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        localStorage.setItem('dn_theme', 'light');
        updateIcon(false);
      } else {
        body.classList.add('dark');
        localStorage.setItem('dn_theme', 'dark');
        updateIcon(true);
      }
    });
  }
  loadTheme();

  // Active navigation highlighting based on current page URL
  const setActiveNav = () => {
    const pathArray = window.location.pathname.split('/');
    const currentPath = pathArray[pathArray.length - 1] || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link:not(.hire-btn)');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      // Handle Services anchor on home page
      if (href === currentPath || 
         (currentPath === 'index.html' && href === 'index.html') ||
         (currentPath === 'index.html' && href === 'index.html#services')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };
  setActiveNav();

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');
  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle('show-nav');
    });
    // Close when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinksContainer.classList.remove('show-nav'));
    });
  }

  // Portfolio filter (only if .filter-btn exists)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    const filterGallery = (category) => {
      galleryItems.forEach(item => {
        const itemCat = item.dataset.category;
        if (category === 'all' || itemCat === category) {
          item.classList.remove('item-hidden');
        } else {
          item.classList.add('item-hidden');
        }
      });
    };
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterGallery(val);
      });
    });
    filterGallery('all'); // show all by default
  }

  // Intersection Observer for Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealObserver.observe(el));
})();