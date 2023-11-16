import { useState, useContext } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

import AuthContext from '../context/AuthContext';
import NotificationContext from '../context/NotificationContext';
import Notification from './Notification';
import loginService from '../services/loginService';
import blogService from '../services/blogs';

const Login = () => {
  const notification = useContext(NotificationContext);
  const { setUser } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      console.log(user);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      notification.setError('Wrong username or password');
    }
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Log in to the application
          </Typography>
          <Notification />
          <Box
            component='form'
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              fullWidth
              size='small'
              id='username'
              label='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              id='password'
              label='Password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              size='large'
              variant='contained'
              type='submit'
              id='login-button'
            >
              login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
