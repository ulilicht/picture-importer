import React, {PropTypes} from 'react';
import classes from './Error.scss';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Error extends React.Component {
  static propTypes = {
    errorList: PropTypes.array.isRequired,
    clearError: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired
  };

  renderError (error, index) {
    return (
      <div className={classes.errorLine} key={index}>
        <div dangerouslySetInnerHTML={{__html: error.message}}></div>
        <div className={classes.errorAction}>
          <FlatButton onClick={() => this.props.clearError(error)} disabled={!error.isRetryPossible} label="Retry"
            primary /></div>
      </div>
    );
  }

  render () {
    return (
      <div>
        <Dialog
          title="Please check: "
          modal
          open={this.props.hasError}
        >
          {this.props.errorList.map((error, index) => this.renderError(error, index))}
        </Dialog>
      </div>
    );
  }
}

export default Error;
