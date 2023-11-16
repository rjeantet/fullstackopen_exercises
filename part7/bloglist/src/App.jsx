import { useContext } from 'react';

import AuthContext from './context/AuthContext';

import LoginForm from './components/LoginForm';
import Header from './components/Header';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

const App = () => {
  const { user } = useContext(AuthContext);

  return user ? (
    <>
      <Header />
      <Notification />
      <BlogForm />
      <BlogList />
    </>
  ) : (
    <LoginForm />
  );
};

export default App;
