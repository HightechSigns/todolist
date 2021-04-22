import React, {useState, useEffect} from 'react';
import './style.css';

export default function ProgressBar({ data }) {
    const [progressWidth,setProgressWidth] = useState("")
    // need to have the data for the specific list
    console.log(data.tasks)
    // need to divide the amount of tasks by the width of the container
    const getWidth=()=>{
        let a = data.tasks.length;
        // new array to hold completed tasks
        let compArray = []
        data.tasks.map((t)=>{
            if(t.comp === true){
                compArray.push(t)
            }
        })
        console.log(compArray)
        let b = compArray.length;
        let c = 100;
        let d = Math.floor(c / a);
        let posWidth = d * b;
         setProgressWidth(`${posWidth}%`)
    }
    // and only show for completed tasks
    // function to set the progress width
    useEffect(() => {
       getWidth()
    }, [])
    return (
        <div className="progress-bar-cont" style={{width:progressWidth}}>

        </div>
    )
}
