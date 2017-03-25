import {connect} from 'react-redux';
import SettingsView from './SettingsView';
import {setBasePath, setPicturesDirectory, setBackupDirectory} from '../../redux/modules/settings';

const mapStateToProps = (state) => {
  return {
    basePath: state.settings.basePath,
    basePathExists: state.settings.basePathExists,
    picturesDirectory: state.settings.picturesDirectory,
    picturesDirectoryExists: state.settings.picturesDirectoryExists,
    backupDirectory: state.settings.backupDirectory,
    backupDirectoryExists: state.settings.backupDirectoryExists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBasePath: dirName => dispatch(setBasePath(dirName)),
    setPicturesDirectory: dirName => dispatch(setPicturesDirectory(dirName)),
    setBackupDirectory: dirName => dispatch(setBackupDirectory(dirName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
