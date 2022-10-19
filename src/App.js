import React from 'react';
import './App.css';
import CardList from './components/cardlist';
import Counter from './components/counter';

const App = (props) => {
  
  return (
    <div className="container">
      <h1>{props.name} 2</h1>
      <div className="row">
        <CardList number={5}>List of Contracts</CardList>
        <Counter number={5}>To increase count, click button.</Counter>
      </div>
    </div>
  );
}

App.defaultProps = {
  name: "React Class"
}

export default App;
