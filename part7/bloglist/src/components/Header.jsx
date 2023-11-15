import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const Header = () => {
  const { user, clearUser } = useContext(AuthContext);

  return user ? (
    <>
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            clearUser(user);
          }}
        >
          logout
        </button>
      </p>
    </>
  ) : null;
};

export default Header;
