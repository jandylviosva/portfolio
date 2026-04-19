# JV Ecom VA — Portfolio Website

A clean, modern, fully static portfolio website for Jandyl Vios — Shopify Virtual Assistant.  
Built with pure HTML, CSS, and vanilla JS. No frameworks, no build tools needed.

---

## 🚀 Quick Setup

### 1. Add Your Assets
Put your files in the `assets/` folder (create it if it doesn't exist):

```
assets/
  profile.jpg           ← Your hero photo
  csu-logo.png          ← Caraga State University logo
  yourvabuddy-logo.png  ← Your VA Buddy logo
  samples/
    appt-1.png          ← Appointment scheduling screenshots
    appt-2.png
    appt-3.png
    appt-4.png
    appt-5.png
    appt-6.png
    listing-1.png       ← Product listing screenshots
    listing-2.png
    ... (up to listing-6.png)
    store-1.png         ← Store setup screenshots
    store-2.png
    store-3.png
  certs/
    cert-1.png          ← Certification images
    cert-2.png
    cert-3.jpg
```

### 2. Customize Content
All editable content is in `index.html`. It's clearly commented.  
Look for sections like `<!-- ====== HERO ====== -->` to find what to update.

### 3. Set Up the Contact Form (Optional but Recommended)
The form uses [Formspree](https://formspree.io) to send emails without a backend:
1. Sign up free at https://formspree.io
2. Create a new form → copy your form ID (e.g. `xpzgdkrb`)
3. Open `script.js` and replace `YOUR_FORM_ID`:
   ```js
   const FORMSPREE_URL = 'https://formspree.io/f/xpzgdkrb';
   ```
If you skip this, the form falls back to opening your email client.

---

## 🎨 How to Customize Colors & Fonts

Open `style.css` and edit the `:root` variables at the top (lines 1–30):

```css
:root {
  --color-primary:  #1a472a;   /* Main green — change to your brand color */
  --color-accent:   #c8a951;   /* Gold highlights */
  --color-bg:       #fafaf7;   /* Page background */
  /* ...etc */
}
```

To change fonts, update the Google Fonts `<link>` in `index.html` and the `--font-display` / `--font-body` variables.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub repo
1. Go to [github.com](https://github.com) → New repository
2. Name it `jvecomva` (or anything you like)
3. Set it to **Public**
4. Don't add a README (you already have one)

### Step 2 — Upload your files
Option A — via browser (easiest):
1. Open your repo → click **"uploading an existing file"**
2. Drag all your files (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`)
3. Click **Commit changes**

Option B — via Git CLI:
```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jvecomva.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under "Source" select **Deploy from a branch**
3. Branch: `main` / Folder: `/ (root)` → click **Save**
4. Your site is live at: `https://YOUR_USERNAME.github.io/jvecomva`

---

## 🔗 Connect Your Custom Domain (jvecomva.com)

### Step 1 — Add domain in GitHub
1. In your repo → **Settings** → **Pages**
2. Under "Custom domain" type: `jvecomva.com`
3. Click **Save**
4. GitHub will create a `CNAME` file in your repo automatically

### Step 2 — Update your DNS
Log in to wherever you bought your domain (GoDaddy, Namecheap, etc.) and add these DNS records:

| Type  | Host / Name | Value                  |
|-------|-------------|------------------------|
| A     | @           | 185.199.108.153        |
| A     | @           | 185.199.109.153        |
| A     | @           | 185.199.110.153        |
| A     | @           | 185.199.111.153        |
| CNAME | www         | YOUR_USERNAME.github.io |

### Step 3 — Enable HTTPS
Back in GitHub Pages settings, check **"Enforce HTTPS"** (may take a few minutes to appear after DNS propagates).

DNS changes can take up to 24–48 hours to fully propagate.

---

## 📝 Common Edits Reference

| What to change          | Where                     |
|-------------------------|---------------------------|
| Name, tagline, bio      | `index.html` — Hero & About sections |
| Work experience         | `index.html` — `#experience` section |
| Services                | `index.html` — `#services-offered`   |
| Packages / pricing      | `index.html` — `#packages`           |
| Contact info            | `index.html` — `#contact`            |
| Social links            | `index.html` — Contact & Footer      |
| Discovery call link     | Search `calendly.com` in index.html  |
| Colors                  | `style.css` `:root` variables        |
| Fonts                   | `style.css` `:root` + Google Fonts link |
| Form email delivery     | `script.js` — `FORMSPREE_URL`        |

---

## 📁 File Structure

```
jvecomva/
├── index.html      ← All content lives here
├── style.css       ← All styling (customize :root variables at top)
├── script.js       ← Navbar, scroll effects, contact form
├── README.md       ← This file
└── assets/
    ├── profile.jpg
    ├── csu-logo.png
    ├── yourvabuddy-logo.png
    ├── samples/    ← Portfolio screenshots
    └── certs/      ← Certification images
```
