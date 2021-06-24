import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
// components
import OnOffLineUser from "../../components/OnOffLineUser";
import ListsSideBar from "../../components/ListsSideBar";
import ModeSelector from "../../components/ModeSelector";
import TasksSide from "../../components/TasksSide";
import MobileListMenu from "../../components/MobileListMenu";
//import DB
import { getLocalData } from "../../Database/localStorage.js";
// import { getData, setActiveId } from "../../actions";
export default function TodoList() {
  const [localLoaded, setlocalLoaded] = useState(false);
  const [listDelete, setListDelete] = useState(false);
  const toggle = useSelector((state) => state.toggle);
  const actID = useSelector((state) => state.actID);
  const data = useSelector((state) => state.data);
  const [taskSuccess, setTaskSuccess] = useState(false);
  const [taskDelete, setTaskDelete] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [currentListName, setCurrentListName] = useState("");
  const dispatch = useDispatch();

  const modeStyles = {
    darkMode: {
      background: "#1f1f1f",
      color: "white",
    },
    lightMode: {
      background: "White",
      color: "#1f1f1f",
      transition: "all 300ms ease-out",
    },
  };
  //getting items from DB when page loads
  useEffect(() => {
    getLocalData(dispatch, setlocalLoaded);
  }, [data]);
  return (
    <div
      className="todo-main-page"
      style={toggle ? modeStyles.darkMode : modeStyles.lightMode}
    >
      <div className="header-main-cont">
        <OnOffLineUser toggle={toggle} />
        <ModeSelector />
      </div>
      <section className="main-body-cont">
        <MobileListMenu/>
        <ListsSideBar
          localLoaded={localLoaded}
          setlocalLoaded={setlocalLoaded}
          listDelete={listDelete}
          setListDelete={setListDelete}
          taskSuccess={taskSuccess}
          taskDelete={taskDelete}
          addTask={addTask}
          setCurrentListName={setCurrentListName}
        />
        <TasksSide
          localLoaded={localLoaded}
          taskSuccess={taskSuccess}
          setTaskSuccess={setTaskSuccess}
          taskDelete={taskDelete}
          setTaskDelete={setTaskDelete}
          addTask={addTask}
          setAddTask={setAddTask}
          currentListName={currentListName}
        />
      </section>
    </div>
  );
}
