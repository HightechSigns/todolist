import { getData } from "../actions";

// need to set up local storage for the first time app is open
export const setupData = (data, actID) => {
    if (data.length <= 0 && actID === '') {
        // console.log('setting up local storage for the first time')
        localStorage.setItem('task-data', JSON.stringify(data));
        localStorage.setItem('active-List-id', '');
    }
    // return true
}

// if the local storage comes back with data
// set the state with the data
export const getLocalData = (setData) => {
    //set the data
    let localData = JSON.parse(localStorage.getItem('task-data'))
    if(localData.length <= 0 ){
        console.log("nothing to load")
    }else{
        console.log("Found some data")
        setData(getData(localData))
    }
}

// easy function to check active id 
export const setLocalActiveId = (id) => {

    // set the new active ID if changed or when loaded
    //  check if id is already active or not
    console.log("updating local storage Active Id")
}

//update the local storage
// do a check to see if the data in state matches the local data
// if the state differs, update the local storage
export const updateLocalData = (data, setData) => {
    console.log("updating local storage Data")
}

// if the user wants to delete thier history 
// clear the local storage for list data and active id
export const deleteLocalData = () => {
    localStorage.removeItem("active-List-id")
    localStorage.removeItem("task-data")
}
