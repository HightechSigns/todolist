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
  const menuChange = (e)=>{
    if(e){
      setMenuOpen(true)
    }  
    if (menuOpen){
      setMenuOpen(false)
    }
  }
  const menuStyles = {
    one:{
      transform:'rotate(45deg)',
      width:"30px",
      margin:'auto'
    },
    two:{
      display:'none',
    },
    three:{
      transform:'rotate(-45deg)',
      width:"30px",
      margin:'auto'
    }
  }
  return (
    <div className="m-menu-list">
      <div className='menu-icon' onClick={e => menuChange(e)}>
        <div className='icon-cont'>
          <div id='m-i-one' className='m-icon-item ' style={menuOpen? menuStyles.one:{display:"block"} }></div>
          <div id='m-i-two' className='m-icon-item' style={menuOpen? menuStyles.two:{display:"block"} }></div>
          <div id='m-i-three' className='m-icon-item' style={menuOpen? menuStyles.three:{display:"block"} }></div>
        </div>
      </div>

      <div className={menuOpen? "menu-items-cont": "menu-closed"} >

      </div>
    </div>
  )
}
