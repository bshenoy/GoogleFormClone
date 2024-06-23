import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot instead of render
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const root = createRoot(document.getElementById('root')); // Create a root instance

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
