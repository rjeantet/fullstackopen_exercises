import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import userService from '../services/userService';

const UserDetails = () => {
  const [user, setUser] = useState({});
  const id = useParams().id;

  useEffect(() => {
    userService.getUserById(id).then((response) => {
      setUser(response);
      console.log(response);
    });
  }, [id]);

  return (
    <>
      <Header />
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs ? (
          user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
        ) : (
          <p>No blogs added</p>
        )}
      </ul>
    </>
  );
};

export default UserDetails;
