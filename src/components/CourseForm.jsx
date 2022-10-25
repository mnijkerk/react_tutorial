import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import "../CourseForm.css";
import { useState } from "react";
import { useDbUpdate } from "../utilities/firebase";


const useFormData = (validator = null, values = {}) => {
  const [state, setState] = useState(() => ({ values }));

  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : "";
    evt.target.setCustomValidity(error);

    const values = { ...state.values, [id]: value };
    const errors = { ...state.errors, [id]: error };
    const hasError = Object.values(errors).some((x) => x !== "");
    setState(hasError ? { values, errors } : { values });
  };

  return [state, change];
};

const validateUserData = (key, val) => {
  const dayOptions = {
    M: "Monday",
    Tu: "Tuesday",
    W: "Wednesday",
    Th: "Thursday",
    F: "Friday",
    Sa: "Saturday",
    Su: "Sunday",
  };

  switch (key) {
    case "title":
      return /(^\w\w)/.test(val) ? "" : "must be least two characters";
    case "meets":
      const days = val.split(" ")[0];
      let dayFormatFlag = false;
      let hourFormatFlag = false;

      for (var i = 0; i < days.length; i++) {
        const day = days.charAt(i);
        dayOptions[day] === undefined
          ? (dayFormatFlag = true)
          : (dayFormatFlag = false);
      }

      if (val.split(" ").length <= 1) {
        hourFormatFlag = true;
      }

      return dayFormatFlag == true || hourFormatFlag == true
        ? "must contain days and start-end, e.g., MWF 12:00-13:20"
        : "";

    default:
      return "";
  }
};

const InputField = ({ name, text, state, change }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {text}
      </label>
      <input
        className="form-control"
        id={name}
        name={name}
        defaultValue={state.values?.[name]}
        onChange={change}
      />
      <div className="invalid-feedback">{state.errors?.[name]}</div>
    </div>
  );
};

const CourseForm = ({ schedule }) => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const courseID = location.pathname.split("/")[2];
  const course = schedule.courses[courseID];
  const [state, change] = useFormData(validateUserData, course);
  const [update, result] = useDbUpdate(`/courses/${courseID}`)
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
      navigate(-1); 
    }
  };
   
  console.log("State: ", state.values)
  return (
    <form
      onSubmit={submit}
      noValidate
      id="courseForm"
      className={state.errors ? "was-validated" : ".courseForm"}
    >
      <div className="courseFormBlock">
        <InputField name="title" text="Title" state={state} change={change} />{" "}
      </div>
      <div className="courseFormBlock">
        <InputField name="meets" text="Meets" state={state} change={change} />
      </div>

      <div className="courseFormButtonsBlock">
        <Link to={`/`}>
          <button className="courseFormButton">Cancel</button>
        </Link>
        <button className="courseFormButton" onClick={submit} disabled={false}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
