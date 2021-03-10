import React, { useState,useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import addLight from "../../assets/images/addLight.svg";
import addDark from "../../assets/images/addDark.svg";
import trashLight from "../../assets/images/trashLight.svg";



export default function ListsSideBar({ toggle, activeId, setActiveId, db, taskData }) {
  const [add, setAdd] = useState(false);
  const [hover, setHover] = useState(false);
  // need to get the value for the new list name
  const [listNameVal, setListNameVal] = useState("");


  // handle input change for list name
  const handleChange = (e) => {
    setListNameVal(e.target.value);
  };
  // handle the delete of the list
  const handleDeleteList = (id) => {
    console.log(id);
    db.collection('tasklist').doc({ id: id }).delete()
    window.location.reload(false);
  };
  // handle the creating a name
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: uuidv4(),
      name: listNameVal,
      tasks: []
    }
    db.collection('tasklist').add(obj)
    // setActiveId(obj.id)
    localStorage.setItem("activeList", obj.id)
    setAdd(false);
    window.location.reload(false);
  };
  // handle the click for adding a name. pops up the modal
  const handleAddClick = (e) => {
    if (e && !add) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  };
  // handles the active list shows little border on the right
  const handleActiveList = (id) => {
    localStorage.setItem("activeList", id)
    setActiveId(id);
  };

  // modal for adding new list
  const AddListModal = () => {
    return (
      <div className="add-list-name-modal">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="add-name-input"
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="List Name"
          />
        </form>
        <div className="alnm-triangle"></div>
      </div>
    );
  };

useEffect(() => {
  let activeId= localStorage.getItem("activeList")
  setActiveId(activeId)
}, [taskData])


  return (
    <div
      className="sidebar-lists"
      style={
        toggle
          ? { borderRight: " 2px solid white" }
          : { borderRight: " 2px solid #1f1f1f" }
      }
    >
      <div className="title-add-cont">
        {add ? AddListModal() : ""}
        <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>
          Lists
        </p>
        <img
          onClick={(e) => handleAddClick(e)}
          src={toggle ? addLight : addDark}
          alt="#"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="list-names-cont">
        {/* this will be mapped when data gets loaded */}
        {taskData ? taskData.map((d, i) => (
          <div
            key={i}
            className="list-name"
            onClick={(e) => handleActiveList(d.id)}
            onMouseOver={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
            style={
              activeId === d.id && toggle
                ? { borderRight: "2px inset #20FC8F" }
                : activeId === d.id && !toggle
                  ? {
                    borderRight: "3px inset #2e4756",
                    paddingRight: "10px",
                  }
                  : { border: "none" }
            }
          >
            <p>{d.name}</p>
            {hover ? (
              <img
                src={trashLight}
                alt="#"
                onClick={(e) => handleDeleteList(d.id)}
                style={{ cursor: "pointer", width: "15px" }}
              />
            ) : (
              ""
            )}
          </div>
        )) : ""}
        {/* ---------------------------------------- */}
      </div>
    </div>
  );
}
