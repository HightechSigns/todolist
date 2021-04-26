import React, { useState, useEffect } from 'react';
import './style.css';

export default function ProgressBar({ data, taskSuccess,
    listDelete,addTask,taskDelete }) {
    const [progressWidth, setProgressWidth] = useState("")
    // need to have the data for the specific list
    console.log(data)
    // need to divide the amount of tasks by the width of the container
    const getWidth = () => {
        let a = data.length;
        // new array to hold completed tasks
        let compArray = []
        data.map((t) => {
            if (t.comp === true || t.comp === "true") {
                compArray.push(t)
            }
        })
        console.log(compArray);
        let b = compArray.length;
        let c = 100;
        let d = Math.floor(c / a);
        let posWidth = d * b;
        if (b <= 0) {
            setProgressWidth('0%');
            console.log(posWidth)
        }else if(a === b){
            setProgressWidth('100%');
        } else {
            console.log(posWidth)
            setProgressWidth(`${posWidth}%`)
        }
        // if (posWidth >= 97 || posWidth <= 110) {
        //     setProgressWidth("100%")
        // }
    }

    // and only show for completed tasks
    // function to set the progress width
    useEffect(() => {
        getWidth()
    }, [data, taskSuccess, listDelete,addTask,taskDelete])
    return (
        <div className="progress-bar-cont" >
            <div className="progress" style={{ width: progressWidth }}>

            </div>
        </div>
    )
}
