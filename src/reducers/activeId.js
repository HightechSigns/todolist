const activeId = (state = '', action) => {
    switch (action.type) {
        case 'SET_ID':
            return state + action.payload
        default:
            return state;
    }
}
export default activeId;