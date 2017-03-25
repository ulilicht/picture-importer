import fs from 'fs';

const basePath = localStorage.basePath || '/Volumes/K-r/DCIM/';
const picturesDirectory = localStorage.picturesDirectory || '/Volumes/Tumladen/Fotos';
const backupDirectory = localStorage.backupDirectory || '/Volumes/Tumladen/Fotos_archiv';

const initialState = {
  basePath,
  basePathExists: fs.existsSync(basePath),
  picturesDirectory,
  picturesDirectoryExists: fs.existsSync(picturesDirectory),
  backupDirectory,
  backupDirectoryExists: fs.existsSync(backupDirectory)
};

export const SET_BASE_PATH = 'SET_BASE_PATH';
export const SET_PICTURES_DIRECTORY = 'SET_PICTURES_DIRECTORY';
export const SET_BACKUP_DIRECTORY = 'SET_BACKUP_DIRECTORY';

export function setBasePath (pathName) {
  return {type: SET_BASE_PATH, payload: pathName};
}
export function setPicturesDirectory (pathName) {
  return {type: SET_PICTURES_DIRECTORY, payload: pathName};
}
export function setBackupDirectory (pathName) {
  return {type: SET_BACKUP_DIRECTORY, payload: pathName};
}

export const actions = {
  setBasePath,
  setPicturesDirectory,
  setBackupDirectory
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_BASE_PATH]: (state, action) => {
    localStorage.basePath = action.payload;

    return Object.assign({}, state, {
      basePath: action.payload,
      basePathExists: fs.existsSync(action.payload)
    });
  },
  [SET_PICTURES_DIRECTORY]: (state, action) => {
    localStorage.picturesDirectory = action.payload;

    return Object.assign({}, state, {
      picturesDirectory: action.payload,
      picturesDirectoryExists: fs.existsSync(action.payload)

    });
  },
  [SET_BACKUP_DIRECTORY]: (state, action) => {
    localStorage.backupDirectory = action.payload;

    return Object.assign({}, state, {
      backupDirectory: action.payload,
      backupDirectoryExists: fs.existsSync(action.payload)
    });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------

export default function settingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler
    ? handler(state, action)
    : state;
}
