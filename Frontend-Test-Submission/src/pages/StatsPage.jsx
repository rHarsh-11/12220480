import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { getStats } from '../services/api';

export default function StatsPage() {
  const [code, setCode] = useState('');
  const [data, setData] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await getStats(code);
      setData(res);
    } catch (err) {
      alert('Stats error');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5">Short URL Statistics</Typography>
      <Box mt={2}>
        <TextField value={code} onChange={e => setCode(e.target.value)} label="Shortcode" />
        <Button onClick={fetchStats} sx={{ ml: 2 }} variant="contained">Get Stats</Button>
      </Box>
      {data && (
        <Box mt={3}>
          <Typography>Total Clicks: {data.totalClicks}</Typography>
          <Typography>Original URL: {data.originalUrl}</Typography>
          <Typography>Created: {new Date(data.createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {new Date(data.expiresAt).toLocaleString()}</Typography>
          <Typography variant="h6" mt={2}>Click Log:</Typography>
          {data.clicks.map((c, i) => (
            <Box key={i} mt={1}>
              <Typography>→ {new Date(c.timestamp).toLocaleString()} from {c.city}, {c.country} (referrer: {c.referrer || 'N/A'})</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
