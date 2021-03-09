const loadedData = (state = [], action) => {
    switch (action.type) {
        case "LOAD_DATA":
            state.push(action.payload)
            return state;
        default:
            return state;
    }
}
export default loadedData;