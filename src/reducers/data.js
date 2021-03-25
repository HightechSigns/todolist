const loadedData = (state = [], action) => {
    switch (action.type) {
        case "LOAD_DATA":
            state.push(action.payload)
            console.log('-----from state----')
            console.log(state)
            console.log('-----from state----')
            return state;
        default:
            return state;
    }
}
export default loadedData;