import React, { useEffect, useState } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
// components
import OnOffLineUser from '../../components/OnOffLineUser';
import ListsSideBar from '../../components/ListsSideBar';
import ModeSelector from '../../components/ModeSelector';



export default function TodoList({ db }) {
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
        <div className="todo-main-page">
            <div className="header">
                <OnOffLineUser />
                <ModeSelector />
            </div>
            <section className="main-body-cont">

                <ListsSideBar />
            </section>
        </div>
    )
}
