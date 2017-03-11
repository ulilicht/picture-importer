import React, {PropTypes} from 'react'
import classes from './TargetList.scss'
import CheckIcon from 'material-ui/svg-icons/action/check-circle';

import {List, ListItem} from 'material-ui';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class TargetList extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    targetDirectories: PropTypes.array.isRequired,
    targetDirectory: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  onTargetDirectoryClick = (dir) => {
    return this.props.markTargetDirectory(dir.name)
  };

  render() {
    console.log('loading target');
    return (

          <List>
            {this.props.targetDirectories.map((dir, index) => {
              const isMarked = this.props.targetDirectory === dir.name;

              return (
                <ListItem key={index} className={`${classes.directory} ${isMarked
                ? classes.directoryIsMarked
                : ''}`}
                          rightIcon={isMarked ? <CheckIcon /> : null}
                          onClick={() => this.onTargetDirectoryClick(dir)}
                          primaryText={dir.name}/>
              )
            })}
          </List>

    )
  }
}

export default TargetList
