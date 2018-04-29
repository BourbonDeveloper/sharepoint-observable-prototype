import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ajax } from 'rxjs/observable/dom/ajax';
import {
    GET_CALENDARS,
    SET_CALENDARS
} from '../constants/actionTypes'

const headers = { 
    'Accept': 'application/json; odata=verbose',
    'Content-Type': 'application/json; odata=verbose'
}

var getListItemType = (name) => {
    return 'SP.Data.' + name[0].toUpperCase() + name.substring(1) + 'ListItem'
}

export const getCalendarsEpic = action$ =>
    action$.ofType(GET_CALENDARS)
      .mergeMap(action =>
          ajax({
              url: `http://localhost:8080/sites/SharePointObservablePrototype/_api/web/lists/getbytitle('Calendars')/items/?$top=100`,
              method: 'GET',
              headers
            })
            .map(function(ajaxResponse)
            {
                var sharepointCalendars = ajaxResponse.response.d.results;
                return sharepointCalendars;
            })
            .map(result => ({ type: SET_CALENDARS, Calendars: result })
    ))





