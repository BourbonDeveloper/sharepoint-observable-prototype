import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ajax } from 'rxjs/observable/dom/ajax';
import {
    ADD_EVENT_TO_SHAREPOINT,
    GET_EVENTS,
    SET_EVENTS
} from '../constants/actionTypes'

const headers = { 
    'Accept': 'application/json; odata=verbose',
    'Content-Type': 'application/json; odata=verbose'
}

//TODO: pass the FormDigestValue
//TODO: pass the Event that is being added

var getListItemType = (name) => {
    return 'SP.Data.' + name[0].toUpperCase() + name.substring(1) + 'ListItem'
}

export const addEventToSharePointEpic = action$ =>
    action$.ofType(ADD_EVENT_TO_SHAREPOINT)
      .mergeMap(action =>
          ajax({
              url: `http://localhost:8080/sites/SharePointObservablePrototype/_api/web/lists/getbytitle('Events')/items`,
              method: 'POST',
              headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'X-RequestDigest': action.payload.formDigestValue
              },
              body: JSON.stringify({
                  '__metadata': {'type': getListItemType('Events')},
                  'Title': action.payload.event.Title,
                  'StartDate': action.payload.event.StartDate
              })
            })
            .map(result => ({ type: GET_EVENTS })
    ))

export const getEventsEpic = action$ =>
    action$.ofType(GET_EVENTS)
      .mergeMap(action =>
          ajax({
              url: `http://localhost:8080/sites/SharePointObservablePrototype/_api/web/lists/getbytitle('Events')/items/?$top=100`,
              method: 'GET',
              headers
            })
            .map(function(ajaxResponse)
            {
                var sharepointevents = ajaxResponse.response.d.results;
                return sharepointevents;
            })
            .map(result => ({ type: SET_EVENTS, Events: result })
    ))





