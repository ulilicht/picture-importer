import {getDirectoriesWithPreviewImage} from 'helpers/directories';
import {setError} from './error';

const initialState = {
  isLoading: true,
  directories: []
};

export const SET_SOURCE_DIRECTORIES = 'SET_SOURCE_DIRECTORIES';

export function setSourceDirectories(directories) {
  return {type: SET_SOURCE_DIRECTORIES, payload: directories}
}

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const loadSrcDirectories = () => {
  return (dispatch, getState) => {

    return new Promise((resolve) => {
      const srcDirectories = getState().directories.basePath;
      try {
        const directories = getDirectoriesWithPreviewImage(srcDirectories);
        dispatch(setSourceDirectories(directories));
      } catch (e) {
        dispatch(setError(`Source ${srcDirectories} could not be loaded`, false, true, loadSrcDirectories))
      }

      resolve();
    });
  }
};

export const actions = {
  loadSrcDirectories
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_SOURCE_DIRECTORIES]: (state, action) => {
    return Object.assign({}, state, {
      directories: action.payload,
      isLoading: false
    })
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function sourceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
