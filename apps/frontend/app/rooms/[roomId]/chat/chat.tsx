'use client';
import { Card, Container, List, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Room, User } from '@prisma/client/main';
import useChat from './useChat';

const Chat = ({ user, room }: { user: User; room: Room }) => {
  const [newPostContent, setNewPostContent] = useState('');
  const { post, postLogs } = useChat(user.id, room.id);
  const ref = useRef<HTMLDivElement>(null);
  const isScrollBottom = () => {
    if (!ref.current) return false;
    console.log(ref.current.scrollHeight);
    console.log(ref.current.scrollTop);
    console.log(ref.current.clientHeight);
    console.log(ref.current.offsetHeight);
    return (
      ref.current.scrollHeight - ref.current.scrollTop ===
      ref.current.clientHeight
    );
  };

  const scrollToBottom = () => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  useEffect(() => {
    // if (isScrollBottom()) {
    scrollToBottom();
    // }
  }, [postLogs]);

  return (
    <Container maxWidth="lg" sx={{ mt: '20px' }}>
      <Typography variant="h2" fontWeight={'bold'}>
        {room.name}
      </Typography>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Card sx={{ height: '400px', overflowY: 'scroll' }}>
          <div ref={ref} style={{ height: '400px', overflowY: 'scroll' }}>
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
          </div>
        </Card>
      </Container>
      <TextField
        fullWidth
        variant="outlined"
        label="Message"
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            newPostContent && post(newPostContent);
            setNewPostContent('');
          }
        }}
      />
    </Container>
  );
};

export default Chat;
