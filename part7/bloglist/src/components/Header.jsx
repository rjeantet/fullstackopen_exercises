import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, clearUser } = useContext(AuthContext);

  return user ? (
    <div style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
      <span>
        <Link to={'/'}>blogs </Link>
      </span>
      <span>
        <Link to={'/users'}>users </Link>
      </span>

      <span>
        {user.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            clearUser(user);
          }}
        >
          logout
        </button>
      </span>
    </div>
  ) : null;
};

export default Header;
