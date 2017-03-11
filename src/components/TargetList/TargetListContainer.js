import {connect} from 'react-redux'
import {markTargetDirectory} from '../../redux/modules/directories'
import TargetList from './TargetList'

const mapStateToProps = (state) => {
  return {
    targetDirectories: state.target.directories,
    isLoading: state.target.isLoading,
    targetDirectory: state.directories.targetDirectory,
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    markTargetDirectory: dirName => dispatch(markTargetDirectory(dirName))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TargetList)
