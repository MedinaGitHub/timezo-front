import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes.js';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
