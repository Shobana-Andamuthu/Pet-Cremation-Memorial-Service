/**
 * Template 10: Pet Cremation & Memorial Service
 * Core Interactivity & Accessibility Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initDirection();
  initMobileDrawer();
  initDropdowns();
  initBackToTop();
  initCandles();
  initModals();
  initPasswordToggles();
  initAccordions();
  initCustomSelects();
});

/* ===================================================================
   Preloader Management
   =================================================================== */
function initPreloader() {
  const preloader = document.getElementById('pagePreloader');
  if (!preloader) return;

  function hidePreloader() {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 550);
  }

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 350);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 250));
    setTimeout(hidePreloader, 1500);
  }
}

/* ===================================================================
   Back to Top Floating Button
   =================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 320) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   Accordion Handler (Home 2 Process Section)
   =================================================================== */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isActive = item.classList.contains('active');

      // Close other accordion items in same list
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
      }

      item.classList.toggle('active', !isActive);
    });
  });
}

/* ===================================================================
   0. Password Visibility Toggle
   =================================================================== */
function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll('[data-action="toggle-password"]');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');

      btn.innerHTML = isPassword ? `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      ` : `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      `;
    });
  });
}

/* ===================================================================
   1. Theme Management (Light / Dark)
   =================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
  }

  const themeToggles = document.querySelectorAll('.theme-toggle, .drawer-theme-btn, #drawerThemeToggle');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });
}

function updateThemeIcons(theme) {
  const sunIcons = document.querySelectorAll('.theme-icon-sun, .sun-icon');
  const moonIcons = document.querySelectorAll('.theme-icon-moon, .moon-icon');
  const themeTexts = document.querySelectorAll('.theme-text');

  if (theme === 'dark') {
    sunIcons.forEach(el => el.style.display = 'block');
    moonIcons.forEach(el => el.style.display = 'none');
    themeTexts.forEach(el => el.textContent = 'Light Mode');
  } else {
    sunIcons.forEach(el => el.style.display = 'none');
    moonIcons.forEach(el => el.style.display = 'block');
    themeTexts.forEach(el => el.textContent = 'Dark Mode');
  }
}

/* ===================================================================
   2. RTL / LTR Direction Management
   =================================================================== */
function initDirection() {
  const savedDir = localStorage.getItem('direction') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateRtlButtonText(savedDir);

  function toggleRtl() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('direction', newDir);
    updateRtlButtonText(newDir);
  }

  const rtlToggles = document.querySelectorAll('.rtl-toggle, #drawerRtlToggle');
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleRtl);
  });
}

function updateRtlButtonText(dir) {
  const rtlToggles = document.querySelectorAll('.rtl-toggle, #drawerRtlToggle');
  rtlToggles.forEach(toggle => {
    toggle.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* ===================================================================
   3. Mobile & Tablet Drawer Navigation
   =================================================================== */
function initMobileDrawer() {
  const toggleBtns = document.querySelectorAll('.menu-toggle, .hamburger-btn, #mobileMenuToggle, #mobileMenuBtn');
  const drawers = document.querySelectorAll('.mobile-drawer, #mobileDrawer');
  const overlays = document.querySelectorAll('.mobile-drawer-overlay');
  const closeBtns = document.querySelectorAll('.drawer-close, .mobile-drawer-close, #drawerCloseBtn');

  if (drawers.length === 0 || toggleBtns.length === 0) return;

  function openDrawer() {
    overlays.forEach(o => o.classList.add('open'));
    drawers.forEach(d => d.classList.add('open'));
    document.body.style.overflow = 'hidden';
    toggleBtns.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
  }

  function closeDrawer() {
    overlays.forEach(o => o.classList.remove('open'));
    drawers.forEach(d => d.classList.remove('open'));
    document.body.style.overflow = '';
    toggleBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));

    // Automatically collapse and reset all dropdowns inside the drawer
    document.querySelectorAll('.drawer-dropdown, .mobile-accordion-item').forEach(el => {
      el.classList.remove('open');
      const trigger = el.querySelector('.drawer-dropdown-btn, .mobile-accordion-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = Array.from(drawers).some(d => d.classList.contains('open'));
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeDrawer();
      }
    });
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    const isAnyOpen = Array.from(drawers).some(d => d.classList.contains('open'));
    if (isAnyOpen) {
      const clickedInsideDrawer = Array.from(drawers).some(d => d.contains(e.target));
      const clickedToggle = Array.from(toggleBtns).some(btn => btn.contains(e.target));
      if (!clickedInsideDrawer && !clickedToggle) {
        closeDrawer();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });

  // Mobile Drawer Dropdowns & Accordions
  const dropdownBtns = document.querySelectorAll('.drawer-dropdown-btn, .mobile-accordion-trigger');
  dropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.drawer-dropdown, .mobile-accordion-item');
      if (parent) {
        const isCurrentlyOpen = parent.classList.contains('open');
        parent.classList.toggle('open', !isCurrentlyOpen);
        btn.setAttribute('aria-expanded', !isCurrentlyOpen ? 'true' : 'false');
      }
    });
  });
}

