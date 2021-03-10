import React, { useState,useEffect } from 'react';
import './style.css';
import trashLight from "../../assets/images/trashLight.svg";
export default function TasksSide({ toggle, db, taskData,activeId }) {
    // const [taskData,setTaskData]= useState('');

    const IfNoItems = () => {
        return (
            <div className="no-items-info-cont">
                <p className="no-items">Let's start a new List! Click the Add icon next to "Lists"</p>
            </div>
        )
    }
    //get the data from the activeID
    const getTasks = ()=>{
        if(activeId != undefined){
            db.collection('tasklist').doc({id:activeId}).get().then(tasks=>{
                console.log(tasks)
            })
        } else{
            console.log('click a list name')
        }
    }
    // handle the new task upload
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('posted')
    }
    const addTask = () => (
        <div className="task-input-cont">
            <form onSubmit={e => handleSubmit(e)}>
                <input className="task-input" type="text" placeholder="Enter A Task" />
            </form>
        </div>
    )
    //need a component to load data and show it. 

    // have the last selected list name saved to local storage so when the user opens program back up
    // it will automatically load a list
        // useEffect(() => {
        //     getTasks()
        // }, [activeId])
    return (
        <div className="task-section">
            <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>Tasks</p>
            {taskData.length === 0 ? IfNoItems() : ''}
            {taskData.length != 0 ?
                <div className="all-tasks-cont">
                    {/* mapped tasks */}
                    <div className="task-cont">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" style={{ marginRight: '15px', cursor: 'pointer' }} />
                            <p>Task Name</p>
                        </div>
                        <img
                            src={trashLight}
                            alt="#"
                            // onClick={(e) => handleDeleteList(d.id)}
                            style={{ cursor: "pointer", width: "15px" }}
                        />
                    </div>
                    {/* mapped tasks */}
                </div>
            :''}
            {taskData.length != 0? addTask():''}
        </div>
    )
}
