'use client';

import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';

const SignIn = () => {
  return (
    <>
      <Card>
        <Container maxWidth="lg" sx={{ mt: '20px', mb: '20px' }}>
          <Typography variant="body1" fontWeight={'bold'}>
            Enter your id
          </Typography>
          <List>
            <ListItem>
              <TextField fullWidth variant="outlined" label={'user id'} />
            </ListItem>
          </List>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Box>
        </Container>
      </Card>
      <Typography variant="body1" fontWeight={'bold'}>
        <Divider sx={{ mt: '20px', mb: '20px' }} />
      </Typography>
      <Card>
        <Container maxWidth="lg" sx={{ mt: '20px', mb: '20px' }}>
          <Typography variant="body1" fontWeight={'bold'}>
            Or register
          </Typography>
          <List>
            <ListItem>
              <TextField fullWidth variant="outlined" label={'User id'} />
            </ListItem>
            <ListItem>
              <TextField fullWidth variant="outlined" label={'Email'} />
            </ListItem>
            <ListItem>
              <TextField fullWidth variant="outlined" label={'Name'} />
            </ListItem>
          </List>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </Container>
      </Card>
    </>
  );
};

export default SignIn;
