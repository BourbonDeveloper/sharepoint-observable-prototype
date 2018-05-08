
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { getCalendarsEpic } from './epics/calendar'
import { getContextInfoEpic } from './epics/sharepoint';
import { addEventToSharePointEpic, getEventsEpic } from './epics/event';
import { exportDataReceivedEpic, getExportDataEpic, getFileBufferEpic }  from './epics/export'

import calendarReducer from './reducers/calendar';
import eventReducer from './reducers/event';
import sharepointReducer from './reducers/sharepoint';

var rootReducer = combineReducers({
  calendarReducer,
  eventReducer,
  sharepointReducer
});

var rootEpics = combineEpics(
  addEventToSharePointEpic,
  getCalendarsEpic,
  getContextInfoEpic,
  getEventsEpic,
  getExportDataEpic,
  exportDataReceivedEpic,
  getFileBufferEpic
);

const epicMiddleware = createEpicMiddleware(rootEpics);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

export default store;