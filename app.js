// Roast’emAI — minimal JS to keep viral features and Stripe
// --- Config (edit or override in HTML before this script) ---
window.APP_ORIGIN = window.APP_ORIGIN || location.origin;
// To enable Stripe, set these at runtime (or inline before this script):
// window.STRIPE_PUBLISHABLE_KEY = "pk_live_or_pk_test_xxx";
// window.CHECKOUT_SESSION_ID = "cs_test_123";

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Upload keyboard a11y
document.querySelector('.upload')?.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' || e.key === ' ') document.getElementById('fileInput').click();
});

// Native Share + Copy
const shareBtn = document.getElementById('shareBtn');
const copyBtn  = document.getElementById('copyLinkBtn');

shareBtn.addEventListener('click', async () => {
  const shareData = {
    title: "Roast’emAI",
    text: "I just got roasted by AI 😅 Try it!",
    url: location.href
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch(_) {}
  } else {
    await navigator.clipboard.writeText(shareData.url);
    shareBtn.textContent = "Link Copied!";
    setTimeout(()=>shareBtn.textContent="Share", 1400);
  }
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(location.href);
  copyBtn.textContent = "Copied!";
  setTimeout(()=>copyBtn.textContent="Copy Link", 1200);
});

// Social share buttons
document.getElementById('fbShare').addEventListener('click', () => {
  const url = encodeURIComponent(location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener,noreferrer");
});

document.getElementById('igShare').addEventListener('click', async () => {
  await navigator.clipboard.writeText(location.href);
  alert("Link copied! Open Instagram and paste it into your story, bio, or post.");
});

document.getElementById('ttShare').addEventListener('click', async () => {
  await navigator.clipboard.writeText(location.href);
  alert("Link copied! Open TikTok and paste into your caption.");
});

document.getElementById('ytShare').addEventListener('click', () => {
  window.open("https://www.youtube.com/shorts/upload", "_blank", "noopener,noreferrer");
});

// Stripe "Go Pro"
document.getElementById('proBtn').addEventListener('click', async () => {
  if (!window.STRIPE_PUBLISHABLE_KEY) {
    alert("Stripe not configured yet. Add window.STRIPE_PUBLISHABLE_KEY.");
    return;
  }
  const stripe = Stripe(window.STRIPE_PUBLISHABLE_KEY);

  if (window.CHECKOUT_SESSION_ID) {
    stripe.redirectToCheckout({ sessionId: window.CHECKOUT_SESSION_ID });
    return;
  }

  try {
    const res = await fetch("/create-checkout-session", { method: "POST" });
    const data = await res.json();
    if (data.sessionId) {
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      location.href = "/pricing";
    }
  } catch {
    location.href = "/pricing";
  }
});

// Start Roast (stub)
document.getElementById('startRoastBtn').addEventListener('click', () => {
  const file = document.getElementById('fileInput').files?.[0];
  if (!file) { alert("Choose a photo first."); return; }
  alert("Roast pipeline not wired in this starter.");
});

// PWA SW
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(()=>{});
}
