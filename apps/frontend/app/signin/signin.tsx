import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// export default function AddToCart({ productId }) {
//   async function addItem(data) {
//     'use server';

//     const cartId = cookies().get('cartId')?.value;
//     await saveToDb({ cartId, data });
//   }

//   return (
//     <form action={addItem}>
//       <button type="submit">Add to Cart</button>
//     </form>
//   );
// }

const SignIn = () => {
  async function signin(data: FormData) {
    'use server';

    console.log(cookies().get('token')?.value);
    const uid = data.get('uid');
    const res = await fetch(`http://localhost:3000/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid }),
    }).then((res) => {
      if (!res.ok) {
        return null;
      }
      return res.json();
    });
    const token = res?.access_token;
    if (!token) {
      return;
    }
    cookies().set('token', token);
    redirect('/');
    //  = `token=${token}`;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: '20px', mb: '20px' }}>
      <Typography variant="body1" fontWeight={'bold'}>
        Enter your id
      </Typography>
      <form action={signin}>
        <List>
          <ListItem>
            <TextField
              fullWidth
              variant="outlined"
              label={'user id'}
              name="uid"
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
            Sign in
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SignIn;
