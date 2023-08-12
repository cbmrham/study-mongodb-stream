'use server';
import { Box, Button, List, ListItem, TextField } from '@mui/material';
import { createRoom } from '../../../_actions/rooms';
import { revalidatePath } from 'next/cache';

export async function create(data: FormData) {
  const name = data.get('name');
  if (!name) {
    return;
  }
  createRoom({ name: name.toString() });
  revalidatePath('/');
}

export default async function CreateRoomForm() {
  return (
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
  );
}
