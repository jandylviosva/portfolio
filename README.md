# JV Ecom VA — Portfolio Website
**jvecomva.com** · Built with pure HTML, CSS, and vanilla JS · Hosted on GitHub Pages

---

## 📁 File Structure

```
portfolio/
├── index.html       ← All page content — edit this for text/links/images
├── style.css        ← All styling — edit colors, fonts, layout here
├── script.js        ← Interactions: carousel, lightbox, form, animations
├── README.md        ← This guide
└── assets/
    ├── mylogo.png
    ├── profile.jpg
    ├── profile-about.png
    ├── video-testimonial.mp4
    ├── logos/           ← Company logos, tool logos, social icons
    ├── gifs/            ← Service section GIF icons
    ├── certs/           ← cert-1.png, cert-2.png, cert-3.jpg
    └── samples/
        ├── appt/        ← appt-1.png … appt-8.png
        ├── listing/     ← listing-1.png … listing-10.png
        └── store/       ← store-1.png … store-9.png
```

---

## ✏️ Common edits — what to change and where

### index.html — page content

The file is divided into clearly labelled sections. Use **Ctrl+F** (or Cmd+F) to search for any keyword below:

| What to update | Search for in index.html |
|---|---|
| Name, tagline, hero text | `<!-- HERO -->` |
| Profile photo | `assets/profile.jpg` |
| About Me text | `<!-- ABOUT -->` |
| Education / Training cards | `<!-- ABOUT -->` → info-card blocks |
| Work experience entries | `<!-- EXPERIENCE -->` |
| Services text | `<!-- SERVICES -->` |
| Why Hire Me points | `<!-- WHY HIRE ME -->` |
| Packages / pricing | `<!-- PACKAGES -->` |
| Sample works images | `<!-- SAMPLE WORKS -->` |
| Video testimonial | `<!-- VIDEO TESTIMONIAL -->` |
| Certifications | `<!-- CERTIFICATIONS -->` |
| Contact details (phone, email, location) | `<!-- CONTACT -->` |
| Social links (LinkedIn, Facebook, etc.) | `<!-- CONTACT -->` → contact-social |
| Footer tagline | `<!-- FOOTER -->` |
| Booking link (Calendly) | Search: `calendly.com/jvecomva` |

### style.css — colors, fonts, sizes

The `:root` variables at the very top control the whole site theme:

```css
:root {
  --blue:      #2979d4;   /* primary blue */
  --blue-dark: #1b5faa;   /* hover state */
  --blue-lt:   #6eb4f7;   /* light accent */
  --navy:      #0d1b2e;   /* dark sections */
  --bg:        #ffffff;   /* page background */
  --bg-muted:  #f2f7fd;   /* alternate section bg */
}
```
Change any of these values to retheme the entire site instantly.

### script.js — form and interactions

| What to update | Line to change |
|---|---|
| Contact form email (Formspree) | `fetch('https://formspree.io/f/xyklplag'` |
| Number of appt samples | `appt: { index:0, total:8 }` |
| Number of listing samples | `listing: { index:0, total:10 }` |
| Number of store samples | `store: { index:0, total:9 }` |

---

## 🖼️ Updating images

Just replace the file in `assets/` with the same filename — the site picks it up automatically. No code change needed.

To add a new portfolio screenshot:
1. Add the file to the correct `assets/samples/` subfolder with the next number (e.g. `appt-9.png`)
2. Add a new `<div class="carousel-slide">` in `index.html` inside the correct carousel
3. Update the `total` count in `script.js` (e.g. change `total:8` to `total:9` for appt)

---

## 🚀 Updating the live site

After editing any file:
1. Go to your GitHub repo → click the file
2. Click the **pencil icon** (Edit)
3. Make your changes → click **Commit changes**
4. Site updates in about **1–2 minutes** automatically

For multiple files at once, drag and drop them into the repo file list and commit.

---

## 📧 Contact form

Form submissions go to **jandylviosva@gmail.com** via Formspree (`xyklplag`).
- Free plan: 50 submissions/month
- Manage submissions at: https://formspree.io/forms

---

## 🌐 Domain & Hosting

- **Hosting**: GitHub Pages (free) — auto-deploys on every commit
- **Domain**: jvecomva.com managed via Squarespace DNS
- **HTTPS**: Enforced via GitHub Pages (auto-renewed SSL)
- **Live URL**: https://jvecomva.com

---

## ❓ Separating HTML into multiple files?

Pure HTML/CSS/JS sites can't `include` other HTML files without a build tool or server. The best approach without adding complexity is what's already done — **clear section comments** in one `index.html`:

```html
<!-- HERO -->
<!-- ABOUT -->
<!-- EXPERIENCE -->
<!-- SERVICES -->
...
```

Use **Ctrl+F → search the comment** to jump to any section instantly. This keeps it one file (easy to upload to GitHub) while still being easy to navigate.

If you ever want to split sections in the future, the simplest upgrade is to use **VS Code** with the "Live Server" extension — it lets you use JavaScript `fetch()` to load separate HTML partials. But for now, the single-file approach is the most reliable for GitHub Pages.
