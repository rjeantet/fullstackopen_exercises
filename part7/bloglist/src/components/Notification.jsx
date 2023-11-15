import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return notification ? (
    <div className={`message ${notification.style}`}>{notification.data}</div>
  ) : null;
};

export default Notification;
