import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './normalize.scss';
import {Provider} from 'react-redux';
import {store} from './store/store';
import './style.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <BrowserRouter >
		<React.StrictMode>
			<App /> 
		</React.StrictMode>
      </BrowserRouter>
  </Provider>
);
