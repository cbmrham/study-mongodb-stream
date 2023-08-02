'use client';
import { AppBar, Avatar, Box, Grid, Tooltip, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

const Header = () => {
  const [currentUser] = useContext(UserContext);
  return (
    <AppBar position="static">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        padding="10px 50px"
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          fontSize={'3rem'}
          align="center"
        >
          ChatApp
        </Typography>

        {currentUser && (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Tooltip title={currentUser.name}>
              <Avatar>
                {currentUser.uid.substring(0, 1).toLocaleUpperCase()}
              </Avatar>
            </Tooltip>
          </Box>
        )}
      </Box>
    </AppBar>
  );
};

export default Header;
