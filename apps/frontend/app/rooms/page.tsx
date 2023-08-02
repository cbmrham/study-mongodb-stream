'use client';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { User } from '@prisma/client/main';
import { useRouter } from 'next/navigation';

type Room = {
  id: string;
  name: string;
  userIds: string[];
  users: User[];
};

export default function Rooms() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [createRoomName, setCreateRoomName] = useState<string>('');
  const router = useRouter();
  if (!currentUser) {
    router.push('/');
  }
  useEffect(() => {
    if (currentUser) {
      fetch(`http://localhost:3000/api/rooms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          alert('error');
          return;
        }
        res.json().then((data) => {
          setRooms(data);
        });
      });
    } else {
      router.push('/');
    }
  }, [currentUser, router]);

  const onClickJoinRoom = (roomId: string) => {
    router.push(`/rooms/${roomId}/chat`);
  };

  const handleOnChangeCreateRoomName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreateRoomName(e.target.value);
  };
  const handleOnClickCreateRoom = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    fetch(`http://localhost:3000/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: createRoomName }),
    }).then((res) => {
      if (!res.ok) {
        alert('error');
        return;
      }
      res.json().then((data) => {
        setRooms([...rooms, data]);
        setCreateRoomName('');
      });
    });
  };
  return (
    <main>
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Typography variant="h2" fontWeight={'bold'}>
          Rooms
        </Typography>
        <Container maxWidth="lg" sx={{ mt: '20px' }}>
          {rooms.length !== 0 ? (
            <Card>
              <Container maxWidth="lg" sx={{ pt: '20px', pb: '20px' }}>
                <List>
                  {rooms.map((room) => (
                    <>
                      <ListItem
                        key={room.id}
                        secondaryAction={
                          <Button
                            variant="contained"
                            onClick={() => onClickJoinRoom(room.id)}
                          >
                            Join
                          </Button>
                        }
                      >
                        <ListItemText sx={{ w: '100%' }} primary={room.name} />
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              </Container>
            </Card>
          ) : (
            <Card>
              <List>
                <ListItem>
                  <Typography variant="body1" fontWeight={'bold'}>
                    No Rooms
                  </Typography>
                </ListItem>
              </List>
            </Card>
          )}
        </Container>
        <Typography variant="h3" fontWeight={'bold'} sx={{ mt: '20px' }}>
          Create Room
        </Typography>
        <Container maxWidth="lg" sx={{ mt: '20px' }}>
          <Card>
            <Container maxWidth="lg" sx={{ pt: '20px', pb: '20px' }}>
              <List>
                <ListItem>
                  <TextField
                    fullWidth
                    label="Room Name"
                    placeholder="Room Name"
                    name="name"
                    value={createRoomName}
                    variant="outlined"
                    onChange={handleOnChangeCreateRoomName}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnClickCreateRoom}
                >
                  Create
                </Button>
              </Box>
            </Container>
          </Card>
        </Container>
      </Container>
    </main>
  );
}
