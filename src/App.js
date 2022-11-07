import React from 'react';
import './App.css';
import ContactMain from './features/contacts/ContactMain';

const App = (props) => {
  
  return (
    <div className="container">
      <h1>{props.name} 3</h1>
      <ContactMain />
    </div>
  );
}

App.defaultProps = {
  name: "React Class"
}

export default App;
