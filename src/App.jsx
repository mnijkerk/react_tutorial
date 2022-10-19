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

const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery(
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  );

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

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
