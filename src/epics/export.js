import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/forkJoin'
import { ajax } from 'rxjs/observable/dom/ajax';
import { from, Observable } from 'rxjs'

import {
    GET_DATA_FOR_EXPORT_FROM_SHAREPOINT,
    CREATE_FILE_READER_FROM_EXPORT_DATA_BLOB,
    POST_FORMATTED_EXPORT_DATA_FROM_FILE_READER
} from '../constants/actionTypes'

const headers = { 
    'Accept': 'application/json; odata=verbose',
    'Content-Type': 'application/json; odata=verbose'
}

const getFileBuffer = blob => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            resolve(e.target.result);
        }
        reader.onerror = function(e) {
            reject(e);
        }       
        reader.readAsArrayBuffer(blob);        
    })
}

export const getExportDataEpic = action$ =>
    action$.ofType(GET_DATA_FOR_EXPORT_FROM_SHAREPOINT)
    .mergeMap(() =>
        Observable.forkJoin(
            ajax({
                url: 'http://localhost:8080/_api/contextinfo/',
                method: 'POST',
                headers
            }),
            ajax({
                url: `http://localhost:8080/sites/SharePointObservablePrototype/_api/web/lists/getbytitle('Calendars')/items/?$top=10000`,
                method: 'GET',
                headers
              }),
            ajax({
                url: `http://localhost:8080/sites/SharePointObservablePrototype/_api/web/lists/getbytitle('Events')/items/?$top=10000`,
                method: 'GET',
                headers
            })        
        )
        .map(results => {
            console.log('calendars and events', results)

            //eventually format the results into something i can pass to sharepoint via REST
            var obj = {"name":"John", "age":30, "city":"New York"}
            var json_string = JSON.stringify(obj);
            var blob = new Blob([json_string], {type: 'text/plain'});

            var exportData = {
                'requestDigest': results[0].response.d.GetContextWebInformation.FormDigestValue,
                'blob': blob
            }
            console.log('exportData 1', exportData)

            return exportData;
        })
        .map(results => ({type:'CREATE_FILE_READER_FROM_EXPORT_DATA_BLOB', exportData: results}))
    )

    export const getFileBufferEpic = action$ =>
       action$.ofType(CREATE_FILE_READER_FROM_EXPORT_DATA_BLOB)
       .mergeMap(action =>
        from(getFileBuffer(action.exportData.blob))
          .map(results => {
              var exportData = {
                  'ArrayBuffer': results,
                  'requestDigest': action.exportData.requestDigest
              }
              return exportData;
          })
          .do(results => console.log('getBuffer results', results))
          .map(results => ({type:'POST_FORMATTED_EXPORT_DATA_FROM_FILE_READER', exportData: results}))
    )

    const serverUrl = "Exports";
    const serverRelativeUrlToFolder = "/sites/SharePointObservablePrototype/Documents/Exports";
    const fileName = "test.txt";
    const hostWebUrl = "http://localhost:8080/sites/SharePointObservablePrototype/"

    export const exportDataReceivedEpic = action$ =>
        action$.ofType(POST_FORMATTED_EXPORT_DATA_FROM_FILE_READER)
        .do(results => console.log('in exportData results', results))
        .mergeMap(action =>   
                ajax({        
                    url: "http://localhost:8080/sites/SharePointObservablePrototype/_api/web/getfolderbyserverrelativeurl('Exports')/files/add(url='" + fileName + "', overwrite=true)",
                    method: "POST",
                    body: JSON.stringify({"name":"John", "age":30, "city":"New York"}),
                    headers: {
                       "accept": "application/json;odata=verbose",
                       "X-RequestDigest": action.exportData.requestDigest
                    }            
                })                    
            .do(results => {
                console.log('results from post', results)
                console.log('action?', action);
            })
            .map(result => ({type:''})) //browser gets mad if i don't put this here - complains about plain old objects somethin' somethin'
        )


      
