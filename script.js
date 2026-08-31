// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll shrink
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50));

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll-reveal animation
const revealEls = document.querySelectorAll('.service-card,.timeline-item,.why-card,.package-card,.cert-tall,.cert-wide');
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }, (i%5)*60);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  ro.observe(el);
});

// Contact form — Formspree
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/xyklplag', {
        method:'POST', body:data, headers:{Accept:'application/json'}
      });
      if (res.ok) { btn.textContent='✓ Message Sent!'; btn.style.background='#1a8a5a'; form.reset(); }
      else throw new Error();
    } catch {
      const s=`mailto:jandylviosva@gmail.com?subject=Inquiry from ${data.get('name')}&body=${data.get('message')}`;
      window.location.href=s;
      btn.textContent='Send Message'; btn.disabled=false;
    }
  });
}

// ============================================================
// CAROUSEL  (3 per view → 2 on tablet → 1 on mobile)
// ============================================================
const carousels = {
  appt:    { index:0, total:8  },
  listing: { index:0, total:10 },
  store:   { index:0, total:9  }
};

function perView() {
  return window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
}

function buildDots(id) {
  const pv = perView();
  const pages = Math.ceil(carousels[id].total / pv);
  const wrap = document.getElementById('dots-' + id);
  if (!wrap) return;
  wrap.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === carousels[id].index ? ' active' : '');
    d.onclick = () => { carousels[id].index = i; updateCarousel(id); };
    wrap.appendChild(d);
  }
}

function updateCarousel(id) {
  const pv = perView();
  const pages = Math.ceil(carousels[id].total / pv);
  carousels[id].index = Math.max(0, Math.min(carousels[id].index, pages - 1));
  const track = document.querySelector('#carousel-' + id + ' .carousel-track');
  if (track) {
    const slideW = 100 / pv;
    track.style.transform = `translateX(-${carousels[id].index * slideW * pv}%)`;
  }
  document.querySelectorAll('#dots-' + id + ' .carousel-dot')
    .forEach((d, i) => d.classList.toggle('active', i === carousels[id].index));
}

function carouselNav(id, dir) {
  const pv = perView();
  const pages = Math.ceil(carousels[id].total / pv);
  carousels[id].index = (carousels[id].index + dir + pages) % pages;
  updateCarousel(id);
}

['appt','listing','store'].forEach(id => { buildDots(id); updateCarousel(id); });
window.addEventListener('resize', () => ['appt','listing','store'].forEach(id => { buildDots(id); updateCarousel(id); }));

// Touch/drag swipe for carousel
['appt','listing','store'].forEach(id => {
  const wrap = document.querySelector('#carousel-' + id + ' .carousel-track-wrap');
  if (!wrap) return;
  let startX = 0, isDragging = false;
  wrap.addEventListener('mousedown',  e => { isDragging = true; startX = e.clientX; });
  wrap.addEventListener('mousemove',  e => { if (!isDragging) return; e.preventDefault(); });
  wrap.addEventListener('mouseup',    e => {
    if (!isDragging) return; isDragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 40) carouselNav(id, diff > 0 ? 1 : -1);
  });
  wrap.addEventListener('mouseleave', () => { isDragging = false; });
  wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  wrap.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) carouselNav(id, diff > 0 ? 1 : -1);
  });
});

// ============================================================
// SAMPLE WORKS LIGHTBOX
// ============================================================
const lbGalleries = {
  appt:    Array.from({length:8},  (_,i) => `assets/samples/appt/appt-${i+1}.png`),
  listing: Array.from({length:10}, (_,i) => `assets/samples/listing/listing-${i+1}.png`),
  store:   Array.from({length:9},  (_,i) => `assets/samples/store/store-${i+1}.png`)
};
let lbGallery = [], lbIndex = 0;

