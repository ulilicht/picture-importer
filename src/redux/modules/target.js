import {getDirectories} from 'helpers/directories';
import {setError} from './error';

const initialState = {
  isLoading: true,
  directories: []
};

export const SET_TARGET_DIRECTORIES = 'SET_TARGET_DIRECTORIES';

export function setTargetDirectories(directories) {
  return {type: SET_TARGET_DIRECTORIES, payload: directories};
}

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const loadTargetDirectories = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const targetDir = getState().settings.picturesDirectory;

      if (!getState().settings.backupDirectoryExists) {
        dispatch(setError(`Backup <code>${getState().settings.backupDirectory}</code> was not found`,
          true, true, loadTargetDirectories));
      }

      try {
        const directories = getDirectories(targetDir);
        dispatch(setTargetDirectories(directories));
      } catch (e) {
        dispatch(setError(`Target <code>${targetDir}</code> could not be loaded`, true, true, loadTargetDirectories));
      }
      resolve();
    });
  };
};

export const actions = {
  loadTargetDirectories
};

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_TARGET_DIRECTORIES]: (state, action) => {
    return Object.assign({}, state, {
      directories: action.payload,
      isLoading: false
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function targetReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
