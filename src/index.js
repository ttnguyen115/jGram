import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './database/firebase';
import './styles/app.css';  


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={{ firebase, FieldValue }}>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
