import {store} from '../redux/store';
import {setNotificationText} from '../redux/reducers/NotificationReducer';
import {setToken} from "../redux/reducers/AuthenticationReducer";
import {logoutCall, setTokenForRequests} from "./api";
import {TransactionType} from "./interfaces";
import * as _ from "lodash";

export const showNotification = (message: string) => {
  store.dispatch(setNotificationText(message));
  setTimeout(() => {
    store.dispatch(setNotificationText(null));
  }, 5000);
};

export const destroySession = () => {
  store.dispatch(setToken(null));
  sessionStorage.removeItem('userToken');
  setTokenForRequests(null);
  logoutCall().then(console.log);
};

export const checkValidLoginParams = (
  userName: string | null | undefined,
  password: string | null | undefined
) => checkValidString(userName) && checkValidString(password);
const checkValidString = (value: string | null | undefined) =>
  value !== null && value !== undefined && value !== '';


export const groupTransactionsByDate = (cData: TransactionType[]) => {
  return _.groupBy(cData, ({ date }) => {
    const currentDate = new Date(date);
    if (isNaN(currentDate.getTime())) {
      return `Cannot determine date`;
    }
    return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
  });
};
