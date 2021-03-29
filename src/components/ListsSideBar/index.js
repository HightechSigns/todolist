import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import addLight from "../../assets/images/addLight.svg";
import addDark from "../../assets/images/addDark.svg";
import trashLight from "../../assets/images/trashLight.svg";
import { useDispatch, useSelector } from "react-redux";
//import the actions
import { getData, setActiveId } from "../../actions";

export default function ListsSideBar({ loaded, setLoaded, listDelete,
  setListDelete }) {
  const [add, setAdd] = useState(false);
  const [hover, setHover] = useState(false);
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
    console.log("Deleting this List ID");
    console.log(id);
    console.log("Deleting this List ID");
    if (e) {
      setListDelete(true)
      data.map((d, i) => {
        if (d.id === id) {
          data.splice(i, 1)
          console.log('deleted List: ' + id)
        }
      })
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
    dispatch(getData(obj))
    // console.log("cleared the act id from submit")
    dispatch(setActiveId(obj.id));
    // set the active list id in storage
    // localStorage.setItem('active-List-id', obj.id)
    // ------------

    setLoaded(true)
    setAdd(false);
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
    if (id !== actID) {
      dispatch(setActiveId(""))
      dispatch(setActiveId(id))
      // localStorage.setItem('active-List-id', id)
    } else {
      console.log("List ID is alreaddy active")
    }
  };
  // modal for adding new list
  const AddListModal = () => {
    return (
      <div className="add-list-name-modal">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="add-name-input"
            spellcheck="true"
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
    console.log("active Id has changed and component has reloaded")
    setListDelete(false)
    // need to check local storage to see if anything has changed
    // if changed then post new data to local storage
    if (data.length >= 1) {
      // localStorage.setItem('task-data', JSON.stringify(data))
      // so now if the data changes the local storage data gets updated
    }
  }, [actID, listDelete])
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
        {loaded && data.length >= 1 ? data.map((d, i) => (
          <div
            key={i}
            data-tagid={d.id}
            className="list-name"
            onClick={(e) => handleActiveList(d.id)}
            onMouseOver={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
          >
            {loaded && actID === d.id ? <div className="list-active-bar" style={toggle ? { background: '#20FC8F' } : { background: '#2e4756' }}></div> : ''}
            <p style={{ textTransform: 'capitalize' }}>{d.name}</p>
            {hover ? (
              <img
                src={trashLight}
                alt="#"
                onClick={(e) => handleDeleteList(e, d.id)}
                style={{ cursor: "pointer", width: "15px" }}
              />
            ) : (
              ""
            )}
          </div>
        ))
          : ""}
        {/* ---------------------------------------- */}
      </div>
    </div>
  );
}
