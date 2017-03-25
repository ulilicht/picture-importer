import React, {PropTypes} from 'react';
import classes from './SourceList.scss';

import {GridList, GridTile} from 'material-ui/GridList';
import CheckIcon from 'material-ui/svg-icons/action/check-circle';

class SourceList extends React.Component {
  static propTypes = {
    sourceDirectories: PropTypes.array.isRequired,
    markedDirectories: PropTypes.array.isRequired,
    markDirectory: PropTypes.func.isRequired,
    unMarkDirectory: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  isDirectoryMarked = (dir) => {
    return this.props.markedDirectories.indexOf(dir.path) > -1;
  }

  onDirectoryClick = (dir) => {
    return this.isDirectoryMarked(dir)
      ? this.props.unMarkDirectory(dir.path)
      : this.props.markDirectory(dir.path);
  }

  render () {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto'
      },
      titleStyle: {
        color: '#ffffff'
      },
      markedTileIcon: {
        width: '30%',
        height: '30%'
      }
    };

    const checkedTile = (
      <div className={classes.markedTile}>
        <CheckIcon className={classes.markedTileIcon}
          style={styles.markedTileIcon}
          color="rgba(255, 255, 255, 0.85)"
        />
      </div>
    );

    console.log('source is loading: ', this.props.isLoading);
    // this.isDirectoryMarked(dir) ? 'SELECTED' : ''
    return (

      <GridList style={styles.gridList} cols={4}>
        {this.props.sourceDirectories.map((dir) => (
          <GridTile
            cols={1}
            key={dir.img + dir.name}
            title={dir.name}
            titleStyle={styles.titleStyle}
            className={classes.tile}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            onClick={() => this.onDirectoryClick(dir)}
          >
            <div className={classes.image} style={{backgroundImage: `url(${dir.img})`}}></div>
            {this.isDirectoryMarked(dir) && checkedTile}
          </GridTile>
        ))}
      </GridList>

    );
  }
}

export default SourceList;
