import React, { useState, useEffect } from 'react';
import './style.css';
import trashLight from "../../assets/images/trashLight.svg";
import checkLight from "../../assets/images/checkLight.svg";
import ProgressBar from "../ProgressBar";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateLocalData } from "../../Database/localStorage.js";

export default function TasksSide({ localLoaded, listDelete, taskSuccess,
    setTaskSuccess,
    taskDelete,
    setTaskDelete,
    addTask,
    setAddTask }) {
    const [loadedTasks, setLoadedTasks] = useState([]);
    // const [taskSuccess, setTaskSuccess] = useState(false);
    // const [taskDelete, setTaskDelete] = useState(false);
    const [taskInput, setTaskInput] = useState('');
    //redux
    const actID = useSelector(state => state.actID);
    const toggle = useSelector(state => state.toggle);
    const data = useSelector(state => state.data);
    const dispatch = useDispatch();
    //-----
    // if no items are loaded then this message will show
    const IfNoItems = () => {
        return (
            <div className="no-items-info-cont">
                <p className="no-items">Let's start a new List! Click the Add icon next to "Lists"</p>
            </div>
        )
    }
    //get the data from the activeID
    const getTasks = () => {
        console.log("not connected to DB yet")
    }
    // handle the new task upload  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("seeing if array state will be 'true'")
        console.log(loadedTasks)
        console.log("seeing if array state will be 'true'")
        // create the new task obj
        let taskObj = {
            id: uuidv4(),
            text: taskInput,
            comp: false
        }
        data.map((d, i) => {
            if (d.id === actID) {
                let taskList = d.tasks;
                taskList.push(taskObj)
            }
        })
        // clear the input
        setTaskInput('')
        setAddTask(true)
        // update local storage
        updateLocalData(data)
    }
    //need to handle the task success
    const handleTaskSuccess = (e, id) => {
        if (e) {
            setTaskSuccess(true)
            data.map((d, i) => {
                if (d.id === actID) {
                    d.tasks.map((t, i) => {
                        if (t.id === id) {
                            console.log('setting task to complete!')
                            console.log(t)
                            return t.comp = true
                        }
                    })
                }
            })

        }
    }
    //handle the input for task
    const handleChange = (e) => {
        setTaskInput(e.target.value)
    }
    // add task component
    const addTaskInput = () => (
        <div className="task-input-cont">
            <form onSubmit={e => handleSubmit(e)}>
                <input className="task-input" spellcheck="true" value={taskInput} onChange={e => handleChange(e)} type="text" placeholder="Enter A Task" style={toggle ? {} : { background: '#2e475633' }} />
            </form>
        </div>
    )
    const handleDeleteTask = (e, id) => {
        if (e) {
            setTaskDelete(true)
            data.map((d, i) => {
                if (d.id === actID) {
                    d.tasks.map((t, i) => {
                        if (t.id === id) {
                            d.tasks.splice(i, 1)
                            console.log('deleted Task: ' + id)
                        }
                    })
                }
            })
        }
    }
    // Use effect
    useEffect(() => {
        getTasks();
        setTaskSuccess(false)
        setLoadedTasks([])
        setTaskDelete(false)
        updateLocalData(data)
        setAddTask(false)
        // need to check local storage to see if anything has changed
        // if changed then post new data to local storage

    }, [localLoaded, actID, taskSuccess, taskDelete, listDelete,addTask]);
    return (
        <div className="task-section">
            <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>Tasks</p>
            {localLoaded && data.length !== 0 ? data.map((d, i) => {
                if (d.id === actID) {
                    return (
                        <ProgressBar
                            data={d.tasks}
                            taskSuccess={taskSuccess}
                            listDelete={listDelete}
                            addTask={addTask}
                            taskDelete={taskDelete}
                        />
                    )
                }
            }) : ""}
            {!localLoaded || !actID || data.length === 0 ? IfNoItems() : ''}
            {localLoaded && data.length !== 0 ?
                <div className="all-tasks-cont">
                    {/* mapped tasks */}
                    {data.length >= 1 ? data.map((d, i) => {
                        if (d.id === actID) {
                            // console.log(d)
                            let objTasks = d.tasks;
                            return objTasks.map((t, i) => (
                                <div key={i} data-taskid={t.id} className="task-cont" style={toggle ? { background: '#2E4756' } : { background: '#495a64' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className="custom-checkbox" onClick={e => { !t.comp ? handleTaskSuccess(e, t.id) : console.log('Task Has already been completed!') }} style={t.comp ? { background: "#009FB7", cursor: "default" } : !toggle ? { background: 'lightgray', cursor: "pointer" } : { background: '#495a64', cursor: "pointer" }}>
                                            {t.comp ? <img src={checkLight} alt="" /> : ''}
                                        </div>
                                        <p style={toggle ? { color: 'white' } : { color: 'white' }}><span className="task-span" style={t.comp ? { textDecoration: 'line-through', color: '#ffffff80' } : { textDecoration: 'none' }}>{t.text}</span></p>
                                    </div>
                                    <img

                                        src={trashLight}
                                        alt="#"
                                        onClick={(e) => handleDeleteTask(e, t.id)}
                                        style={{ cursor: "pointer", width: "15px" }}
                                    />
                                </div>
                            ))
                        }
                    }) : ''}
                    {/* mapped tasks */}
                </div>
                : ''}
            {localLoaded && data.length !== 0 ? addTaskInput() : ''}
        </div>
    )
}
