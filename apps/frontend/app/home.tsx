import {
  Button,
  Card,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { fetchRooms } from './_actions/rooms';
import { Room } from '@prisma/client/main';
import CreateRoomForm from './_components/server/rooms/createRoomForm';
import Link from 'next/link';
import { forwardRef } from 'react';

async function RoomItem(props: { room: Room }) {
  const { room } = props;
  return (
    <ListItem
      key={room.id}
      secondaryAction={
        <Button
          variant="contained"
          LinkComponent={Link}
          href={`/rooms/${room.id}/chat`}
        >
          Join
        </Button>
      }
    >
      <ListItemText sx={{ w: '100%' }} primary={room.name} />
    </ListItem>
  );
}

export default async function Home() {
  const rooms = await fetchRooms();

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
                      <RoomItem room={room} />
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
              <CreateRoomForm />
            </Container>
          </Card>
        </Container>
      </Container>
    </main>
  );
}
