import {connect} from 'react-redux'
import {clearError} from '../../redux/modules/error'
import Error from './Error'

const mapStateToProps = (state) => {
  return {
    hasError: state.error.hasError,
    errorList: state.error.errorList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: (error) => dispatch(clearError(error)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Error)
