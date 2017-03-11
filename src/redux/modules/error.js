const initialState = {
  hasError: false,
  errorList: []
};

export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export function setError(message, canBeClosed, isRetryPossible, retryAction) {
  const error = {
    message, canBeClosed, isRetryPossible, retryAction
  };

  return {type: SET_ERROR, payload: error}
}

function removeError(errorObject) {
  return {type: CLEAR_ERROR, payload: errorObject}
}

export function clearError(errorObject) {
  return dispatch => {
    dispatch(removeError(errorObject));

    if (errorObject.isRetryPossible) {
      dispatch(errorObject.retryAction())
    }

    return true;
  }
}

export const actions = {
  setError, clearError
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_ERROR]: (state, action) => {
    const errorList = state.errorList.concat(action.payload);
    return Object.assign({}, state, {errorList, hasError: true})
  },
  [CLEAR_ERROR]: (state, action) => {
    const errorIndex = state.errorList.indexOf(action.payload);
    const newErrorList = state.errorList.slice(0);
    if (errorIndex > -1) {
      newErrorList.splice(errorIndex, 1);
    }
    const hasError = newErrorList.length > 0;
    return Object.assign({}, state, {errorList: newErrorList, hasError})
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function sourceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
