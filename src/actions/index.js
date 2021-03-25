export const getData = (a) => {
    return {
        type: "LOAD_DATA",
        payload: a
    };
};
export const setActiveId = (a) => {
    return {
        type: 'SET_ID',
        payload: a
    }
}
export const onToggle = (a) => {
    console.log('onToggle hit!')
    return {
        type: 'TOGGLE_ON',
        payload: a
    }
}
export const offToggle = (a) => {
    console.log('offToggle hit!')
    return {
        type: 'TOGGLE_OFF',
        payload: a
    }
}