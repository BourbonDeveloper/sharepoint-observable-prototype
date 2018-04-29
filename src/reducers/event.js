import {
    SET_EVENTS
} from '../constants/actionTypes'

const DEFAULT_STATE = {
    Events: []
}

const setEvents = (state, action) => {
    const newState = {}
    Object.assign(newState, state, { Events: action.Events });
    return newState;
}

const eventReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case SET_EVENTS:
            return setEvents(state, action);

        default:
            return state;
    }
}

export default eventReducer