import {connect} from 'react-redux';
import {markDirectory, unMarkDirectory} from '../../redux/modules/directories';
import SourceList from './SourceList';

const mapStateToProps = (state) => {
  return {
    sourceDirectories: state.source.directories,
    isLoading: state.source.isLoading,
    markedDirectories: state.directories.markedDirectories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markDirectory: dirName => dispatch(markDirectory(dirName)),
    unMarkDirectory: dirName => dispatch(unMarkDirectory(dirName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SourceList);
