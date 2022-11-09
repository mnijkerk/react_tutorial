import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CourseList.css";
import Modal from "./Modal";
import Cart from "./Cart";
import CourseTiles from "./CourseTiles";
import { useState } from "react";
import { Link } from "react-router-dom";

const terms = ["Fall", "Winter", "Spring"];



const FilterButton = ({ term, selection, setSelection }) => (
  <button
    className="filterButton"
  >
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === selection}
      autoComplete="off"
      onChange={() => setSelection(term)}
    />
    <label htmlFor={term} data-cy={term}>{term}</label>
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

const CourseList = ({ schedule }) => {
  const [selectedCourses, setCourseSelection] = useState([]);
  const [filterOption, setFilterOption] = useState(() => terms[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const toggleSelected = (item) =>
    setCourseSelection(
      selectedCourses.includes(item)
        ? selectedCourses.filter((x) => x !== item)
        : [...selectedCourses, item]
    );

  return (
    <div className="courses">
      <div className="filterCartButtons">
        <FilterSelector
          selection={filterOption}
          setSelection={setFilterOption}
        />
        <Modal open={modalOpen} close={closeModal}>
          <Cart schedule={schedule} selected={selectedCourses} />
        </Modal>
        <button className="cartButton" onClick={openModal}>
          View Cart{" "}
        </button>
      </div>

      <CourseTiles
        schedule={schedule}
        termSelection={filterOption}
        selectedCourses={selectedCourses}
        toggleSelected={toggleSelected}
      />
    </div>
  );
};

export default CourseList;
