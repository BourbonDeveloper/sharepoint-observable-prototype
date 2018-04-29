import {
    SET_CALENDARS
} from '../constants/actionTypes'

const DEFAULT_STATE = {
    Calendars: []
}

const setCalendars = (state, action) => {
    const newState = {}
    Object.assign(newState, state, { Calendars: action.Calendars });
    return newState;
}

const calendarReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CALENDARS:
            return setCalendars(state, action);

        default:
            return state;
    }
}

export default calendarReducer