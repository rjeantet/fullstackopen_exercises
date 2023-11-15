import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
      <h1>Users</h1>
      <div className='userList'>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <LoginForm />
  );
};

export default UserList;
