import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_BOOKS } from './queries/queries';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';

const App = () => {
  const result = useQuery(ALL_BOOKS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token')
  );
  const client = useApolloClient();

  const padding = {
    padding: 5,
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <div>
        <div>
          <Link style={padding} to='authors'>
            <button>authors</button>
          </Link>
          <Link style={padding} to='books'>
            <button>books</button>
          </Link>
          {token && (
            <>
              <Link style={padding} to='add'>
                <button>add book</button>
              </Link>
              <Link style={padding} to='recommend'>
                <button>recommend</button>
              </Link>
              <button onClick={logout}>logout</button>
            </>
          )}
          {!token && (
            <Link style={padding} to='login'>
              login
            </Link>
          )}
        </div>
        <Routes>
          <Route path='/authors' element={<Authors />} />
          <Route path='/books' element={<Books />} />
          <Route
            path='/add'
            element={
              !token ? (
                <LoginForm setToken={setToken} setError={notify} />
              ) : (
                <NewBook setError={notify} />
              )
            }
          />
          <Route
            path='/recommend'
            element={
              !token ? (
                <LoginForm setToken={setToken} setError={notify} />
              ) : (
                <Recommend />
              )
            }
          />
          <Route
            path='/login'
            element={<LoginForm setToken={setToken} setError={notify} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
