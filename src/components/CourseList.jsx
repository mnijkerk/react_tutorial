import CourseListIndiv from "./CourseListIndiv";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../CourseList.css';


const CourseList = ({schedule}) => (
    <div className='courseList'>
        
        { Object.entries(schedule.courses).map(([id, course]) => 
        
        // hello
        <div className="courseTile">
                <h3>{course.term} CS {course.number} </h3>
                <p> {course.title} </p>
                <div className="meetingTime"> 
                    {course.meets}
                </div>
        </div>
        )} 

    </div>
)
  export default CourseList; 