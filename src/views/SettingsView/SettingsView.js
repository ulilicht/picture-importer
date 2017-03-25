import React, {PropTypes} from 'react';
import classes from './SettingsView.scss';

import {Card, CardText, CardHeader, CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SettingsView extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      basePath: props.basePath,
      picturesDirectory: props.picturesDirectory,
      backupDirectory: props.backupDirectory
    };
  }

  static propTypes = {
    setBasePath: PropTypes.func.isRequired,
    basePath: PropTypes.string.isRequired,
    basePathExists: PropTypes.bool.isRequired,
    picturesDirectory: PropTypes.string.isRequired,
    setPicturesDirectory: PropTypes.func.isRequired,
    picturesDirectoryExists: PropTypes.bool.isRequired,
    backupDirectory: PropTypes.string.isRequired,
    backupDirectoryExists: PropTypes.bool.isRequired,
    setBackupDirectory: PropTypes.func.isRequired
  };

  onBasePathChange = (event) => {
    this.setState({basePath: event.target.value});
  };

  onPicturesDirectoryChange = (event) => {
    this.setState({picturesDirectory: event.target.value});
  };

  onBackupDirectoryChange = (event) => {
    this.setState({backupDirectory: event.target.value});
  };

  onSubmitClick = (event) => {
    this.props.setBasePath(this.state.basePath);
    this.props.setPicturesDirectory(this.state.picturesDirectory);
    this.props.setBackupDirectory(this.state.backupDirectory);
  };

  render () {
    return (
      <Card className={classes.settingsViewInner}>
        <CardHeader
          title="Settings"
          subtitle="Here you can set your default import directories"
        />
        <CardText>
          <div>
            <TextField
              floatingLabelText="Base import Path"
              value={this.state.basePath}
              errorText={this.props.basePathExists ? null : 'This path does not exist'}
              fullWidth
              onChange={this.onBasePathChange}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Pictures Directory"
              value={this.state.picturesDirectory}
              errorText={this.props.picturesDirectoryExists ? null : 'This path does not exist'}
              fullWidth
              onChange={this.onPicturesDirectoryChange}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Backup Directory"
              value={this.state.backupDirectory}
              errorText={this.props.backupDirectoryExists ? null : 'This path does not exist'}
              fullWidth
              onChange={this.onBackupDirectoryChange}
            />
          </div>
        </CardText>
        <CardActions style={{textAlign: 'right'}}>
          <RaisedButton label="Save Settings"
            primary
            onClick={this.onSubmitClick}
          />
        </CardActions>
      </Card>
    );
  }
}

export default SettingsView;
