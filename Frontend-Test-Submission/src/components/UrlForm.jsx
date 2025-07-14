import { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import { createShortUrl } from '../services/api';

export default function UrlForm({ onSuccess }) {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);

  const handleChange = (i, field, value) => {
    const updated = [...urls];
    updated[i][field] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5) setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
  };

  const handleSubmit = async () => {
    const results = [];

    for (const u of urls) {
      try {
        const body = {
          url: u.url,
          validity: u.validity ? parseInt(u.validity) : undefined,
          shortcode: u.shortcode || undefined
        };
        const res = await createShortUrl(body);
        results.push({ original: u.url, ...res });
      } catch (err) {
        alert(`Error: ${err.response?.data?.error || err.message}`);
      }
    }

    onSuccess(results);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>Shorten Your URLs</Typography>
      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} mb={1}>
          <Grid item xs={12} md={5}>
            <TextField label="Long URL" fullWidth value={u.url}
              onChange={e => handleChange(i, 'url', e.target.value)} />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField label="Validity (mins)" fullWidth value={u.validity}
              onChange={e => handleChange(i, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField label="Custom Shortcode" fullWidth value={u.shortcode}
              onChange={e => handleChange(i, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={addField} disabled={urls.length >= 5}>Add another</Button>
      <Button onClick={handleSubmit} variant="contained" sx={{ ml: 2 }}>Submit</Button>
    </Box>
  );
}
