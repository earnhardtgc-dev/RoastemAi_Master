# Roast’emAI — Starter

A clean, viral-ready static starter for **Roast’emAI** with:
- Name change applied throughout
- OG/Twitter cards
- Native share + copy link
- Facebook / Instagram / TikTok / YouTube share buttons
- Stripe Go Pro (enable by setting `window.STRIPE_PUBLISHABLE_KEY`)
- PWA manifest + simple service worker

## Quick start
1. Replace `assets/logo-roastemai.png` with your real logo (same filename).
2. Open `index.html` in a browser (or serve with any static host).
3. (Optional) Set Stripe publishable key in HTML before `app.js` or at runtime:
   ```html
   <script>
     window.STRIPE_PUBLISHABLE_KEY = "pk_live_or_pk_test_xxx";
     // window.CHECKOUT_SESSION_ID = "cs_test_123"; // or fetch from backend
   </script>
   ```
4. Wire your roast pipeline in `app.js` where noted.

## Deploy
- Any static hosting (Render static site, Netlify, Vercel, GitHub Pages, S3).

## Notes on social shares
- Facebook uses a real share URL.
- Instagram & TikTok do not expose a public web share endpoint; buttons copy the current URL and instruct users to paste in-app.
- YouTube button opens Shorts upload (change to your channel if desired).
