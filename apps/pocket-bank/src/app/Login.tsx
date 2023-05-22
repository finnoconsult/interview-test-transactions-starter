import React, {useEffect, useState} from 'react';
import {getApiStatus, loginCall, setTokenForRequests,} from '../util/api';
import Transactions from './Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/reducers/AuthenticationReducer';
import {RootState} from '../redux/store';
import Notification from './Notification';
import {checkValidLoginParams, destroySession, showNotification} from '../util/util';
import Layout from "./Layout";

const Login = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<boolean>(false);
  const notificationMessage = useSelector(
    (state: RootState) => state.notification.message
  );
  const dispatch = useDispatch();
  const userToken = useSelector(
    (state: RootState) => state.authentication.token
  );

  useEffect(() => {
    const token = sessionStorage.getItem('userToken');
    checkApiStatus();
    dispatch(setToken(token));
    setTokenForRequests(token);

  }, []);

  useEffect(() => {
    if (userToken) {
      sessionStorage.setItem('userToken', userToken || '');
      setTokenForRequests(userToken);
    }
  }, [userToken]);

  const login = () => {

    if (!apiStatus) {
      showNotification(
        'System error has been occurred, please turn to the support team! 069073898433'
      );
      return;
    }

    if (checkValidLoginParams(userName, password)) {
      loginCall(userName, password)
        .then(({data}) => {
          sessionStorage.setItem('userToken', data.token || '');
          setTokenForRequests(data.token);
          dispatch(setToken(data.token));
        })
        .catch(() =>
          showNotification(
            'Something happened during login, please try it later!'
          )
        );
    } else {
      showNotification('Please enter a valid user/password pair!');
    }
  };

  const checkApiStatus = () => {
    getApiStatus()
      .then(({data}) => {
        setApiStatus(data.status === 'OK');
      })
      .catch(() => setApiStatus(false));
  };


  return (
    <>
      {notificationMessage ? <Notification/> : null}
      {userToken ? (
        <Transactions destroySession={destroySession}/>
      ) : (
        <Layout buttonBackground={apiStatus ? 'green' : 'red'} buttonClick={checkApiStatus} backgroundColor={"bg-dark"} buttonTitle={"API Statuss"}>
          <p className="text-white-50 mb-5">
            Please enter your login and password!
          </p>
          <div className="form-outline form-white mb-4">
            <input
              onChange={(event) => setUserName(event.target.value)}
              type="text"
              id="userNameX"
              className="form-control form-control-lg"
            />
            <label className="form-label" htmlFor="userNameX">
              Username
            </label>
          </div>

          <div className="form-outline form-white mb-4">
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="typePasswordX"
              className="form-control form-control-lg"
            />
            <label className="form-label" htmlFor="typePasswordX">
              Password
            </label>
          </div>
          <button
            onClick={login}
            className="btn btn-outline-light btn-lg px-5"
            type="submit"
            disabled={!apiStatus}
          >
            Login
          </button>
        </Layout>
      )}
    </>
  );
};

export default Login;
