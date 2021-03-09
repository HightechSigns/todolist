import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './style.css';
import addLight from '../../assets/images/addLight.svg'
import addDark from '../../assets/images/addDark.svg'
import trashDark from '../../assets/images/trashDark.svg'
import trashLight from '../../assets/images/trashLight.svg'
//steps
// need to have a post to the indexed db from here to create new list name
// this is where I will get the data back from indexed db and send it into 
// the redux state

export default function ListsSideBar({ toggle }) {
    const [add, setAdd] = useState(false);
    const [hover, setHover] = useState(false);
    // need to get the value for the new list name
    const [listNameVal, setListNameVal] = useState('')

    const handleChange = (e) => {
        setListNameVal(e.target.value);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(listNameVal)
        setAdd(false)
    }
    const handleAddClick = (e) => {
        if (e && !add) {
            setAdd(true);
        } else {
            setAdd(false)
        }
    }
    const AddListModal = () => {
        return (
            <div className="add-list-name-modal">
                <form onSubmit={e => handleSubmit(e)}>
                    <input className="add-name-input" onChange={e=>handleChange(e)} type="text" placeholder="List Name" />
                </form>
                <div className="alnm-triangle"></div>
            </div>
        )
    }
    return (
        <div className="sidebar-lists" style={toggle ? { borderRight: ' 2px solid white' } : { borderRight: ' 2px solid #1f1f1f' }}>
            <div className="title-add-cont">
                {add ? AddListModal() : ""}
                <p style={toggle ? { color: "#ffffff50" } : { color: "#1f1f1f" }}>Lists</p>
                <img onClick={e => handleAddClick(e)} src={toggle ? addLight : addDark} alt="#" style={{ cursor: 'pointer' }} />
            </div>
            <div className="list-names-cont">
                <div className='list-name' onMouseOver={e => setHover(true)} onMouseLeave={e => setHover(false)}>
                    <p>Coding Tasks</p>
                    {hover ? <img src={trashLight} alt="#" style={{ cursor: 'pointer' }} /> : ''}
                </div>
            </div>
        </div>
    )
}
