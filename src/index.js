import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import { createStore } from 'redux';
//import reducers from './reducers';
//import sliceReducer from './features/contacts/contactSlice';
//import { selectContact, changeFilter } from './features/contacts/contactSlice';
import { contactApi } from './features/api/contactApi';
import { Provider } from 'react-redux';
import { store } from './components/Store';

//const store = createStore(reducers);
// const store = configureStore({
//   reducer: reducers,
//   middleware: [],
//   devTools: process.env.NODE_ENV !== 'production',
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider api={contactApi} store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
