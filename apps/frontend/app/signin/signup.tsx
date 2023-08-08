import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const SignIn = async () => {
  async function signup(data: FormData) {
    'use server';

    const uid = data.get('uid');
    const name = data.get('name');
    const res = await fetch(`http://localhost:3000/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, name }),
    }).then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    });
    const token = res?.access_token;
    if (!token) {
      return;
    }
    cookies().set('token', token);
    redirect('/');
  }
  return (
    <Container maxWidth="lg" sx={{ mt: '20px', mb: '20px' }}>
      <Typography variant="body1" fontWeight={'bold'}>
        Enter your information
      </Typography>
      <form action={signup}>
        <List>
          <ListItem>
            <TextField
              fullWidth
              variant="outlined"
              label={'User id'}
              name="uid"
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              variant="outlined"
              label={'Name'}
              name="name"
            />
          </ListItem>
        </List>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Sign up
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SignIn;
