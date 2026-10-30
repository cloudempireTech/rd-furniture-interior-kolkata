/**
 * R D FURNITURE & INTERIOR - Official JavaScript Suite
 * Craftsmanship Since 1978 | Thakurpukur, Kolkata
 * Interactive Typewriter, Count-Up Telemetry, Live Calculator, Filter Rail & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const navToggle = document.querySelector('.btn-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Header Scroll Effect
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Dynamic Typewriter Animation
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const phrases = [
      'Custom Teak Living Sets',
      'Modular Kitchen Solutions',
      'Designer Bedroom Wardrobes',
      'Handcrafted Carved Doors',
      'Bespoke Office Woodwork',
      'Artisanal Diwans & Benches'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const delayBetween = 1800;

    function typeLoop() {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typewriterEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
      }

      let timeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIdx === current.length) {
        timeout = delayBetween;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        timeout = 400;
      }

      setTimeout(typeLoop, timeout);
    }

    typeLoop();
  }

  // 4. Hero Video Play/Pause Toggle
  const heroVideo = document.querySelector('.hero-video');
  const videoControlBtn = document.querySelector('.video-control-btn');
  if (heroVideo && videoControlBtn) {
    videoControlBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play();
        videoControlBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
        videoControlBtn.setAttribute('aria-label', 'Pause video');
      } else {
        heroVideo.pause();
        videoControlBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
        videoControlBtn.setAttribute('aria-label', 'Play video');
      }
    });
  }

  // 5. Animated Count-Up Telemetry Numbers
  const statCounters = document.querySelectorAll('.stat-counter');
  if (statCounters.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOut;

            el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${target}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    statCounters.forEach(c => observer.observe(c));
  }

  // 6. Sticky Floating Portfolio Filter Rail
  const filterBtns = document.querySelectorAll('.portfolio-filter .filter-btn');
  const offeringCards = document.querySelectorAll('.offering-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Smooth scroll tab into horizontal view
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

        const filter = btn.getAttribute('data-filter') || 'all';

        offeringCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. Interactive Woodwork & Storage Value Calculator
  const roomSlider = document.getElementById('calc-room-size');
  const roomValDisplay = document.getElementById('calc-room-val');
  const storageResult = document.getElementById('calc-storage-efficiency');
  const cabinetryResult = document.getElementById('calc-cabinetry-sqft');
  const durabilityResult = document.getElementById('calc-wood-durability');

  if (roomSlider && roomValDisplay && storageResult && cabinetryResult && durabilityResult) {
    function updateCalc() {
      const sqft = parseInt(roomSlider.value, 10);
      roomValDisplay.textContent = `${sqft} sq.ft`;
      
      // Calculations (Pure portfolio ergonomics - zero prices)
      const estimatedCabinetry = Math.round(sqft * 0.42);
      cabinetryResult.textContent = `${estimatedCabinetry} sq.ft`;
      
      const storageGain = Math.round(sqft * 1.65);
      storageResult.textContent = `+${storageGain} Cu.Ft`;

      durabilityResult.textContent = '25+ Yrs Teak';
    }

    roomSlider.addEventListener('input', updateCalc);
    updateCalc();
  }

  // 8. Bespoke WhatsApp Form Handoff
  const inquiryForms = document.querySelectorAll('.whatsapp-inquiry-form');
  inquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value.trim() || 'Homeowner';
      const service = form.querySelector('[name="service"]')?.value || 'Custom Furniture';
      const dimensions = form.querySelector('[name="dimensions"]')?.value.trim() || 'General inquiry';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';

      const phone = '918981462599';
      let text = `Namaste R D Furniture & Interior,\n\nI am contacting you from your official website portfolio.\n\n*Name:* ${name}\n*Requirement:* ${service}\n*Room / Dimensions:* ${dimensions}`;
      if (message) {
        text += `\n*Details / Preferences:* ${message}`;
      }
      text += `\n\nI would like to schedule a workshop consultation or laser measurement visit. Please let me know your availability.`;

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    });
  });
});
