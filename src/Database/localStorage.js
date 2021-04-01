import { getData, setActiveId } from "../actions";

// if the local storage comes back with data
// set the state with the data
export const getLocalData = (dispatch, setlocalLoaded) => {
    //set the data
    let localData = JSON.parse(localStorage.getItem('task-data'));
    let localActID = localStorage.getItem('active-List-id');
    let arr = [];
    if (localData !== undefined && localData) {
        localData.map((d,i)=>{
            dispatch(getData(d))
        })
        setlocalLoaded(true)
    } else { localStorage.setItem('task-data', JSON.stringify(arr)) }
    localActID !== undefined && localData ? dispatch(setActiveId(localActID)) : localStorage.setItem('active-List-id', '')
}

// easy function to check active id 
export const setLocalActiveId = (id) => {
    let localId = localStorage.getItem('active-List-id');
    // set the new active ID if changed or when loaded
    //  check if id is already active or not
    if (localId !== id) {
        localStorage.setItem('active-List-id', id);
    } else {
        console.log("Task List is already active")
    }
}

//update the local storage
// do a check to see if the data in state matches the local data
// if the state differs, update the local storage
export const updateLocalData = (stateData) => {
    if (stateData.length >= 1) {
        localStorage.setItem('task-data', JSON.stringify(stateData));
    }
}

// if the user wants to delete thier history 
// clear the local storage for list data and active id
export const deleteLocalData = () => {
    localStorage.removeItem("active-List-id")
    localStorage.removeItem("task-data")
}
