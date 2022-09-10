import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { EmailProvider } from './components/Functions/context';

ReactDOM.render(
  <EmailProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </EmailProvider>,  
  document.getElementById('root')
);