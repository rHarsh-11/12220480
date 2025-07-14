import { Card, CardContent, Typography } from '@mui/material';

export default function ShortUrlCard({ data }) {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography>Original: {data.original}</Typography>
        <Typography>Short Link: <a href={data.shortLink} target="_blank">{data.shortLink}</a></Typography>
        <Typography>Expires At: {new Date(data.expiry).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
}
