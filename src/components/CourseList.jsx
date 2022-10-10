import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CourseList.css";
// import ProductList from './ProductList'
import FilterButton from "../FilterButton";
import { useState } from "react";

const terms = ["Fall", "Winter", "Spring"];

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

const CourseTiles = ({
  schedule,
  termSelection,
  selectedCourses,
  toggleSelected,
}) => {
  const filteredSchedule = Object.entries(schedule.courses).filter(
    ([id, course]) => course.term == termSelection
  );

  return (
    <div className="courseList">
      {filteredSchedule.map(([id, course]) => (
        <div className={`courseTile${selectedCourses.includes(id) ? 'selected' : ''}`} onClick={() => toggleSelected(id)}>
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

  const [selectedCourses, setCourseSelection] = useState([]);

  const [selection, setSelection] = useState(() => terms[0]);


  const toggleSelected = (item) =>
    setCourseSelection(
      selectedCourses.includes(item)
        ? selectedCourses.filter((x) => x !== item)
        : [...selectedCourses, item]
    );

    console.log(selectedCourses)

  return (
    <div>
      <FilterSelector selection={selection} setSelection={setSelection} />
      <CourseTiles
        schedule={schedule}
        termSelection={selection}
        selectedCourses={selectedCourses}
        toggleSelected={toggleSelected}
      />
    </div>
  );
};

export default CourseList;
