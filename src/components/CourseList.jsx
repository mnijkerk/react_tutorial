import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CourseList.css";

import { useState } from "react";

// const terms = {
//   Fall: "Breakfast items...",
//   Winter: "Lunch items...",
//   Spring: "Dinner items...",
// };

const terms = ['Fall', 'Winter', 'Spring'];

const FilterButton = ({ term, selection, setSelection }) => (
  <button className="filterButtons" >
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === selection}
      autoComplete="off"
      onChange={() => setSelection(term)}
    />
    <label htmlFor={term}>
      {term}
      
    </label>
  </button>
);

const FilterSelector = ({ selection, setSelection }) => (
  <div className="btn-group">
    {terms.map((term) => (
      <FilterButton
        key={term}
        term={term}
        selection={selection}
        setSelection={setSelection}
      />
    ))}
  </div>
);

const FilteredTiles = ({ schedule, termSelection }) => {
  const filteredSchedule = Object.entries(schedule.courses).filter(
    ([id, course]) => course.term == termSelection
  );

  return (
    <div className="courseList">
      {filteredSchedule.map(([id, course]) => (
        <div className="courseTile">
          <div className="courseNumberDescription">
            <h3>
              {course.term} CS {course.number}{" "}
            </h3>
            <p> {course.title} </p>
          </div>

          <div className="meetingTime">{course.meets}</div>
        </div>
      ))}
    </div>
  );
};

const CourseList = ({ schedule }) => {
    const [selection, setSelection] = useState(() => terms[0]);
    return (
      <div>
        <FilterSelector selection={selection} setSelection={setSelection} />
        <FilteredTiles schedule={schedule} termSelection={selection} />
      </div>
    );
  };
  
  export default CourseList;
  