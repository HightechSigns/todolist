import React, { useState, useEffect } from "react";
import "./style.css";
// import images
import optionsBtnImg from "../../assets/images/optionsbtn.png";
export default function TaskOptions({ id, setTaskDelete, actID, data }) {
  const [openOverlay, setOpenOverlay] = useState(false);
  // goal for the TaskOptions Button
  // need to create the button
  // when clicked - store task information into redux state
  // for the options pop up to grab

  // options are, edit task, add desc,
  // we need button for opening options
  const optionButton = () => (
    <div
      className="td-task-options-btn"
      onClick={(e) =>
        openOverlay ? setOpenOverlay(false) : setOpenOverlay(true)
      }
    >
      <img src={optionsBtnImg} alt="" />
    </div>
  );

  // function to delete task
  const handleDeleteTask = (e, id) => {
    if (e) {
      setTaskDelete(true);
      data.map((d, i) => {
        if (d.id === actID) {
          d.tasks.map((t, i) => {
            if (t.id === id) {
              d.tasks.splice(i, 1);
              //   console.log("deleted Task: " + id);
            }
          });
        }
      });
    }
  };
  // need options div
  const taskOptions = () => (
    <div className="td-task-options">
      <p className="td-t-option">Edit Task</p>
      <p
        className="td-t-option delete-task"
        onClick={(e) => handleDeleteTask(e, id)}
      >
        Delete Task
      </p>
    </div>
  );
  useEffect(() => {}, []);
  // Going to ove the options to the main component so it renders as a larger popup
  // This button will store the task information to the state

  return (
    <div className="td-t-o-cont">
      {optionButton()}

      {/* {openOverlay && taskOptions()} */}
    </div>
  );
}
