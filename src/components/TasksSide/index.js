import React, { useState, useEffect } from "react";
import "./style.css";
import trashLight from "../../assets/images/trashLight.svg";
import checkLight from "../../assets/images/checkLight.svg";
import ProgressBar from "../ProgressBar";
import ProgressNote from "../ProgressNote";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateLocalData } from "../../Database/localStorage.js";
// import components
import TaskOptions from '../TaskOptions';
import { act } from "react-dom/test-utils";

export default function TasksSide({
  localLoaded,
  listDelete,
  taskSuccess,
  setTaskSuccess,
  taskDelete,
  setTaskDelete,
  addTask,
  setAddTask,
  currentListName,
  getName,
}) {
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [compTaskNum, setCompTaskNum] = useState();
  const [taskNum, setTaskNum] = useState();

  //redux
  const actID = useSelector((state) => state.actID);
  const toggle = useSelector((state) => state.toggle);
  const data = useSelector((state) => state.data);
  //-----
  // if no items are loaded then this message will show
  const IfNoItems = () => {
    return (
      <div className="no-items-info-cont">
        <p className="no-items ni-desktop">
          Let's start a new List! Click the Add icon next to "Lists"
        </p>
        <p className="no-items ni-mobile">
          Let's start a new List! Click the menu below to add a new Task List!
        </p>
      </div>
    );
  };
  // handle the new task upload
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("seeing if array state will be 'true'");
    // console.log(loadedTasks);
    // console.log("seeing if array state will be 'true'");
    // create the new task obj
    if (!taskInput) {
      console.log('need to add task data')
    } else {
      let taskObj = {
        id: uuidv4(),
        text: taskInput,
        comp: false,
      };
      data.map((d, i) => {
        if (d.id === actID) {
          let taskList = d.tasks;
          taskList.push(taskObj);
        }
      });
      // clear the input
      setTaskInput("");
      setAddTask(true);
      // update local storage
      updateLocalData(data);
    }
  };
  //need to handle the task success
  const handleTaskSuccess = (e, id) => {
    if (e) {
      setTaskSuccess(true);
      data.map((d, i) => {
        if (d.id === actID) {
          d.tasks.map((t, i) => {
            if (t.id === id) {
              if (!t.comp) {
                //   console.log("setting task to complete!");
                //   console.log(t);
                return (t.comp = true);
              } else {
                return (t.comp = false)

              }
            }
          });
        }
      });
    }
  };
  //handle the input for task
  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };
  // add task component
  const addTaskInput = () => (
    <div className="task-input-cont">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="task-input"
          spellcheck="true"
          value={taskInput}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Enter A Task"
          style={toggle ? {} : { background: "#2e475633" }}
        />
        <button className="dt-t-addbtn" >Add</button>
      </form>
    </div>
  );
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
 
  // Use effect
  useEffect(() => {
    // getTasks();
    setTaskSuccess(false);
    setLoadedTasks([]);
    setTaskDelete(false);
    updateLocalData(data);
    setAddTask(false);
    if (currentListName === "" || currentListName === undefined) {
      getName();
    }
    // need to check local storage to see if anything has changed
    // if changed then post new data to local storage
  }, [localLoaded, actID, taskSuccess, taskDelete, listDelete, addTask]);
  return (
    <div className="task-section">
      <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>
        Todo's
      </p>

      {data.length >= 1 ? (
        <h2 style={{ textTransform: "capitalize", margin: "10px 0 0 0" }}>
          {currentListName}

          {/* <ProgressNote
                    data={d}
                    taskSuccess={taskSuccess}
                    taskDelete={taskDelete}
                    addTask={addTask}
                  /> */}
          {/* need to figure out how i made this progress note */}
        </h2>
      ) : (
        ""
      )}
      <p>{compTaskNum} out of {taskNum} tasks complete</p>
      {localLoaded && data.length !== 0
        ? data.map((d, i) => {
          if (d.id === actID) {
            return (
              <ProgressBar
                data={d.tasks}
                setCompTaskNum={setCompTaskNum}
                setTaskNum={setTaskNum}
                taskSuccess={taskSuccess}
                listDelete={listDelete}
                addTask={addTask}
                taskDelete={taskDelete}
              />
            );
          }
        })
        : ""}
      {!localLoaded || !actID || data.length === 0 ? IfNoItems() : ""}
      {localLoaded && data.length !== 0 ? (
        <div className="all-tasks-cont">
          {/* mapped tasks */}
          {data.length >= 1
            ? data.map((d, i) => {
              if (d.id === actID) {
                // console.log(d)
                let objTasks = d.tasks;
                return objTasks.map((t, i) => (
                  <div
                    key={i}
                    data-taskid={t.id}
                    className="task-cont"
                    style={
                      toggle
                        ? { background: "#2E4756" }
                        : { background: "#495a64" }
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className="custom-checkbox"
                        onClick={(e) => {
                          handleTaskSuccess(e, t.id)

                        }}
                        style={
                          t.comp
                            ? { background: "#009FB7", cursor: "default" }
                            : !toggle
                              ? { background: "lightgray", cursor: "pointer" }
                              : { background: "#495a64", cursor: "pointer" }
                        }
                      >
                        {t.comp ? <img src={checkLight} alt="" /> : ""}
                      </div>
                      <p
                        style={
                          toggle ? { color: "white" } : { color: "white" }
                        }
                      >
                        <span
                          className="task-span"
                          style={
                            t.comp
                              ? {
                                textDecoration: "line-through",
                                color: "#ffffff80",
                              }
                              : { textDecoration: "none" }
                          }
                        >
                          {t.text}
                        </span>
                      </p>
                    </div>
                    {/* <img
                        src={trashLight}
                        alt="#"
                        onClick={(e) => handleDeleteTask(e, t.id)}
                        style={{ cursor: "pointer", width: "15px" }}
                      /> */}
                    <TaskOptions
                      id={t.id}
                      setTaskDelete={setTaskDelete}
                      actID={actID}
                      data={data}
                    />
                  </div>
                ));
              }
            })
            : ""}
          {/* mapped tasks */}
        </div>
      ) : (
        ""
      )}
      {localLoaded && data.length !== 0 ? addTaskInput() : ""}
    </div>
  );
}
