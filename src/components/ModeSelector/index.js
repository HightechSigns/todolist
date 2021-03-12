import React, { useEffect } from 'react';
import "./style.css";
//import the actions
import { onToggle, offToggle } from '../../actions';
import { useDispatch, useSelector } from "react-redux";

export default function ModeSelector() {

  const dispatch = useDispatch();
  //get redux state
  const toggle = useSelector(state => state.toggle);

  const handleToggle = (e) => {
    if (e && !toggle) {
      dispatch(onToggle(true))
      localStorage.setItem("toggle", true)
    } else {
      dispatch(offToggle(false))
      localStorage.setItem("toggle", false)
    }
  }
  const styles = {
    darkModeToggle: {
      background: '#2E4756'
    },
    lightModeToggle: {
      background: 'white'
    },
    buttonStyleDark: {
      background: '#009FB7',
      right: '-2px',
      transition: 'all 250ms ease-in-out'
    },
    buttonStyleLight: {
      background: '#16262E',
      left: '-2px'
    }
  }
  useEffect(() => {
    let togVal = localStorage.getItem('toggle');
    if (togVal === "true") {
      // setToggle(true)
      dispatch(onToggle(true))
    } else {
      // setToggle(false)
      dispatch(offToggle(false))
    }
  })
  return (
    <div className="mode-selector-cont">
      <p className="mode-text">{toggle ? "Light Mode" : 'Dark Mode'}</p>
      <div className="mode-selector" style={toggle ? styles.darkModeToggle : styles.lightModeToggle}>
        <div className="mode-button" style={toggle ? styles.buttonStyleDark : styles.buttonStyleLight} onClick={e => handleToggle(e)}></div>
      </div>
    </div>
  )
}
