import {connect} from 'react-redux'
import {importDirectory} from '../../redux/modules/directories'
import HomeView from './HomeView'
import {loadTargetDirectories} from '../../redux/modules/target';
import {loadSrcDirectories} from '../../redux/modules/source'

const mapStateToProps = (state) => {
  return {
    isLoading: state.source.isLoading || state.target.isLoading,
    isImporting: state.directories.isImporting,
    picturesDirectory: state.directories.picturesDirectory,
    hasError: state.error.hasError
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    importDirectory: dirName => dispatch(importDirectory(dirName)),
    loadSrcDirectories: () => dispatch(loadSrcDirectories()),
    loadTargetDirectories: () => dispatch(loadTargetDirectories())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
