import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { Room, User } from '@prisma/client/main';
import { useEffect, useRef, useState } from 'react';
import useChat from './useChat';
import Post from './Post';

const getYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

const ChatContainer = ({ user, room }: { user: User; room: Room }) => {
  const [newPostContent, setNewPostContent] = useState('');
  const { post, postLogs } = useChat(user.id, room.id);
  const ref = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [postLogs]);
  return (
    <Container maxWidth="lg" sx={{ mt: '20px' }}>
      <Card>
        <Box ref={ref} sx={{ height: '400px', overflowY: 'scroll' }}>
          {postLogs.map((post, index) => (
            <>
              {index === 0 && (
                <div key={post.id}>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'center',
                      mt: '10px',
                      mb: '10px',
                    }}
                  >
                    {getYMD(new Date(post.postedAt))}
                  </Typography>
                  <Divider />
                </div>
              )}
              {index > 0 &&
                getYMD(new Date(post.postedAt)) !==
                  getYMD(new Date(postLogs[index - 1].postedAt)) && (
                  <div key={index}>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'center',
                        mt: '10px',
                        mb: '10px',
                      }}
                    >
                      {getYMD(new Date(post.postedAt))}
                    </Typography>
                    <Divider />
                  </div>
                )}
              <Post
                key={post.id}
                post={post}
                position={user.id === post.senderId ? 'right' : 'left'}
                consecutive={
                  index > 0 &&
                  postLogs[index - 1].senderId === post.senderId &&
                  new Date(post.postedAt).getTime() -
                    new Date(postLogs[index - 1].postedAt).getTime() <
                    1000 * 60 * 5
                }
              />
            </>
          ))}
        </Box>
        <Box display="flex" flexDirection="row-reverse">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              if (!newPostContent) return;
              setNewPostContent('');
              post(newPostContent);
            }}
          >
            Send
          </Button>
          <TextField
            fullWidth
            variant="outlined"
            label="Message"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (!newPostContent) return;
                setNewPostContent('');
                post(newPostContent);
              }
            }}
          />
        </Box>
      </Card>
    </Container>
  );
};

export default ChatContainer;
