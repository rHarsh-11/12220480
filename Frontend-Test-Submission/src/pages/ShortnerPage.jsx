import { useState } from 'react';
import UrlForm from '../components/UrlForm';
import ShortUrlCard from '../components/ShortUrlCard';
import { Box } from '@mui/material';

export default function ShortenerPage() {
  const [results, setResults] = useState([]);

  return (
    <Box p={4}>
      <UrlForm onSuccess={setResults} />
      {results.map((r, idx) => <ShortUrlCard key={idx} data={r} />)}
    </Box>
  );
}
