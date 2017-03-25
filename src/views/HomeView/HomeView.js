import React, {PropTypes} from 'react'
import classes from './HomeView.scss'
import moment from 'moment';

import SourceList from 'components/SourceList'
import TargetList from 'components/TargetList'
import ImportingProgress from 'components/ImportingProgress';

import {Card, CardText, CardHeader, CardActions} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Error from 'components/Error'

class HomeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      importName: moment().format('YYYYMMDD[_]')
    }
  }

  static propTypes = {
    importDirectory: PropTypes.func.isRequired,
    basePath: PropTypes.string.isRequired,
    picturesDirectory: PropTypes.string.isRequired
  };

  componentDidMount = () => {
    this.props.loadTargetDirectories();
    this.props.loadSrcDirectories();
  }

  onInputChange = (event) => {
    this.setState({importName: event.target.value})
  }

  onSubmitClick = () => {
    this.props.importDirectory(this.state.importName)
  }

  renderContent() {
    return (
      <Card className={classes.homeViewInner}>
        {this.props.isImporting && <ImportingProgress isSuccessful={false} isLoading={true}/>}
        <CardHeader
          title="Source Directories"
          subtitle={"The directories found on " + this.props.basePath}
        />
        <CardText>
          <SourceList />
        </CardText>
        <CardHeader
          title="Import Targets"
          subtitle="Select the Image Category"
        />
        <CardText>
          <Paper zDepth={1}>
            <TargetList />
          </Paper>
        </CardText>

        <CardText>
          <TextField
            floatingLabelText="Type the Directory Name"
            value={this.state.importName}
            onChange={this.onInputChange}
          />

        </CardText>
        <CardActions style={{textAlign: 'right'}}>
          <RaisedButton label="Import Images"
                        primary={true}
                        onClick={this.onSubmitClick}
          />
        </CardActions>
      </Card>
    );
  }

  renderInitialLoading() {
    return (
      <RefreshIndicator
        size={50}
        top={70}
        left={0}
        loadingColor="#FF9800"
        status="loading"
      />
    );
  }

  render() {

    const content = this.props.isLoading ? this.renderInitialLoading() : this.renderContent();
    return (
      <div className={classes.homeView}>

        {this.props.hasError ? <Error /> : content}
      </div>
    )
  }
}

export default HomeView
