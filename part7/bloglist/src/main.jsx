import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './context/NotificationContext';
import { AuthContextProvider } from './context/AuthContext';

import App from './App';
import Users from './components/Users';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <NotificationContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/users' element={<Users />} />
          </Routes>
        </Router>
      </NotificationContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);
