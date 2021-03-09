import React, { useEffect, useState } from 'react';
import './style.css';
// components
import OnOffLineUser from '../../components/OnOffLineUser';
import ListsSideBar from '../../components/ListsSideBar';
import ModeSelector from '../../components/ModeSelector';



export default function TodoList({ db }) {
    const [toggle, setToggle] = useState(false);
    const [activeId, setActiveId] = useState('');
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
    //creating the DB when page loads
    useEffect(() => {
        // create the store
        db.version(1).stores({ lists: '_id,listName,todos' })
        db.open().catch((err) => {
            console.log(err.stack || err)
        })
    }, [db]
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

                <ListsSideBar
                    toggle={toggle}
                    activeId={activeId}
                    setActiveId={setActiveId}
                />

            </section>
        </div>
    )
}
