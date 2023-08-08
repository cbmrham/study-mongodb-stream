import { Avatar, Box, Tooltip } from '@mui/material';
import { me } from './_actions/me';

const UserIcon = async () => {
  const currentUser = await me();

  return (
    <>
      {currentUser && (
        <Box display="flex" flexDirection="row" alignItems="center">
          <Tooltip title={currentUser.name}>
            <Avatar>
              {currentUser.uid.substring(0, 1).toLocaleUpperCase()}
            </Avatar>
          </Tooltip>
        </Box>
      )}
    </>
  );
};

export default UserIcon;
