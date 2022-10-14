import "../Cart.css";

const Cart = ({ schedule, selected }) => {
    const courses = schedule.courses;
    console.log(courses)
  return (
    <div className="cart">
      {selected.length === 0 ? (
        <h2>The cart is empty</h2>
      ) : (
        selected.map( courseId => (
          <div className="cartRow">
            <div className="cartCourseId">{courses[courseId].number}</div>
            <div className="cartCourseTitle"> {courses[courseId].title} </div>
            <div className="cartCourseMeets">{courses[courseId].meets} </div>
          </div>
        ))
      )}
    </div>
    // <div></div>
  );
};

export default Cart;