function openLightbox(gallery, index) {
  lbGallery = lbGalleries[gallery];
  lbIndex   = index;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
  updateLightbox();
}
function updateLightbox() {
  document.getElementById('lb-img').src = lbGallery[lbIndex];
  document.getElementById('lb-counter').textContent = (lbIndex+1) + ' / ' + lbGallery.length;
}
function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbGallery.length) % lbGallery.length;
  updateLightbox();
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
function closeLightboxBg(e) { if (e.target.id === 'lightbox') closeLightbox(); }
document.addEventListener('keydown', e => {
  if (document.getElementById('lightbox').classList.contains('active')) {
    if (e.key==='ArrowRight') lbNav(1);
    if (e.key==='ArrowLeft')  lbNav(-1);
    if (e.key==='Escape')     closeLightbox();
  }
});

// ============================================================
// CERTIFICATE LIGHTBOX — completely separate from sample works
// ============================================================
const certImages = [
  'assets/certs/cert-1.png',
  'assets/certs/cert-2.png',
  'assets/certs/cert-3.jpg'
];
let certIndex = 0;

function openCert(index) {
  certIndex = index;
  document.getElementById('cert-lb-img').src = certImages[certIndex];
  document.getElementById('cert-lb-counter').textContent = (certIndex+1) + ' / ' + certImages.length;
  document.getElementById('cert-lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function certLbNav(dir) {
  certIndex = (certIndex + dir + certImages.length) % certImages.length;
  document.getElementById('cert-lb-img').src = certImages[certIndex];
  document.getElementById('cert-lb-counter').textContent = (certIndex+1) + ' / ' + certImages.length;
}
function closeCertLightbox() {
  document.getElementById('cert-lightbox').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (document.getElementById('cert-lightbox').classList.contains('active')) {
    if (e.key==='ArrowRight') certLbNav(1);
    if (e.key==='ArrowLeft')  certLbNav(-1);
    if (e.key==='Escape')     closeCertLightbox();
  }
});

// ============================================================
// VIDEO TESTIMONIAL CAROUSEL
// ============================================================
// Desktop: flex row, centered. Shows all slides when ≤5.
//   When >5: overflow hidden, prev/next buttons page through by 5.
// Mobile: touch-scroll only, buttons hidden via CSS.
(function () {
  const MAX_VISIBLE = 5;
  const slides   = Array.from(document.querySelectorAll('.tv-slide'));
  const carousel = document.getElementById('tvCarousel');
  const prevBtn  = document.getElementById('tvPrev');
  const nextBtn  = document.getElementById('tvNext');
  if (!slides.length || !carousel) return;

  const isMobile = () => window.innerWidth <= 767;
  let offset = 0; // index of first visible slide (desktop paging)

  function needsNav() {
    return !isMobile() && slides.length > MAX_VISIBLE;
  }

  function updateButtons() {
    if (!needsNav()) {
      prevBtn.classList.add('hidden');
      nextBtn.classList.add('hidden');
      return;
    }
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    prevBtn.disabled = offset === 0;
    nextBtn.disabled = offset + MAX_VISIBLE >= slides.length;
  }

  function renderVisible() {
    if (isMobile()) {
      // Mobile: all slides visible, CSS handles scroll
      slides.forEach(s => s.style.display = '');
      return;
    }
    slides.forEach((s, i) => {
      s.style.display = (i >= offset && i < offset + MAX_VISIBLE) ? '' : 'none';
    });
    updateButtons();
  }

  function page(dir) {
    // Pause any playing videos
    slides.forEach(s => { const v = s.querySelector('video'); if (v) v.pause(); });
    offset = Math.max(0, Math.min(offset + dir * MAX_VISIBLE, slides.length - MAX_VISIBLE));
    renderVisible();
  }

  prevBtn.addEventListener('click', () => page(-1));
  nextBtn.addEventListener('click', () => page(1));

  // Re-render on resize (mobile ↔ desktop switch)
  window.addEventListener('resize', renderVisible);

  // Initial render
  renderVisible();

  // Pause all videos when section scrolls out of view
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) {
      slides.forEach(s => { const v = s.querySelector('video'); if (v) v.pause(); });
    }
  }, { threshold: 0.1 });
  observer.observe(carousel);
})();
