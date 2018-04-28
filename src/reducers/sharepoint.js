import {
  SET_FORM_DIGEST_VALUE
} from '../constants/actionTypes'

const DEFAULT_STATE = {
  FormDigestValue: ''
}

const setFormDigestValue = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { FormDigestValue: action.FormDigestValue });
  return newState;
}

const sharepointReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {

    case SET_FORM_DIGEST_VALUE:
      return setFormDigestValue(state, action);

    default:
      return state;
  }
}

export default sharepointReducer