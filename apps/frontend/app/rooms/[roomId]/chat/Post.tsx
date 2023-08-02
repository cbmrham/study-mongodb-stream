import { Avatar, Box, Paper, Typography, alpha, useTheme } from '@mui/material';
import { ChatPost, User } from '@prisma/client/main';

type Props = {
  post: ChatPost & { sender: User };
  // user: User;
  position?: 'left' | 'right';
  consecutive?: boolean;
};

const Post = ({ post, position = 'left', consecutive = true }: Props) => {
  const left = position === 'left';
  const postedAt = new Date(post.postedAt);
  const theme = useTheme();
  const backgroundColor = left
    ? alpha(theme.palette.primary.main, 0.4)
    : alpha(theme.palette.secondary.main, 0.4);
  return (
    <Box
      flexDirection={left ? 'row' : 'row-reverse'}
      sx={{ display: 'flex', m: '10px' }}
    >
      {left && (
        <>
          {!consecutive ? (
            <Avatar sx={{ width: '36px', height: '36px' }}>
              {post.sender.name?.substring(0, 1).toLocaleUpperCase() || 'U'}
            </Avatar>
          ) : (
            <Box sx={{ width: '36px', height: '36px' }} />
          )}
        </>
      )}
      <Box>
        {left && !consecutive && (
          <Typography
            variant="body1"
            fontWeight={'bold'}
            fontSize="0.8rem"
            padding="4px"
          >
            {post.sender.name}
          </Typography>
        )}
        <Box
          display={'inline-flex'}
          flexDirection={left ? 'row' : 'row-reverse'}
          alignItems={'end'}
        >
          <Paper
            sx={{
              p: '8px',
              borderRadius: '12px',
              backgroundColor,
            }}
          >
            <Typography variant="body2">{post.content}</Typography>
          </Paper>
          <Typography variant="body1" sx={{ ml: '5px' }} fontSize="0.5rem">
            {`${postedAt.getHours()}:${postedAt.getMinutes()}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Post;
