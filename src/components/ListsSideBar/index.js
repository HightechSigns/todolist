import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
// import assets
import addNewListImg from "../../assets/images/addnewList.png"
import addLight from "../../assets/images/addLight.svg";
import addDark from "../../assets/images/addDark.svg";
import trashDark from "../../assets/images/trashDark.svg";
import trashLight from "../../assets/images/trashLight.svg";
import { useDispatch, useSelector } from "react-redux";
import ProgressNote from "../ProgressNote";
//import the actions
import { getData, setActiveId } from "../../actions";
import {
  setLocalActiveId,
  updateLocalData,
} from "../../Database/localStorage.js";

export default function ListsSideBar({
  listDelete,
  setListDelete,
  localLoaded,
  setlocalLoaded,
  taskSuccess,
  taskDelete,
  addTask,
  setCurrentListName,
  menuOpen,
  setMenuOpen,
}) {
  const listNameInput = useRef();
  const [add, setAdd] = useState(false);
  const [mbAdd, setMbAdd] = useState(false);
  const [hover, setHover] = useState("");
  const [listNameVal, setListNameVal] = useState("");
  const actID = useSelector((state) => state.actID);
  const toggle = useSelector((state) => state.toggle);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  // handle input change for list name
  const handleChange = (e) => {
    setListNameVal(e.target.value);
  };

  // handle the delete of the list
  const handleDeleteList = (e, id) => {
    console.log("delete id = " + id);
    console.log("active id = " + actID);

    if (e) {
      setListDelete(true);
      data.map((d, i) => {
        if (d.id === id) {
          data.splice(i, 1);
          console.log("deleted List: " + id);
        }
      });
      if (data.length >= 1) {
        let newCurrId = data[0].id;
        setCurrentListName(data[0].name);
        setLocalActiveId(newCurrId);
        dispatch(setActiveId(""));
        dispatch(setActiveId(newCurrId));
        console.log("new current id apparently = " + newCurrId);
      } else {
        console.log("No more lists");
        setLocalActiveId("");
      }
    }
  };
  // handle the creating a name
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: uuidv4(),
      name: listNameVal,
      tasks: [],
    };
    //-----------------------------
    dispatch(getData(obj));
    // console.log("cleared the act id from submit")
    dispatch(setActiveId(obj.id));
    // set the active list id in Local storage
    setLocalActiveId(obj.id);
    setCurrentListName(obj.name);
    // -----------
    setAdd(false);
    setlocalLoaded(true);
    setMenuOpen(false);
    setListNameVal('');
    setMbAdd(false);
  };
  // if user clicks off the iput area for the list, close it
  const clickOff = (e) => {
    if (listNameInput.current.contains(e.target)) {
      return;
    }
    setAdd(false);
  };
  // handles the active list shows little border on the right
  const handleActiveList = (id) => {
    if (id !== actID) {
      dispatch(setActiveId(""));
      dispatch(setActiveId(id));
      setLocalActiveId(id);
      data.map((d) => {
        if (d.id === id) {
          setCurrentListName(d.name);
        }
      });
    } else {
      console.log("List ID is alreaddy active");
    }
  };
  // modal for adding new list
  const AddListModal = () => {
    return (
      <div
        className="add-list-name-modal"
        style={toggle ? { background: "white" } : { background: "#d5dadd" }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="add-name-input"
            spellcheck="true"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="List Name"
            autoFocus
          />
        </form>
        <div
          className={toggle ? "alnm-triangle a-t-tog" : "alnm-triangle a-t-off"}
        ></div>
      </div>
    );
  };
  useEffect(() => {
    console.log("active Id has changed and component has reloaded");
    //click off the input area for adding list name
    document.addEventListener("mousedown", clickOff);
    setListDelete(false);
    // need to check local storage to see if anything has changed
    // if changed then post new data to local storage
    updateLocalData(data);
  }, [actID, listDelete]);
  useEffect(()=>{
      if(mbAdd){
        setMbAdd(false)
      }
  },[menuOpen])
  return (
    <div>
      <div className="sidebar-lists">
        <div className="title-add-cont">
          {add ? AddListModal() : ""}
          <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>
            Lists
          </p>
          <img
            ref={listNameInput}
            onClick={(e) => (add ? setAdd(false) : setAdd(true))}
            src={toggle ? addLight : addDark}
            alt="#"
            style={{ cursor: "pointer" }}
            role="button"
            aria-label="Create a new list..."
          />
        </div>
        <div className="list-names-cont">
          {/* this will be mapped when data gets loaded */}
          {localLoaded && data.length >= 1
            ? data.map((d, i) => (
                <div key={i} className="list-name-outer-cont">
                  <ProgressNote
                    data={d}
                    taskSuccess={taskSuccess}
                    taskDelete={taskDelete}
                    addTask={addTask}
                  />
                  <div
                    data-tagid={d.id}
                    className="list-name"
                    onClick={(e) => handleActiveList(d.id)}
                    onMouseOver={(e) => setHover(d.id)}
                    onMouseLeave={(e) => setHover("")}
                  >
                    {localLoaded && actID === d.id ? (
                      <div
                        className="list-active-bar"
                        style={
                          toggle
                            ? { background: "#20FC8F" }
                            : { background: "#2e4756" }
                        }
                      ></div>
                    ) : (
                      ""
                    )}
                    <p style={{ textTransform: "capitalize" }}>{d.name}</p>
                    {hover === d.id ? (
                      <img
                        src={trashDark}
                        alt="#"
                        onClick={(e) => handleDeleteList(e, d.id)}
                        style={{ cursor: "pointer", width: "15px" }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))
            : ""}
          {/* ---------------------------------------- */}
        </div>
      </div>
      {/* ------------------ Mobile menu ------------------- */}
      <div
        className={menuOpen ? "sbl-mb-overlay-open" : "sbl-mb-overlay-closed"}
        onClick={(e) => setMenuOpen(false)}
      >
        {/* empty */}
      </div>
      <div className={menuOpen ? "sbl-mb-cont-open" : "sbl-mb-cont-closed"}>
        {/* ------------- header for menu ------------- */}
        <div
          className="sbl-mb-header"
          style={menuOpen ? { display: "flex" } : { display: "none" }}
        >
          <div className="sbl-mb-h-add">
            <p style={{ color: "#ffffff50" }}>Lists</p>
            <img
              onClick={(e) => (mbAdd ? setMbAdd(false) : setMbAdd(true))}
              src={addLight}
              alt="#"
              className={mbAdd ? "mb-add-img-true" : "mb-add-img-false"}
              role="button"
              aria-label="Create a new list..."
            />
          </div>
          {mbAdd ? (
            <div className="sbl-input-add-cont">
              <input
                type="text"
                placeholder="New List"
                className="sbl-input"
                spellcheck="true"
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="List Name"
                autoFocus
                value={listNameVal}
              />
              <button className="mobile-add-btn" onClick={(e) => handleSubmit(e)}>Add</button>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* ---------- Lists -------------- */}
        <div
          className="sbl-mb-list-cont"
          style={menuOpen ? { display: "flex" } : { display: "none" }}
        >
          {menuOpen && data.length >= 1
            ? data.map((d, i) => (
                <div
                  className="sbl-list-item"
                  style={{ background: "#243641" }}
                  key={i}
                >
                  <div
                    className="sbl-active"
                    style={
                      actID === d.id
                        ? { background: "#20FC8F" }
                        : { background: "none" }
                    }
                  ></div>
                  <div
                    className="mb-li-selector"
                    onClick={(e) => handleActiveList(d.id)}
                  >
                    <p style={{ color: "white" }}>{d.name}</p>
                  </div>
                  <div
                    className="mb-li-delete-btn"
                    onClick={(e) => handleDeleteList(e, d.id)}
                  >
                    <img src={trashLight} alt="#" />
                  </div>
                </div>
              ))
            : ''}
            {data.length === 0 && !mbAdd?<img className="mb-add-list-img" src={addNewListImg} alt="add list" />:""}
        </div>
      </div>
    </div>
  );
}
