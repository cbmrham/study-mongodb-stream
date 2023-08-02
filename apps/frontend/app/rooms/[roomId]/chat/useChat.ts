import { ChatPost, User } from '@prisma/client/main';
import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type Post = ChatPost & { sender: User };

const useChat = (userId: string, roomId: string) => {
  const [socket] = useState(() =>
    io('http://localhost:3000', { query: { roomId } })
  );
  const [postLogs, setPostLogs] = useState<Post[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
    socket.on('chat:send', (data: Post) => {
      console.log(data);
      setPostLogs((prev) => [...prev, data]);
    });
    socket.on('chat:list', (data: Post[]) => {
      console.log(data);
      setPostLogs(data);
    });
    // cleanup
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const post = useCallback(
    (content: string) => {
      socket.emit('chat:send', {
        senderId: userId,
        roomId,
        content,
      });
    },
    [roomId, socket, userId]
  );

  return { post, postLogs };
};

export default useChat;
