import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Paper,
  Divider,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material';

import Header from './Header';
import LoginForm from './LoginForm';
import userService from '../services/userService';
import AuthContext from '../context/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return user ? (
    <>
      <Header />
      <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
        Users
      </Typography>
      <Divider />
      <Container maxWidth='sm' align='center'>
        <div className='userList'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <th></th>
                  <TableCell>Blogs created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  ) : (
    <LoginForm />
  );
};

export default UserList;
