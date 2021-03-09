import React, {useState,useEffect} from 'react';
import "./style.css";

export default function ModeSelector({toggle,
  setToggle}) {
  const handleToggle= (e)=>{
    if(e && !toggle){
      setToggle(true)
      localStorage.setItem("toggle",true)
    } else{
      setToggle(false)
      localStorage.setItem("toggle",false)
    }
  }
  const styles = {
    darkModeToggle:{
      background:'#2E4756'
    },
    lightModeToggle:{
      background:'white'
    },
    buttonStyleDark:{
      background:'#009FB7',
      right: '-2px',
      transition: 'all 250ms ease-in-out'
    },
    buttonStyleLight:{
      background:'#16262E',
      left: '-2px'
    }
  }
  useEffect(() => {
    let togVal = localStorage.getItem('toggle');
    if (togVal === "true") {
        setToggle(true)
    } else {
        setToggle(false)
    }
})
    return (
        <div className="mode-selector-cont">
          <p className="mode-text">{toggle? "Light Mode": 'Dark Mode'}</p>
          <div className="mode-selector" style={toggle? styles.darkModeToggle:styles.lightModeToggle}>
                <div className="mode-button" style={toggle? styles.buttonStyleDark:styles.buttonStyleLight} onClick={e=>handleToggle(e)}></div>
          </div>
        </div>
    )
}
