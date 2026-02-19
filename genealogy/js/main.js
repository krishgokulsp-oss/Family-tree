/* ============================================================
   LINEAGE — Heritage Family Archive
   main.js | Core JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky Header ─────────────────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile Nav Toggle ─────────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      // Animate hamburger lines
      const spans = toggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  /* ── Active Nav Link ───────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Search Overlay ────────────────────────────────────── */
  const searchOverlay = document.querySelector('.search-overlay');
  const searchBtn     = document.querySelector('.nav-search-btn');
  const searchClose   = document.querySelector('.search-close');
  const searchInput   = document.querySelector('.search-input-wrap input');

  const openSearch = () => {
    if (searchOverlay) {
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput && searchInput.focus(), 300);
    }
  };
  const closeSearch = () => {
    if (searchOverlay) searchOverlay.classList.remove('open');
  };

  searchBtn && searchBtn.addEventListener('click', openSearch);
  searchClose && searchClose.addEventListener('click', closeSearch);
  searchOverlay && searchOverlay.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  /* ── Scroll-to-Top ─────────────────────────────────────── */
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Reveal on Scroll (Intersection Observer) ──────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so stagger works correctly
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .timeline-item, .timeline-event').forEach(el => {
    revealObserver.observe(el);
  });

  /* ── Gallery Filters ───────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn, .gallery-categories .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.gallery-categories, .blog-filters');
      if (group) {
        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      const cat = btn.dataset.cat;
      if (!cat || cat === 'all') {
        document.querySelectorAll('.gallery-item[data-cat]').forEach(item => {
          item.style.display = '';
        });
      } else {
        document.querySelectorAll('.gallery-item[data-cat]').forEach(item => {
          item.style.display = item.dataset.cat === cat ? '' : 'none';
        });
      }
    });
  });

  /* ── Lightbox ──────────────────────────────────────────── */
  const lightbox    = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCap = document.querySelector('.lightbox-caption');
  const lbClose     = document.querySelector('.lightbox-close');
  const lbPrev      = document.querySelector('.lightbox-prev');
  const lbNext      = document.querySelector('.lightbox-next');

  let galleryItems = [];
  let currentLbIdx = 0;

  const openLightbox = (idx) => {
    if (!lightbox) return;
    currentLbIdx = idx;
    const item = galleryItems[idx];
    if (!item) return;
    const img = item.querySelector('.gallery-img');
    const cap = item.querySelector('.gallery-caption');
    const yearEl = item.querySelector('.gallery-caption-year');

    if (lightboxImg) {
      if (img && img.src) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
      } else {
        lightboxImg.src = '';
        lightboxImg.alt = 'Heritage photograph';
      }
    }
    if (lightboxCap) {
      lightboxCap.textContent = (yearEl ? yearEl.textContent + ' — ' : '') + (cap ? cap.childNodes[cap.childNodes.length - 1]?.textContent?.trim() || '' : '');
    }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (lightbox) {
    galleryItems = [...document.querySelectorAll('.gallery-item')];
    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(idx));
    });
    lbClose && lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    lbPrev && lbPrev.addEventListener('click', () => {
      currentLbIdx = (currentLbIdx - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentLbIdx);
    });
    lbNext && lbNext.addEventListener('click', () => {
      currentLbIdx = (currentLbIdx + 1) % galleryItems.length;
      openLightbox(currentLbIdx);
    });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'ArrowLeft') lbPrev && lbPrev.click();
      if (e.key === 'ArrowRight') lbNext && lbNext.click();
    });
  }

  /* ── Tree Node Tooltips ────────────────────────────────── */
  document.querySelectorAll('.tree-node').forEach(node => {
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    node.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') node.click();
    });
  });

  /* ── Blog Filter Buttons ───────────────────────────────── */
  document.querySelectorAll('.blog-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.blog-filters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── Tree Expand Controls ──────────────────────────────── */
  document.querySelectorAll('.tree-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tree-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── Smooth anchor links ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Parallax Hero Subtle ──────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

});
