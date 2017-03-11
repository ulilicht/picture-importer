import React, {PropTypes} from 'react'
import classes from './ImportingProgress.scss'

import LinearProgress from 'material-ui/LinearProgress';


class ImportingProgress extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSuccessful: PropTypes.bool.isRequired
  };

  render() {

    return (
      <div className={classes.importing}>
        <div className={classes.importingContent}>
          <div className={classes.importingText}>
            Import in progress...
          </div>
          <div className={classes.importingProgressBar}>
            <LinearProgress mode="indeterminate"/>
          </div>
        </div>
      </div>
    )
  }
}

export default ImportingProgress
