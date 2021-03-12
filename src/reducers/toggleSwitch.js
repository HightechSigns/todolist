const toggleSwitch = (state = false, action) => {
    switch (action.type) {
        case "TOGGLE_ON":
            return !state
        case "TOGGLE_OFF":
            return action.payload
        default:
            return state;
    }
}
export default toggleSwitch;