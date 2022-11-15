import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './features/Main';
import Contacts from './features/contacts';

const App = (props) => {
  
  return (
    <div className="container">
      <BrowserRouter>
        <h1>{props.name} 3</h1>
        <Routes>
          <Route path="/contacts/*" element={<Contacts />}></Route>
          <Route path="*" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

App.defaultProps = {
  name: "React Class"
}

export default App;
