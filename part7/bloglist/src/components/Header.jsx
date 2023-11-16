import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Toolbar, Typography, Button } from '@mui/material';

import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, clearUser } = useContext(AuthContext);

  const navigate = useNavigate();

  return user ? (
    <>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: '#f2f2f2',
        }}
      >
        <Link to={'/'}>
          <Button size='small'>blogs</Button>
        </Link>

        <Link to={'/users'}>
          <Button size='small'>users </Button>
        </Link>
        <Typography
          component='h2'
          variant='h5'
          color='inherit'
          align='center'
          noWrap
          sx={{ flex: 1 }}
        >
          Blog App
        </Typography>
        <Typography variant='overline' display='block' sx={{ mr: 2 }}>
          {user.name}
        </Typography>

        <Button
          variant='outlined'
          size='small'
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            clearUser(user);
            navigate('/');
          }}
        >
          {' '}
          logout
        </Button>
      </Toolbar>
    </>
  ) : null;
};

export default Header;
