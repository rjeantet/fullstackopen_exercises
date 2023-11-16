import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';
import Alert from '@mui/material/Alert';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return notification ? (
    <Alert className={`message ${notification.style}`}>
      {notification.data}
    </Alert>
  ) : null;
};

export default Notification;
