import React, { useState, useEffect } from 'react';
import './style.css';
import trashLight from "../../assets/images/trashLight.svg";
import checkLight from "../../assets/images/checkLight.svg";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";


export default function TasksSide({ loaded, listDelete }) {
    // const [taskSuccessID, setTaskSuccessID] = useState([]);
    const [loadedTasks, setLoadedTasks] = useState([]);
    const [taskSuccess, setTaskSuccess] = useState(false);
    const [taskDelete, setTaskDelete] = useState(false);
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
        //what this function should do
        // 1 this function should only happen if the user is getting back online.
        // 2 it should pull from the DB to get the tasks and then load them to the state.
        //     data.filter(x => {
        //         let listObj;
        //         x.id === actID ? listObj = x : console.log('didnt find the object');
        //         if (listObj.tasks.length > 0) {
        //             setLoadedTasks([])

        //             let objTaskLists = listObj.tasks
        //             setLoadedTasks(loadedTasks.concat(objTaskLists));
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
        // add it to the loadedTasks state
        // setLoadedTasks(old => [...old, taskObj])
        data.map((d, i) => {
            if (d.id === actID) {
                let taskList = d.tasks;
                taskList.push(taskObj)
            }
        })
        // clear the input
        setTaskInput('')
    }

    //need to handle the task success
    const handleTaskSuccess = (e, id) => {
        if (e) {
            // setTaskSuccessID(old => [...old, id])
            // set the success to true in the object and then in the render it will pull that boolean for completed
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
    const addTask = () => (
        <div className="task-input-cont">
            <form onSubmit={e => handleSubmit(e)}>
                <input className="task-input" value={taskInput} onChange={e => handleChange(e)} type="text" placeholder="Enter A Task" style={toggle ? {} : { background: '#2e475633' }} />
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
    }, [loaded, actID, taskSuccess, taskDelete,listDelete])
    // clear the task state when the user creates or changes the list
    // useEffect(() => {

    // }, [actID])
    // useEffect(() => {

    // }, [taskSuccess])

    return (
        <div className="task-section">
            <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>Tasks</p>
            {!loaded || !actID || data.length === 0 ? IfNoItems() : ''}
            {loaded && data.length !== 0 ?
                <div className="all-tasks-cont">
                    {/* mapped tasks */}
                    {/* {loadedTasks.length >= 1 ? loadedTasks.map((t, i) => (
                        <div key={i} data-taskid={t.id} className="task-cont" style={toggle ? { background: '#2E4756' } : { background: '#495a64' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="custom-checkbox" onClick={e => handleTaskSuccess(e, t.id)} style={taskSuccessID && taskSuccessID === t.id ? { background: "#009FB7" } : { background: '#495a64' }}>
                                    {taskSuccessID && taskSuccessID === t.id ? <img src={checkLight} alt="" /> : ''}
                                </div>
                                <p style={toggle ? { color: 'white' } : { color: 'white' }}><span style={taskSuccessID && taskSuccessID === t.id ? { textDecoration: 'line-through', color: '#ffffff80' } : { textDecoration: 'none' }}>{t.text}</span></p>
                            </div>
                            <img
                                src={trashLight}
                                alt="#"
                                onClick={(e) => handleDeleteTask(e, t.id)}
                                style={{ cursor: "pointer", width: "15px" }}
                            />
                        </div>
                        t.comp?{ cursor: "pointer", width: "15px" }:{ cursor: "default", width: "15px" }
                    )) : ''} */}
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
                                        <p style={toggle ? { color: 'white' } : { color: 'white' }}><span style={t.comp ? { textDecoration: 'line-through', color: '#ffffff80' } : { textDecoration: 'none' }}>{t.text}</span></p>
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
            {loaded && data.length !== 0 ? addTask() : ''}
        </div>
    )
}
