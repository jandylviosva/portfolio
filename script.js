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

// Contact form (Formspree fallback to mailto)
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
    // each slide is 1/pv wide; move by full page widths
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

// ── Touch/drag swipe for desktop carousel ──
['appt','listing','store'].forEach(id => {
  const wrap = document.querySelector('#carousel-' + id + ' .carousel-track-wrap');
  if (!wrap) return;
  let startX = 0, isDragging = false;
  wrap.addEventListener('mousedown',  e => { isDragging = true; startX = e.clientX; });
  wrap.addEventListener('mousemove',  e => { if (!isDragging) return; e.preventDefault(); });
  wrap.addEventListener('mouseup',    e => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 40) carouselNav(id, diff > 0 ? 1 : -1);
  });
  wrap.addEventListener('mouseleave', () => { isDragging = false; });
  // touch
  wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  wrap.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) carouselNav(id, diff > 0 ? 1 : -1);
  });
});

// ============================================================
// LIGHTBOX  (shared for samples + certs)
// ============================================================
const lbGalleries = {
  appt:    Array.from({length:8},  (_,i) => `assets/samples/appt/appt-${i+1}.png`),
  listing: Array.from({length:10}, (_,i) => `assets/samples/listing/listing-${i+1}.png`),
  store:   Array.from({length:9},  (_,i) => `assets/samples/store/store-${i+1}.png`),
  certs:   [
    'assets/certs/cert-1.png',
    'assets/certs/cert-2.png',
    'assets/certs/cert-3.jpg'
  ]
};
let lbGallery = [], lbIndex = 0;

function openLightbox(gallery, index) {
  lbGallery = lbGalleries[gallery];
  lbIndex   = index;
  const lb = document.getElementById('lightbox');
  lb.classList.add('active');
  lb.classList.remove('cert-open');
  document.body.style.overflow = 'hidden';
  updateLightbox();
}

// Certificates — single image, no nav arrows needed but reuse lightbox
function openCert(index) {
  lbGallery = lbGalleries['certs'];
  lbIndex   = index;
  const lb = document.getElementById('lightbox');
  lb.classList.add('active', 'cert-open');
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
  const lb = document.getElementById('lightbox');
  lb.classList.remove('active', 'cert-open');
  document.body.style.overflow = '';
}
function closeLightboxBg(e) { if (e.target.id === 'lightbox') closeLightbox(); }
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key==='ArrowRight') lbNav(1);
  if (e.key==='ArrowLeft')  lbNav(-1);
  if (e.key==='Escape')     closeLightbox();
});

// ============================================================
// VIDEO AUTOPLAY ON SCROLL INTO VIEW
// ============================================================
const vid = document.getElementById('testimonialVideo');
if (vid) {
  new IntersectionObserver(entries => {
    entries[0].isIntersecting ? vid.play() : vid.pause();
  }, { threshold: 0.5 }).observe(vid);
}
