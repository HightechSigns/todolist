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
    return {
        type: 'ON-TOGGLE',
        payload: a
    }
}
export const offToggle = (a) => {
    return {
        type: 'OFF-TOGGLE',
        payload: a
    }
}