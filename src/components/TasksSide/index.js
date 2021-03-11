import React, { useState, useEffect } from 'react';
import './style.css';
import trashLight from "../../assets/images/trashLight.svg";
import checkLight from "../../assets/images/checkLight.svg";
import { v4 as uuidv4 } from "uuid";

export default function TasksSide({ toggle, db, taskData, activeId }) {
    const [taskSuccessID, setTaskSuccessID] = useState('');
    const [loadedTasks, setLoadedTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    const IfNoItems = () => {
        return (
            <div className="no-items-info-cont">
                <p className="no-items">Let's start a new List! Click the Add icon next to "Lists"</p>
            </div>
        )
    }
    //get the data from the activeID
    const getTasks = () => {
        if (db || activeId !== undefined) {
            db.collection('tasklist').doc({ id: activeId }).get().then(t => {
                setLoadedTasks(t)
            })
        } else {
            console.log('click a list name')
        }
    }
    // handle the new task upload
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('posted')
        if (e && activeId) {
            let taskObj = {
                id: uuidv4(),
                text: taskInput,
                comp: false
            }
            db.collection('tasklist').doc({ id: activeId }).update({
                tasks: taskObj
            })
            loadedTasks.push(taskObj)
            // console.log(taskObj)
            setTaskInput('')
        } else {
            console.log('no active list')
        }
    }

    //need a component to load data and show it. 

    //need to handle the task success
    const handleTaskSuccess = (e, id) => {
        if (e) {
            setTaskSuccessID(id)
        }
    }
    //handle the input for task
    const handleChange = (e) => {
        setTaskInput(e.target.value)
    }
    
    // add task component
    const addTask = () => (
        <div className="task-input-cont">
            <form onSubmit={e => handleSubmit(e)}>
                <input className="task-input" value={taskInput} onChange={e => handleChange(e)} type="text" placeholder="Enter A Task" style={toggle ? {} : { background: '#2e475633' }} />
            </form>
        </div>
    )
    //Use effect
    useEffect(() => {
        // getTasks()
    }, [loadedTasks])

    return (
        <div className="task-section">
            <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>Tasks</p>
            {taskData && taskData.length === 0 ? IfNoItems() : ''}
            {taskData && taskData.length !== 0 ?
                <div className="all-tasks-cont">
                    {/* mapped tasks */}
                    {loadedTasks && loadedTasks.length <= 1 ? loadedTasks.map((t, i) => (
                        <div key={i} className="task-cont" style={toggle ? { background: '#2E4756' } : { background: '#495a64' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="custom-checkbox" onClick={e => handleTaskSuccess(e, t.id)} style={taskSuccessID && taskSuccessID === t.id ? { background: "#009FB7" } : { background: '#495a64' }}>
                                    {taskSuccessID && taskSuccessID === t.id? <img src={checkLight} alt="" /> : ''}
                                </div>
                                <p style={toggle ? { color: 'white' } : { color: 'white' }}><span style={taskSuccessID && taskSuccessID === t.id ? { textDecoration: 'line-through', color: '#ffffff80' } : { textDecoration: 'none' }}>{t.text}</span></p>
                            </div>
                            <img
                                src={trashLight}
                                alt="#"
                                // onClick={(e) => handleDeleteList(d.id)}
                                style={{ cursor: "pointer", width: "15px" }}
                            />
                        </div>
                    )) : ''}
                    {/* mapped tasks */}
                </div>
                : ''}
            {taskData && taskData.length !== 0 ? addTask() : ''}
        </div>
    )
}
