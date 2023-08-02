import { Grid, Card, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Typography variant="h2" fontWeight={'bold'}>
          Hello World
        </Typography>
        <Container maxWidth="lg" sx={{ mt: '20px' }}>
          <Card>content</Card>
        </Container>
      </Container>
    </main>
  );
}
