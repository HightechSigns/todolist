import React, { useEffect, useState } from 'react';
import './style.css';
// components
import OnOffLineUser from '../../components/OnOffLineUser';
import ListsSideBar from '../../components/ListsSideBar';
import ModeSelector from '../../components/ModeSelector';
import TasksSide from '../../components/TasksSide';
//import DB
import db from '../../Database/DBLoacalBase';


export default function TodoList() {
    const [toggle, setToggle] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [taskData, settaskData] = useState([]);
    

    const modeStyles = {
        darkMode: {
            background: '#1f1f1f',
            color: 'white'
        },
        lightMode: {
            background: 'White',
            color: '#1f1f1f',
            transition: 'all 300ms ease-out'
        }
    }
 
    //getting items from DB when page loads
    useEffect(() => {
        if(db){
            db.collection('tasklist').get().then(tasklists => {
                console.log(tasklists)
                settaskData(tasklists)
              })
        } else{
            console.log('No DB')
        }
       }, [])

    return (
        <div className="todo-main-page" style={toggle ? modeStyles.darkMode : modeStyles.lightMode}>
            <div className="header-main-cont">
                <OnOffLineUser
                    toggle={toggle}
                />
                <ModeSelector
                    toggle={toggle}
                    setToggle={setToggle}
                />
            </div>
            <section className="main-body-cont">
                <ListsSideBar
                    toggle={toggle}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    db={db}
                    taskData={taskData}
                />
                <TasksSide
                toggle={toggle}
                db={db}
                taskData={taskData}
                activeId={activeId}
                />
            </section>
        </div>
    )
}
