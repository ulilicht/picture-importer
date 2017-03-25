import React, {PropTypes} from 'react';
import classes from './Error.scss';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Error extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowErrorWindow: this.props.hasError
    };
  }

  static propTypes = {
    errorList: PropTypes.array.isRequired,
    clearError: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired
  };

  renderError(error, index) {
    return (
      <div className={classes.errorLine} key={index}>
        <div dangerouslySetInnerHTML={{__html: error.message}}></div>
        <div className={classes.errorAction}>
          <FlatButton onClick={() => this.props.clearError(error)} disabled={!error.isRetryPossible} label="Retry"
                      secondary/></div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasError) {
      this.setState({shouldShowErrorWindow: true});
    }
  }

  handleClose = () => {
    this.setState({shouldShowErrorWindow: false})
  }

  render() {
    let canBeClosed = true;

    this.props.errorList.forEach(error => {
      if (!error.canBeClosed) {
        canBeClosed = false
      }
    });

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Please check: "
          actions={canBeClosed ? actions : null}
          modal
          open={this.state.shouldShowErrorWindow}
        >
          {this.props.errorList.map((error, index) => this.renderError(error, index))}
        </Dialog>
      </div>
    );
  }
}

export default Error;
