'use client';

import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { User } from '@prisma/client/main';

type UserInput = {
  uid: string;
  email: string;
  name: string;
};

const SignIn = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [uid, setUid] = useState<string>('');
  const [user, setUser] = useState<UserInput>({
    uid: '',
    email: '',
    name: '',
  });
  const router = useRouter();
  useEffect(() => {
    if (currentUser) router.push('/');
  }, [currentUser, router]);

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signIn = async (uid: string) => {
    const res = await fetch(`http://localhost:3000/api/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
    }).then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    });
    console.log(res);
    if (!res) {
      alert('ユーザー認証に失敗しました');
      return;
    }

    setCurrentUser(res as User);
    router.push('/');
  };

  const onSignIn = async () => {
    signIn(uid);
  };

  const onSignUp = async () => {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      alert('ユーザー登録に失敗しました');
      return;
    }
    signIn(user.uid);
  };
  return (
    <>
      <main>
        <Container maxWidth="lg" sx={{ mt: '20px' }}>
          <Typography variant="h4">Sign In</Typography>
          <Card>
            <Container maxWidth="lg" sx={{ mt: '20px', mb: '20px' }}>
              <Typography variant="body1" fontWeight={'bold'}>
                Enter your id
              </Typography>
              <List>
                <ListItem>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={'user id'}
                    name="uid"
                    onChange={handleUidChange}
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
                <Button variant="contained" color="primary" onClick={onSignIn}>
                  Sign in
                </Button>
              </Box>
            </Container>
          </Card>
          <Divider sx={{ mt: '20px', mb: '20px' }} />
          <Typography variant="h4" sx={{ mt: '20px' }}>
            Or sign up
          </Typography>
          <Card>
            <Container maxWidth="lg" sx={{ mt: '20px', mb: '20px' }}>
              <Typography variant="body1" fontWeight={'bold'}>
                Enter your information
              </Typography>
              <List>
                <ListItem>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={'User id'}
                    onChange={handleUserChange}
                    name="uid"
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={'Email'}
                    onChange={handleUserChange}
                    name="email"
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={'Name'}
                    onChange={handleUserChange}
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
                <Button variant="contained" color="primary" onClick={onSignUp}>
                  Sign up
                </Button>
              </Box>
            </Container>
          </Card>
        </Container>
      </main>
    </>
  );
};

export default SignIn;
