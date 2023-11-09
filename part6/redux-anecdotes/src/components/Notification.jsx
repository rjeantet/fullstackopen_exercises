import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timeout');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch(removeNotification());
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, notification]);

  return <>{notification && <div style={style}>{notification}</div>} </>;
};

export default Notification;
