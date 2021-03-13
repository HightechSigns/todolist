import React, { useEffect,useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from "react-redux";
//import the actions
import { getData} from '../../actions';
// components
import OnOffLineUser from '../../components/OnOffLineUser';
import ListsSideBar from '../../components/ListsSideBar';
import ModeSelector from '../../components/ModeSelector';
import TasksSide from '../../components/TasksSide';
//import DB
import db from '../../Database/DBLoacalBase';



export default function TodoList() {
    const [loaded, setLoaded] = useState(false);
    const toggle = useSelector(state => state.toggle);
    const dispatch = useDispatch();

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
        async function addData() {
            await db.collection('tasklist').get().then(taskLists => {
                console.log("----- Loaded Data from todolist.js inside of state -------")
                console.log(taskLists)
                console.log("----- Loaded Data from todolist.js -------")
                dispatch(getData(taskLists))
            })
            console.log('Data has been added')
            setLoaded(true)
        }
        addData()
        // this is to load last edited task list when opening app
        // let localActiveId = localStorage.getItem("activeList");
    }, [])

    return (
        <div className="todo-main-page" style={toggle ? modeStyles.darkMode : modeStyles.lightMode}>
            <div className="header-main-cont">
                <OnOffLineUser />
                <ModeSelector />
            </div>
            <section className="main-body-cont">
                <ListsSideBar
                db={db}
                loaded={loaded}
                />
                <TasksSide
                db={db}
                />
            </section>
        </div>
    )
}
