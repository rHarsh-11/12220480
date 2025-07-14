import ShortUrl from '../models/ShortURL.js';
import { generateShortcode } from '../utils/generateShortcode.js';
import { apiLogger } from '../middlewares/apiLogger.js';

export async function createShortUrl(req, res) {
  const { url, validity = 30, shortcode } = req.body;

  // basic validation
  try {
    new URL(url);
  } catch {
    await apiLogger('backend', 'error', 'handler', 'Invalid URL format');
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const code = shortcode || generateShortcode();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + validity * 60000);

  try {
    const exists = await ShortUrl.findOne({ shortCode: code });
    if (exists) {
      await apiLogger('backend', 'warn', 'service', 'Shortcode collision');
      return res.status(409).json({ error: 'Shortcode already taken' });
    }

    const doc = await ShortUrl.create({
      originalUrl: url,
      shortCode: code,
      expiresAt
    });

    await apiLogger('backend', 'info', 'service', `Created ${code}`);

    res.status(201).json({
      shortLink: `${process.env.BASE_URL}/${code}`,
      expiry: expiresAt.toISOString()
    });
  } catch (err) {
    await apiLogger('backend', 'fatal', 'db', err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function redirect(req, res) {
  const { shortcode } = req.params;
  const doc = await ShortUrl.findOne({ shortCode: shortcode });

  if (!doc || doc.expiresAt < new Date()) {
    await apiLogger('backend', 'error', 'service', 'Expired or missing code');
    return res.status(404).json({ error: 'Link not found or expired' });
  }

  // collect click analytics
  doc.clicks.push({
    ip: req.ip,
    referrer: req.get('referer') || '',
    country: req.headers['x-vercel-ip-country'] || 'unknown',
    city: req.headers['x-vercel-ip-city'] || 'unknown'
  });
  await doc.save();

  await apiLogger('backend', 'info', 'handler', `Redirect ${shortcode}`);

  res.redirect(doc.originalUrl);
}

export async function getStats(req, res) {
  const { shortcode } = req.params;
  const doc = await ShortUrl.findOne({ shortCode: shortcode });

  if (!doc) {
    await apiLogger('backend', 'error', 'handler', 'Stats code not found');
    return res.status(404).json({ error: 'No stats' });
  }

  await apiLogger('backend', 'debug', 'service', `Stats for ${shortcode}`);

  res.json({
    originalUrl: doc.originalUrl,
    createdAt: doc.createdAt,
    expiresAt: doc.expiresAt,
    totalClicks: doc.clicks.length,
    clicks: doc.clicks
  });
}
