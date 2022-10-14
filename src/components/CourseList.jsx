import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CourseList.css";
import Modal from "./Modal";
import Cart from "./Cart";
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
        <div
          className={`courseTile${
            selectedCourses.includes(id) ? "selected" : ""
          }`}
          onClick={() => toggleSelected(id)}
        >
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

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleSelected = (item) =>
    setCourseSelection(
      selectedCourses.includes(item)
        ? selectedCourses.filter((x) => x !== item)
        : [...selectedCourses, item]
    );



  return (
    <div>
      <FilterSelector selection={selection} setSelection={setSelection} />
      <Modal open={open} close={closeModal}>
        <Cart schedule={schedule} selected={selectedCourses} />
      </Modal>
      <button className="cartButton" onClick={openModal}>
        View Cart{" "}
      </button>
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
