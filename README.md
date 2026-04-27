# Healthiffy Café — Website

**Fuel Your Fitness · Pune**

## Files

```
healthiffy/
├── index.html   — Main HTML structure (all sections & content)
├── style.css    — Full styling (responsive, mobile-friendly)
├── script.js    — Interactivity: chatbot, menu tabs, navbar, scroll
└── README.md    — This file
```

## Features

- **Full menu** — Food & Beverages tabs with all items & prices from your menu images
- **AI Chatbot** — Powered by Claude API, knows the full menu, prices, locations & monthly plan
- **WhatsApp ordering** — Multiple prominent links to `wa.me/918087228075` with pre-filled messages
- **Two Pune locations** — With Google Maps links for both Koregaon Park & Kothrud (MIT WPU)
- **Floating WhatsApp button** — Always visible on every page scroll
- **Ambience gallery** — 6 photo grid from Unsplash
- **Monthly plan highlight** — ₹2,250/month featured prominently in the food menu
- **Instagram link** — @healthiffy_pune in footer and hero
- **Mobile responsive** — Works on all screen sizes
- **Sticky navbar** — With mobile hamburger menu

## How to Run

Just open `index.html` in any browser — no build step needed.

For the AI chatbot to work, the page needs to be served from a domain
that has Anthropic API access (or you can add your own API key).
When self-hosting, you'll need a backend proxy to protect your API key.

## Customisation

### Update contact details
In `index.html` and `script.js`, search for:
- `8087228075` — WhatsApp number
- `8263045675` — Call number
- `healthiffy_pune` — Instagram handle

### Update locations
In `index.html`, find the `#locations` section.
Replace the `href` values in the two `.loc-card` elements.

### Add menu items
In `index.html`, find the relevant `.menu-category` section and add:
```html
<div class="menu-item">
  <span class="item-name">Item Name</span>
  <span class="item-price">₹00</span>
</div>
```
Also update the `SYSTEM_PROMPT` in `script.js` so the AI chatbot knows about the new item.

### Update gallery images
In `index.html`, find the `#ambience` section and replace the `src` URLs on `<img>` tags with your own photos.

### Replace Unsplash images with your own
Upload your café photos and update the `src` attributes in:
1. Hero section: `.hero-bg` image
2. Ambience section: `.gallery img` elements

## Monthly Plan
Currently set at ₹2,250/month. To update, search for `2,250` in `index.html`.

## Tech Stack
- Pure HTML5 + CSS3 + Vanilla JavaScript
- Zero dependencies / no npm needed
- Claude AI via Anthropic API for the chatbot
- All styling in `style.css` (CSS custom properties / variables)
