import React from 'react'
import "./style.css"
export default function Overlay({toggle,overlayOpen,children}) {
    return (
        <div className={overlayOpen? "td-main-overlay td-m-o-open":'td-main-overlay'} style={toggle?{backgroundColor:'rgba(0, 0, 0, 0.75)'}:{backgroundColor:'rgba(255, 255, 255, 0.75)'}} >
          {children}
        </div>
    )
}
