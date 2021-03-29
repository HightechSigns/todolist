import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
// components
import OnOffLineUser from "../../components/OnOffLineUser";
import ListsSideBar from "../../components/ListsSideBar";
import ModeSelector from "../../components/ModeSelector";
import TasksSide from "../../components/TasksSide";
//import DB
import { setupData, getLocalData, setLocalActiveId, updateLocalData, deleteLocalData } from "../../Database/localStorage.js";
import { getData, setActiveId } from "../../actions";
export default function TodoList() {
  const [loaded, setLoaded] = useState(false);
  const [listDelete, setListDelete] = useState(false);
  const toggle = useSelector((state) => state.toggle);
  const actID = useSelector((state) => state.actID);
  const data = useSelector((state) => state.data);
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

    // this is to load last edited task list when opening app
    // if the user has a last edited task
    // let localActiveId = localStorage.getItem("active-list-id");
    // if (localActiveId !== undefined ) {
    //   dispatch(setActiveId(localActiveId));
    // }
    setupData(data,actID)
    getLocalData(dispatch)
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
        <ListsSideBar
          setLoaded={setLoaded}
          loaded={loaded}
          listDelete={listDelete}
          setListDelete={setListDelete} />
        <TasksSide loaded={loaded} />
      </section>
    </div>
  );
}
