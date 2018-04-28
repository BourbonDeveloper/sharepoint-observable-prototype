import {
    ADD_EVENT_TO_SHAREPOINT,
    GET_FORM_DIGEST_VALUE,
    GET_EVENTS
} from '../constants/actionTypes'

export const addEventToSharePoint = (event, formDigestValue) => ({type: ADD_EVENT_TO_SHAREPOINT, payload: {event: event, formDigestValue: formDigestValue}})
export const getFormDigestValue = () => ({ type: GET_FORM_DIGEST_VALUE});
export const getEvents = () => ({ type: GET_EVENTS})