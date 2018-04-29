import {
    ADD_EVENT_TO_SHAREPOINT,
    GET_EVENTS
} from '../constants/actionTypes'

export const addEventToSharePoint = (event, formDigestValue) => ({type: ADD_EVENT_TO_SHAREPOINT, payload: {event: event, formDigestValue: formDigestValue}})
export const getEvents = () => ({ type: GET_EVENTS})