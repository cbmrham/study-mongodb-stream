'use client';
import { Container, Typography } from '@mui/material';
import { useContext } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { UserContext } from '../../../contexts/UserContext';

export default function Rooms() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const router = useRouter();
  const params = useParams();
  console.log(params?.roomId);
  if (!currentUser) {
    router.push('/');
  }

  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Typography variant="h2" fontWeight={'bold'}>
          Chat
        </Typography>
      </Container>
    </main>
  );
}
