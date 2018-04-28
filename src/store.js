
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import { contextInfoEpic } from './epics/contextInfo';
import { addEventToSharePointEpic, eventEpic } from './epics/event';

import eventReducer from './reducers/event';
import sharepointReducer from './reducers/sharepoint';

var rootReducer = combineReducers({
  eventReducer,
  sharepointReducer
});

var rootEpics = combineEpics(
  addEventToSharePointEpic,
  contextInfoEpic,
  eventEpic
);

const epicMiddleware = createEpicMiddleware(rootEpics);

const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

export default store;