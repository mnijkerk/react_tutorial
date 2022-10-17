import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../CourseList.css";
import Modal from "./Modal";
import Cart from "./Cart";
import FilterButton from "../FilterButton";
import CourseTiles from "./CourseTiles";
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
    <div>
      <FilterSelector selection={filterOption} setSelection={setFilterOption} />
      <Modal open={modalOpen} close={closeModal}>
        <Cart schedule={schedule} selected={selectedCourses} />
      </Modal>
      <button className="cartButton" onClick={openModal}>
        View Cart{" "}
      </button>
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
