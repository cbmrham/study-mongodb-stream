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
import { fetchRooms, createRoom } from './_actions/rooms';
import { Room } from '@prisma/client/main';

async function RoomItem(props: { room: Room }) {
  const { room } = props;
  return (
    <ListItem
      key={room.id}
      secondaryAction={<Button variant="contained">Join</Button>}
    >
      <ListItemText sx={{ w: '100%' }} primary={room.name} />
    </ListItem>
  );
}

const create = async function (data: FormData) {
  'use server';
  const name = data.get('name');
  if (!name) {
    return;
  }
  createRoom({ name: name.toString() });
};

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
              <form action={create}>
                <List>
                  <ListItem>
                    <TextField
                      fullWidth
                      label="Room Name"
                      placeholder="Room Name"
                      name="name"
                      variant="outlined"
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
                  <Button variant="contained" color="primary" type="submit">
                    Create
                  </Button>
                </Box>
              </form>
            </Container>
          </Card>
        </Container>
      </Container>
    </main>
  );
}
