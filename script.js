/* MepuTrip Travel - script.js */

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// ===== SCROLL TO TOP =====
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid children
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, i) => {
        if (sib === entry.target) delay = i * 100;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(delay, 400));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--yellow)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===== PARALLAX HERO SHAPES =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.shape').forEach((shape, i) => {
    const speed = 0.08 + i * 0.04;
    shape.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// ===== PROGRESS BAR ANIMATE ON LOAD =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = w; }, 100);
    });
  }, 800);
});

// ===== TILT EFFECT FOR LAYANAN CARDS =====
document.querySelectorAll('.layanan-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== HERO SECTION WRAPPER FIX =====
// Wrap hero content within its dark container properly
(function heroLayout() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.style.background = 'var(--black)';
  hero.style.padding = '0';
  hero.style.minHeight = '100vh';
  hero.style.position = 'relative';
  hero.style.overflow = 'hidden';

  // Ensure hero-bg-shapes fills hero
  const shapes = hero.querySelector('.hero-bg-shapes');
  if (shapes) {
    shapes.style.position = 'absolute';
    shapes.style.inset = '0';
    shapes.style.pointerEvents = 'none';
    shapes.style.zIndex = '0';
  }

  // Create inner grid wrapper if not present
  if (!hero.querySelector('.hero-inner')) {
    const inner = document.createElement('div');
    inner.className = 'hero-inner';
    const content = hero.querySelector('.hero-content');
    const visual = hero.querySelector('.hero-visual');
    if (content && visual) {
      hero.appendChild(inner);
      inner.appendChild(content);
      inner.appendChild(visual);
    }
  }
})();

console.log('%c🚀 MepuTrip Travel', 'color:#FFB800;font-size:20px;font-weight:900;');
console.log('%cEdu-Travel & Campus Experience Platform', 'color:#FF6B00;font-size:12px;');
