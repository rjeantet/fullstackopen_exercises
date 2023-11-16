import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from '@mui/material';
import { NotificationContextProvider } from './context/NotificationContext';
import { AuthContextProvider } from './context/AuthContext';

import App from './App';
import Blog from './components/BlogDetails';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <NotificationContextProvider>
        <Container>
          <Router>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/blogs/:id' element={<Blog />} />
              <Route path='/users' element={<UserList />} />
              <Route path='/users/:id' element={<UserDetails />} />
            </Routes>
          </Router>
        </Container>
      </NotificationContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);
