import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { EmailProvider, UserProvider } from './components/Functions/context';

ReactDOM.render(
  <UserProvider>
  <EmailProvider>
  {/* <App.TSX> */}
  <React.StrictMode>
    <App />
  </React.StrictMode>
  {/* <App.TSX> */}
  </EmailProvider>
  </UserProvider>
  ,  
  document.getElementById('root')
);