import { Link } from "react-router-dom";
import "../CourseTiles.css";
import { useAuthState } from "../utilities/firebase";

const CourseTiles = ({
  schedule,
  termSelection,
  selectedCourses,
  toggleSelected,
}) => {
  const filteredSchedule = Object.entries(schedule.courses).filter(
    ([id, course]) => course.term == termSelection
  );

  const timeConverter = (timeString) => {
    const hour = parseInt(timeString.split(":")[0]);
    const minutes = parseInt(timeString.split(":")[1]);
    return hour + minutes / 60;
  };

  const timeObjectConverter = (meetsEntry) => {
    const dayMeets = meetsEntry.split(" ")[0];
    const times = meetsEntry.split(" ")[1];
    const startTimeParsed = times.split("-")[0];
    const endTimeParsed = times.split("-")[1];
    const startTime = timeConverter(startTimeParsed);
    const endTime = timeConverter(endTimeParsed);
    return { day: dayMeets, startTime: startTime, endTime: endTime };
  };

  const doesOverLap = (meetDataObj1, meetDataObj2) => {
    if (meetDataObj1.day == meetDataObj2.day) {
      if (
        meetDataObj1.startTime < meetDataObj2.endTime &&
        meetDataObj2.startTime < meetDataObj1.endTime
      ) {
        return true;
      }
    }

    return false;
  };

  const classScheduleConflict = (courses, selectedclasses) => {
    selectedclasses.map(([selectedClassID, selectedClassData]) => {});
  };

  const selectedCoursesData = selectedCourses.map(
    (courseID) => schedule.courses[courseID]
  );

  const testClass = "F343";
  const testClassData = schedule.courses[testClass];
  const TestClassMeet = timeObjectConverter(testClassData.meets);
  let selectedFiltered = filteredSchedule;

  selectedCoursesData.forEach((item) => {
    selectedFiltered = selectedFiltered.filter(
      ([classID, classData]) =>
        !doesOverLap(
          timeObjectConverter(item.meets),
          timeObjectConverter(classData.meets)
        )
    );
  });

  const selectedFilteredId = selectedFiltered.map(
    ([classID, classData]) => classID
  );

  const EditClassButton = ({id}) => (<Link to={`/course_info/${id}`}>
  <button className="editClass">Edit Class</button>
</Link>)

  const UserExists = ({id}) => {
    const [user] = useAuthState();
    return user ? <EditClassButton id={id} /> 
    : <div> </div> 

  };

  // filteredSchedule: array of objects[courseID, courseData]
  // selectedCourses: array of courseID
  // selectedCoursesData: array of objects[courseID, courseData]

 
  return (
    <div className="courseList">
      {filteredSchedule.map(([id, course]) => {
        //

        return (
          <div
            className={`courseTile${
              selectedCourses.includes(id)
                ? "selected"
                : !selectedFilteredId.includes(id)
                ? "notAvailable"
                : ""
            }`}
            onClick={() => {
              selectedCourses.includes(id)
                ? toggleSelected(id)
                : !selectedFilteredId.includes(id)
                ? console.log("cannot add")
                : toggleSelected(id);
            }}
          >
            <div className="courseNumberDescription">
              <h3>
                {course.term} CS {course.number}{" "}
              </h3>
              <p> {course.title} </p>
            </div>

            <div className="meetingTime">{course.meets}</div>
            <UserExists id={id} />

            {/* <Link to={`/course_info/${id}`}>
              <button className="editClass">Edit Class</button>
            </Link> */}


          </div>
        );
      })}
    </div>
  );
};

export default CourseTiles;
