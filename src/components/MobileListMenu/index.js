import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import addLight from "../../assets/images/addLight.svg";
import addDark from "../../assets/images/addDark.svg";
import trashLight from "../../assets/images/trashDark.svg";
import { useDispatch, useSelector } from "react-redux";
import ProgressNote from "../ProgressNote";

export default function MobileListMenu({
  listDelete,
  setListDelete,
  localLoaded,
  setlocalLoaded,
  taskSuccess,
  taskDelete,
  addTask,
  setCurrentListName
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClass, setMenuClass] = useState('');
  const menuChange = (e) => {
    if (e) {
      setMenuOpen(true)
    }
    if (menuOpen) {
      setMenuOpen(false)
    }
  }

  return (
    <div className="m-menu-list">
      {/* need to make this a sepparate component */}
      {/* then move to main taskapp component */}
      <div className='menu-icon' onClick={e => menuChange(e)}>
        <div className={menuOpen ? "icon-cont-open" : 'icon-cont'} >
          <div className={menuOpen ? "m-icon-o-one m-icon-item" : 'm-icon-item m-ii-one '} ></div>
          <div className={menuOpen ? "m-icon-o-two m-icon-item" : 'm-icon-item m-ii-two'} ></div>
          <div className={menuOpen ? "m-icon-o-three m-icon-item" : 'm-icon-item m-ii-three'} ></div>
        </div>
      </div>
      {/* need to make this a sepparate component  */}
      {/* then move to main sidebar component since logic is already there for list names*/}
      <div className={menuOpen ? "menu-items-cont" : "menu-closed"} >
        <h4>Menu Items</h4>
        <div className="menu-list-name">
          List name
        </div>
        <div className="menu-list-name">
          List name
        </div>
        <div className="menu-list-name">
          List name
        </div>
      </div>
    </div>
  )
}
