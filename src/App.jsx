import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CourseList from './components/CourseList';
import Banner from './components/Banner'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CourseList.css'


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';


const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

  return( 
    <div className="App">
        
      <header className="App-header">
        <Banner schedule = {schedule} />
        <img src={logo} className="App-logo" alt="logo" />       
      </header>

      
      <body className='App-body'>
        
        <CourseList schedule= {schedule} /> 

        {/* <Termfilter schedule={schedule}/> */}

      </body>


    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;

