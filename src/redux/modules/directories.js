import {copyHelper} from 'helpers/files'
import path from 'path'

const initialState = {
  markedDirectories: [],
  targetDirectory: '',
  isImporting: false,
  importProgress: 0,
  isImportSuccessful: false,
};


export const MARK_DIRECTORY = 'MARK_DIRECTORY';
export const MARK_TARGET_DIRECTORY = 'MARK_TARGET_DIRECTORY';
export const UNMARK_DIRECTORY = 'UNMARK_DIRECTORY';
export const IMPORT_DIRECTORY = 'IMPORT_DIRECTORY';
export const SET_IS_IMPORTING = 'SET_IS_IMPORTING';
export const SET_IMPORT_SUCCESS = 'SET_IMPORT_SUCCESS';

export function markDirectory(dirName) {
  return {type: MARK_DIRECTORY, payload: dirName}
}

export function markTargetDirectory(dirName) {
  return {type: MARK_TARGET_DIRECTORY, payload: dirName}
}

export function unMarkDirectory(dirName) {
  return {type: UNMARK_DIRECTORY, payload: dirName}
}

function setIsImporting(isImporting) {
  return {type: SET_IS_IMPORTING, payload: isImporting}
}

function setImportSuccess(isSuccessful) {
  return {type: SET_IMPORT_SUCCESS, payload: isSuccessful}
}

export function importDirectory(importDir) {
  return (dispatch, getState) => {
    dispatch(setImportSuccess(false));
    dispatch(setIsImporting(true));

    return new Promise((resolve) => {
      const importPath = {
        picturesDirectory: path.join(getState().settings.picturesDirectory, getState().directories.targetDirectory, importDir),
        backupDirectory: path.join(getState().settings.backupDirectory, getState().directories.targetDirectory, importDir)
      };

      const directoriesToProcess = getState().directories.markedDirectories;
      console.log('CALL COPY HELPER WITH ', importPath, directoriesToProcess);

      const result = copyHelper(importPath, directoriesToProcess);

      // setTimeout(() => {
      //   dispatch(setImportSuccess(true));
      //   dispatch(setIsImporting(false));
      //   resolve();
      // }, 5000);

      Promise.all(result).then(values => {
        console.log('ALL FILES WRITTEN');

        dispatch(setImportSuccess(true));
        dispatch(setIsImporting(false));
        resolve();
      });
    });
  }
}

export const actions = {
  markDirectory,
  markTargetDirectory,
  unMarkDirectory,
  importDirectory
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MARK_DIRECTORY]: (state, action) => {
    return Object.assign({}, state, {
      markedDirectories: state.markedDirectories.concat([action.payload])
    })
  },
  [MARK_TARGET_DIRECTORY]: (state, action) => {
    return Object.assign({}, state, {
      targetDirectory: state.targetDirectory = action.payload
    })
  },
  [UNMARK_DIRECTORY]: (state, action) => {
    return Object.assign({}, state, {
      markedDirectories: state.markedDirectories.filter(dir => dir !== action.payload)
    })
  },
  [SET_IS_IMPORTING]: (state, action) => {
    return Object.assign({}, state, {
      isImporting: action.payload
    })
  },
  [SET_IMPORT_SUCCESS]: (state, action) => {

    const newState = {
      isImportSuccessful: action.payload
    };

    if (action.payload === true) {
      newState.markedDirectories = initialState.markedDirectories;
      newState.targetDirectory = initialState.targetDirectory;
    }

    return Object.assign({}, state, newState)
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function directoriesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler
    ? handler(state, action)
    : state
}
