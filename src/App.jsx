import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CourseList from "./components/CourseList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CourseList.css";

import CourseForm from "./components/CourseForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useJsonQuery } from "./utilities/fetch";

import {useDbData} from "./utilities/firebase"

const Main = () => {
  const [schedule, error] = useDbData('/'); 

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (schedule === undefined) return <h1>Loading data...</h1>;
  if (!schedule) return <h1>No data found</h1>;

  console.log("Schedule: ", schedule )
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">{schedule.title}</div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <body className="App-body">
        <BrowserRouter>
          <Routes>
            <Route path={`/course_info/:id`} element={<CourseForm schedule={schedule} />}/> 
            <Route
              path="/"
              element={<CourseList schedule={schedule} />}
            />
          </Routes>
        </BrowserRouter>

        {/* <Termfilter schedule={schedule}/> */}
      </body>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
