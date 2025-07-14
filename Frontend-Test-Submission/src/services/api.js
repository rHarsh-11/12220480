import axios from 'axios';
import { Log } from 'logging-middleware/log';

const API_BASE = 'http://localhost:4000';

export async function createShortUrl(data) {
  try {
    const res = await axios.post(`${API_BASE}/shorturls`, data);
    await Log("frontend", "info", "api", "Short URL created");
    return res.data;
  } catch (err) {
    await Log("frontend", "error", "api", `Create failed: ${err.message}`);
    throw err;
  }
}

export async function getStats(shortcode) {
  try {
    const res = await axios.get(`${API_BASE}/shorturls/${shortcode}`);
    await Log("frontend", "info", "api", "Stats fetched");
    return res.data;
  } catch (err) {
    await Log("frontend", "error", "api", `Stats failed: ${err.message}`);
    throw err;
  }
}
