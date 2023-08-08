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
import { UserContext } from '../_contexts/UserContext';
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

  return (
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
  );
};

export default SignIn;
