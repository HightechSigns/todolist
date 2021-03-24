import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import addLight from "../../assets/images/addLight.svg";
import addDark from "../../assets/images/addDark.svg";
import trashLight from "../../assets/images/trashLight.svg";
import { useDispatch, useSelector } from "react-redux";
//import the actions
import { getData, setActiveId } from "../../actions";

export default function ListsSideBar({ loaded, setLoaded }) {
  const [add, setAdd] = useState(false);
  const [hover, setHover] = useState(false);
  // need to get the value for the new list name
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
  const handleDeleteList = (id) => {
    console.log("Deleting this id");
    console.log(id);
    console.log("Deleting this id");
    // delete from DB
    // db.collection("tasklist").doc({ id: id }).delete();
    // delete from current state
    // var lists = data.filter((x) => {
    //   return x.id !== id;
    // });
    // dispatch(getData(lists));
  };
  // handle the creating a name
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      id: uuidv4(),
      name: listNameVal,
      tasks: [],
    };
    // db.collection('tasklist').add(obj)
    //-----------------------------
    // db.collection("tasklist")
    //   .add(obj)
    //   .then((response) => {
    //     console.log("-------- Posted new List Name! --------");
    //     console.log(response);
    //     console.log("-------- Posted new List Name! --------");
    //   })
    //   .catch((error) => {
    //     console.log("There was an error Posting The New List");
    //   });
    //-----------------------------
    dispatch(getData(obj))
    // setting the new active id when submit new list name
    // dispatch(setActiveId(''));
    console.log("cleared the act id from submit")
    dispatch(setActiveId(obj.id));
    console.log("created new act id from submit")
    // ------------
    console.log("---- Set active Id from Submit and set Loaded")
    console.log(obj.id)
    console.log("---- Set active Id from Submit and set Loaded")
    setLoaded(true)
    // console.log(data)
    //-----------------------------
    //-----------------------------
    // this sets the active id to the new list that was just created
    // localStorage.setItem("activeList", obj.id);
    setAdd(false);
    // window.location.reload(false);
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
    if (id != actID) {
      dispatch(setActiveId(""))
      dispatch(setActiveId(id))
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
  }, [actID])

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
            data-tagID={d.id}
            className="list-name"
            onClick={(e) => handleActiveList(d.id)}
            onMouseOver={(e) => setHover(true)}
            onMouseLeave={(e) => setHover(false)}
          >
            {loaded && actID === d.id ? <div className="list-active-bar" style={toggle ? { background: '#20FC8F' } : { background: '#2e4756' }}></div> : ''}
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
        ))
          : ""}
        {/* ---------------------------------------- */}
      </div>
    </div>
  );
}
