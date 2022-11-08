import React from 'react';
import './App.css';
import Contacts from './features/contacts';
import ContactSlice from './features/contacts/contactSlice';

const App = (props) => {
  
  return (
    <div className="container">
      <h1>{props.name} 3</h1>
      <Contacts />
    </div>
  );
}

App.defaultProps = {
  name: "React Class"
}

export default App;
