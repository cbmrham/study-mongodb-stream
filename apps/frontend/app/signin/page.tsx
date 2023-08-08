import { Card, Container, Divider, Typography } from '@mui/material';
import Signin from './signin';
import Signup from './signup';
const SignIn = () => {
  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Typography variant="h4">Sign In</Typography>
        <Card>
          <Signin />
        </Card>
        <Divider sx={{ mt: '20px', mb: '20px' }} />
        <Typography variant="h4" sx={{ mt: '20px' }}>
          Or sign up
        </Typography>
        <Card>
          <Signup />
        </Card>
      </Container>
    </main>
  );
};

export default SignIn;
