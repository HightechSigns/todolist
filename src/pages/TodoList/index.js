import React, { useEffect, useState } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
// components
import OnOffLineUser from '../../components/OnOffLineUser';
import ListsSideBar from '../../components/ListsSideBar';
import ModeSelector from '../../components/ModeSelector';



export default function TodoList({ db }) {
    const [toggle, setToggle] = useState(false);
    const modeStyles = {
        darkMode: {
            background: '#16262E',
            color: 'white'
        },
        lightMode: {
            background: 'White',
            color: '#16262E',
            transition: 'all 250ms ease-out'
        }
    }
    const [listValues, setListValues] = useState(
        {
            _id: '',
            listName: '',
            todos: []
        })
    //creating the DB when page loads
    useEffect(
        () => {
            // create the store
            db.version(1).stores({ formData: 'id,value' })
        },
        // run effect whenever the database connection changes
        [db]
    )

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

                <ListsSideBar />
            </section>
        </div>
    )
}
