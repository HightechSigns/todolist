import React, { useState, useEffect } from 'react'
import './style.css';
export default function ProgressNote({ data,taskSuccess,
    taskDelete }) {
    const [percentage, setPercentage] = useState('');
    // const [listComp, setListComp] = useState(false)

    const getPrecentage = () => {
        let a = data.tasks.length;
        // new array to hold completed tasks
        let compArray = []
        data.tasks.map((t) => {
            if (t.comp === true) {
                compArray.push(t)
            }
        })
        console.log(compArray)
        let b = compArray.length;
        let c = 100;
        let d = Math.floor(c / a);
        let posWidth = d * b;
        posWidth = Math.round(10 * posWidth) / 10;
        if (a <= 0) {
            setPercentage("0%")
        }
        else if (a === b) {
            setPercentage("100%")
            // setListComp(true)
        }
        else {
            setPercentage(`${posWidth}%`)
        }
    }


    useEffect(() => {
        getPrecentage()
    }, [taskSuccess,
        taskDelete])
    return (
        <div className="progress-note" style={percentage === "100%"? {color:'#00a0b8'}:{color:"", opacity:"50%"}}>
            {percentage} Complete
        </div>
    )
}
