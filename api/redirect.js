export default function handler(req, res) {
  const { bot, fbclid } = req.query;

  if (!bot) {
    return res.status(400).send("Missing bot parameter");
  }

  const redirectUrl = `https://t.me/${bot}?start=${fbclid || ''}`;
  res.writeHead(302, { Location: redirectUrl });
  res.end();
}
