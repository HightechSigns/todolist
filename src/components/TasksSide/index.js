import React, { useState, useEffect } from 'react';
import './style.css';
import trashLight from "../../assets/images/trashLight.svg";
import checkLight from "../../assets/images/checkLight.svg";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";


export default function TasksSide({loaded}) {
    const [taskSuccessID, setTaskSuccessID] = useState('');
    const [loadedTasks, setLoadedTasks] = useState([]);
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
        if (data.length <= 0) {
            console.log("There are no tasks in this list")
        } else{
            data.filter(x => {
                let arr = x.id === actID;
                setLoadedTasks(arr);
                console.log("Loaded tasks into state")
                console.log(loadedTasks)
                console.log("Loaded tasks into state")
            })
        }
    }
    // handle the new task upload  
    const handleSubmit = (e) => {
        e.preventDefault();
        let newArray = [];
        if (loadedTasks.length > 0){
            newArray.push(loadedTasks)
        }
        // console.log("")
        if (e && actID) {
            // create the new task obj
            let taskObj = {
                id: uuidv4(),
                text: taskInput,
                comp: false
            }
            // push the obj into the newArray
            newArray.push(taskObj)
            // db.collection('tasklist').doc({ id: actID }).update({
            //     tasks: newArray
            // })
            setLoadedTasks(newArray)
            setTaskInput('') // resets input
            console.log(data)
        } else {
            console.log('no active list')
        }
    } 

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
    // Use effect
    useEffect(() => {
        getTasks();
    },[loaded, actID])

    return (
        <div className="task-section">
            <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>Tasks</p>
            {!loaded ? IfNoItems() : ''}
            {loaded ?
                <div className="all-tasks-cont">
                    {/* mapped tasks */}
                    {loadedTasks.length >= 1? loadedTasks.map((t, i) => (
                        <div key={i} className="task-cont" style={toggle ? { background: '#2E4756' } : { background: '#495a64' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="custom-checkbox" onClick={e => handleTaskSuccess(e, t.id)} style={taskSuccessID && taskSuccessID === t.id ? { background: "#009FB7" } : { background: '#495a64' }}>
                                    {taskSuccessID && taskSuccessID === t.id ? <img src={checkLight} alt="" /> : ''}
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
                    )):''}
                    {/* mapped tasks */}
                </div>
                : ''}
            {loaded? addTask() : ''}
        </div>
    )
}
