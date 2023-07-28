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
import { useContext, useState } from 'react';
import { User, UserContext } from './contexts/UserContext';

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

  console.log(user);

  const handleUidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSignIn = async () => {
    const res = await fetch(`http://localhost:3000/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // コンテンツタイプをJSONに設定
      },
      body: JSON.stringify({ uid }),
    }).then((res) => {
      if (!res.ok) {
        alert('ユーザーが見つかりません');
        return;
      }
      return res.json();
    });

    console.log(res);
    setCurrentUser(res as unknown as User);
    router.push('/rooms');
  };

  const onRegister = async () => {
    console.log(user);
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // コンテンツタイプをJSONに設定
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      alert('ユーザーが見つかりません');
      return;
    }
    console.log(res);
    // setCurrentUser(res as unknown as User);
    router.push('/rooms');
  };
  return (
    <>
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
      <Typography variant="body1" fontWeight={'bold'}>
        <Divider sx={{ mt: '20px', mb: '20px' }} />
      </Typography>
      <Card>
        <Container maxWidth="lg" sx={{ mt: '20px', mb: '20px' }}>
          <Typography variant="body1" fontWeight={'bold'}>
            Or register
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
            <Button variant="contained" color="primary" onClick={onRegister}>
              Register
            </Button>
          </Box>
        </Container>
      </Card>
    </>
  );
};

export default SignIn;
