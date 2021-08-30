import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';
import store from './store/store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
