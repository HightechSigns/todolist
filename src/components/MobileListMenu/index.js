import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import addLight from "../../assets/images/addLight.svg";
import addDark from "../../assets/images/addDark.svg";
import trashLight from "../../assets/images/trashDark.svg";
import { useDispatch, useSelector } from "react-redux";
import ProgressNote from "../ProgressNote";

export default function MobileListMenu({
    listDelete,
    setListDelete,
    localLoaded,
    setlocalLoaded,
    taskSuccess,
    taskDelete,
    addTask,
    setCurrentListName
  }) {

    return (
        <div className="m-menu-list">
            
        </div>
    )
}
