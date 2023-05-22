import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const Notification = () => {
  const notificationMessage = useSelector(
    (state: RootState) => state.notification.message
  );
  return (
    <div style={{ width: '25%' }} className={'alert alert-danger'} role="alert">
      {notificationMessage}
    </div>
  );
};

export default Notification;
