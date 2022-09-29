import { useState } from 'react';
import logo from './logo.svg';
import './App.css';


const Schedule = { 
  title: "CS Courses for 2018-2019"
}; 


const App = () => {
  const [count, setCount] = useState(0);

  const today = new Date(); 
  const day = today.toLocaleString([], {weekday: 'long'}); 
  const date = today.toLocaleDateString([], {dateStyle: 'long'}); 

  return (
    <div className="App">
      <header className="App-header">
        <p>CS Course Scheduler</p>
        <img src={logo} className="App-logo" alt="logo" />

        <h1> {Schedule.title} </h1>
        
        <p> 
          Today is {day}, {date}. 
        </p>

        
      </header>
    </div>


  );

};

export default App;
