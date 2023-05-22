import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom';

import {store} from './redux/store';
import {Provider} from 'react-redux';
import Login from './app/Login';

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <Login />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
