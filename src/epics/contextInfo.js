import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ajax } from 'rxjs/observable/dom/ajax';
import {
    GET_FORM_DIGEST_VALUE,
    SET_FORM_DIGEST_VALUE,
} from '../constants/actionTypes'

const headers = { 
    'Accept': 'application/json; odata=verbose',
    'Content-Type': 'application/json; odata=verbose'
}

export const contextInfoEpic = action$ =>
  action$.ofType(GET_FORM_DIGEST_VALUE)
    .mergeMap(action =>
        ajax({
            url: 'http://localhost:8080/_api/contextinfo/',
            method: 'POST',
            headers
          })
          .map(result => ({ type: SET_FORM_DIGEST_VALUE, FormDigestValue: result.response.d.GetContextWebInformation.FormDigestValue})
    ))





