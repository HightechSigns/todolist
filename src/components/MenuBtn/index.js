import React from 'react';
import './style.css';
export default function MenuBtn({menuOpen,setMenuOpen}) {
    const menuChange = (e) => {
        if (e) {
          setMenuOpen(true)
        }
        if (menuOpen) {
          setMenuOpen(false)
        }
      }
    return (
        <div className='menu-icon' onClick={e => menuChange(e)} style={!menuOpen? {boxShadow:" 0 6px 13px rgba(0, 0, 0, 0.301)"}:{boxShadow:'none'}}>
        <div className={menuOpen ? "icon-cont-open" : 'icon-cont'} >
          <div className={menuOpen ? "m-icon-o-one m-icon-item" : 'm-icon-item m-ii-one '} ></div>
          <div className={menuOpen ? "m-icon-o-two m-icon-item" : 'm-icon-item m-ii-two'} ></div>
          <div className={menuOpen ? "m-icon-o-three m-icon-item" : 'm-icon-item m-ii-three'} ></div>
        </div>
      </div>
    )
}
