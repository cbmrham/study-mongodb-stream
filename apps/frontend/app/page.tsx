import { Container, Typography } from '@mui/material';
import SignIn from './SignIn';

export default function Home() {
  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Typography variant="h2" fontWeight={'bold'}>
          Sign in
        </Typography>
        <Container maxWidth="lg" sx={{ mt: '20px' }}>
          <SignIn />
        </Container>
      </Container>
    </main>
  );
}
