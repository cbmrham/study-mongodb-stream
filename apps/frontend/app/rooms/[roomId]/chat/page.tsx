'use client';
import { Container, List, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';
import { UserContext } from '../../../contexts/UserContext';
import useChat from './useChat';
import { Room, User } from '@prisma/client/main';

const RoomChat = ({ user, room }: { user: User; room: Room }) => {
  const [currentUser] = useContext(UserContext);
  const [postContent, setPostContent] = useState('');
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId as string | undefined;
  const { post, postLogs } = useChat(user.id, room.id);
  if (!currentUser || !currentUser?.id || !roomId) {
    router.push('/');
    return;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: '20px' }}>
      <Typography variant="h2" fontWeight={'bold'}>
        {room.name}
      </Typography>
      <List>
        {postLogs.map((post) => (
          <div key={post.id}>
            <Typography variant="body1" fontWeight={'bold'}>
              {post.senderId}
            </Typography>
            <Typography variant="body2">{post.content}</Typography>
          </div>
        ))}
      </List>
      <TextField
        fullWidth
        variant="outlined"
        label="Message"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            postContent && post(postContent);
            setPostContent('');
          }
        }}
      />
    </Container>
  );
};

export default function Rooms() {
  const [currentUser] = useContext(UserContext);
  const [room, setRoom] = useState<Room | null>(null);
  const router = useRouter();
  const params = useParams();
  const roomId = params?.roomId as string | undefined;
  useEffect(() => {
    if (!currentUser) {
      router.push('/');
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
            router.push('/');
          }
        });
    } else {
      router.push('/');
    }
  }, [roomId, router]);

  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Typography variant="h2" fontWeight={'bold'}>
          Chat
        </Typography>
        {currentUser && room && <RoomChat user={currentUser} room={room} />}
      </Container>
    </main>
  );
}
