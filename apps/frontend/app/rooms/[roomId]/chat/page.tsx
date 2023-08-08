'use client';
import { Box, Container, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { UserContext } from '../../../_contexts/UserContext';
import { Room } from '@prisma/client/main';
import ChatContainer from './ChatContainer';

export default function Room() {
  const [currentUser] = useContext(UserContext);
  const [room, setRoom] = useState<Room | null>(null);
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId as string | undefined;
  useEffect(() => {
    if (!currentUser) {
      router.push('/signin');
    }
  }, [currentUser, router]);

  useEffect(() => {
    if (roomId) {
      fetch(`http://localhost:3000/api/rooms/${roomId}`)
        .then((res) => res.json())
        .then((room) => {
          if (room) {
            setRoom(room);
          } else {
            router.push('/signin');
          }
        });
    } else {
      router.push('/signin');
    }
  }, [roomId, router]);

  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Box>
          <Typography variant="h5" fontWeight={'bold'}>
            <span style={{ fontWeight: 'normal' }}>Room: </span>
            {room?.name}
          </Typography>
        </Box>
        {currentUser && room && (
          <ChatContainer user={currentUser} room={room} />
        )}
      </Container>
    </main>
  );
}