/* ===================================================================
   4. Dropdown Menu Handling
   =================================================================== */
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
  });

  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
}

/* ===================================================================
   5. Interactive Memorial Candle Lighting
   =================================================================== */
function initCandles() {
  const candleButtons = document.querySelectorAll('.candle-btn');

  candleButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const isLit = this.classList.contains('lit');
      const petName = this.getAttribute('data-pet') || 'cherished companion';

      if (!isLit) {
        this.classList.add('lit');
        this.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11zm0 15a3 3 0 0 1-3-3c0-1.5 1-3 3-5 2 2 3 3.5 3 5a3 3 0 0 1-3 3z"/>
          </svg>
          Candle Lit
        `;
        showToast(`🕊️ You lit a memorial candle for ${petName}`);
      } else {
        showToast(`Candle is already burning with love for ${petName}`);
      }
    });
  });
}

/* ===================================================================
   6. Modals & Consultation Triggers
   =================================================================== */
function initModals() {
  const modalOverlay = document.querySelector('#contactModal');
  const modalTriggers = document.querySelectorAll('[data-open-modal="contact"]');
  const modalCloses = document.querySelectorAll('.modal-close, [data-close-modal]');

  if (!modalOverlay) return;

  function openModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  const modalForm = modalOverlay.querySelector('form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('🕊️ Thank you. Our care team will reach out with gentle guidance.');
      modalForm.reset();
    });
  }
}

/* ===================================================================
   7. Toast Notification Utility
   =================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ===================================================================
   8. Custom Responsive Select Dropdowns (Matches Native Replacement UI)
   =================================================================== */
function initCustomSelects() {
  const selects = document.querySelectorAll('select.form-select, select.form-control');
  
  selects.forEach(select => {
    if (select.dataset.customized === 'true') return;
    select.dataset.customized = 'true';

    select.classList.add('custom-select-native');

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';

    const selectedOption = select.options[select.selectedIndex] || select.options[0];
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'custom-select-label';
    labelSpan.textContent = selectedOption ? selectedOption.text : 'Select an option...';
    
    const arrow = document.createElement('span');
    arrow.className = 'custom-select-arrow';
    arrow.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

    trigger.appendChild(labelSpan);
    trigger.appendChild(arrow);

    const dropdown = document.createElement('div');
    dropdown.className = 'custom-select-dropdown';
    dropdown.setAttribute('role', 'listbox');

    Array.from(select.options).forEach((opt, idx) => {
      const optDiv = document.createElement('div');
      optDiv.className = 'custom-select-option';
      if (opt.disabled) optDiv.classList.add('disabled');
      if (idx === select.selectedIndex && !opt.disabled) optDiv.classList.add('selected');
      optDiv.dataset.value = opt.value;
      optDiv.textContent = opt.text;

      optDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        if (opt.disabled) return;

        select.selectedIndex = idx;
        labelSpan.textContent = opt.text;
        
        dropdown.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
        optDiv.classList.add('selected');

        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');

        select.dispatchEvent(new Event('change', { bubbles: true }));
      });

      dropdown.appendChild(optDiv);
    });

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('open');

      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        if (w !== wrapper) {
          w.classList.remove('open');
          w.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      wrapper.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
    });

    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    wrapper.appendChild(trigger);
    wrapper.appendChild(dropdown);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        w.classList.remove('open');
        w.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        w.classList.remove('open');
        w.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}
