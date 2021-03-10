import React from 'react';
import './style.css';

export default function TasksSide({toggle}) {

    const IfNoItems=()=>{
        return(
            <div className="">

            </div>
        )
    }


    return (
        <div className="task-section">
            <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>Tasks</p>
        </div>
    )
}
