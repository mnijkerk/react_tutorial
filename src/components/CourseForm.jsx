import { useLocation, Link} from "react-router-dom";
import "../CourseForm.css";
const CourseForm = ({ schedule }) => {

  const location = useLocation();
  const courseID = location.pathname.split("/")[2];
  const course = schedule.courses[courseID];

  const submit = () => { 

  }
  return (
    <form onSubmit={submit} className="courseForm">
      <div className="courseFormBlock">
        <label className="courseFormLabel">
          <h2>Course Name</h2>
        </label>
        <input
          className="courseFormInput"
          defaultValue={`${course.title}`}
        ></input>
      </div>
      <div className="courseFormBlock">
        <label className="courseFormLabel">
          <h2>Course Meets</h2>
        </label>
        <input
          className="courseFormInput"
          defaultValue={`${course.meets}`}
        ></input>
      </div>

      <div className="courseFormButtonsBlock">
      <Link to={`/`}><button className="courseFormButton">Cancel</button></Link>
        <button className="courseFormButton" disabled={true}>Submit</button>
      </div>
    </form>
  );
};

export default CourseForm;
