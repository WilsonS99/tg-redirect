// /api/redirect.js
export default function handler(req, res) {
  try {
    // Vercel Node function: pastikan kita parse URL sendiri (paling aman di semua runtime)
    const url = new URL(req.url, `http://${req.headers.host}`);

    // fbclid dari Facebook (FB akan otomatis menambah ?fbclid=XXXX ke URL iklan)
    const fbclid = (url.searchParams.get('fbclid') || '').trim();

    // Bot-mu fixed sesuai permintaan
    const bot = 'diogoldhunter_bot';

    // Susun payload start=fbclid_<fbclid>
    const payload = fbclid ? `fbclid_${encodeURIComponent(fbclid)}` : 'fbclid_missing';
    const target = `https://t.me/${bot}?start=${payload}`;

    res.statusCode = 302;
    res.setHeader('Location', target);
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end('Redirect error');
  }
}
