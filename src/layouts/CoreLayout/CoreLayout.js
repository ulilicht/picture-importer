import React, {PropTypes} from 'react';
import '../../styles/core.scss';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import CameraIcon from 'material-ui/svg-icons/image/linked-camera';

class CoreLayout extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isNavigationOpen: false
    };
  }

  toggleNavigation = () => {
    this.setState({isNavigationOpen: !this.state.isNavigationOpen});
  };

  navigateTo = (target) => {
    this.props.history.push(target);
    this.setState({isNavigationOpen: false});
  }

  render () {
    const marginTopStyle = {
      marginTop: '64px'
    };

    return (
      <div className='page-container'>
        <AppBar
          title="Picture Importer"
          onLeftIconButtonTouchTap={this.toggleNavigation}
        />
        <Drawer open={this.state.isNavigationOpen}
          overlayStyle={marginTopStyle}
          containerStyle={marginTopStyle}
          docked={false}
          onRequestChange={this.toggleNavigation}>
          <MenuItem leftIcon={<CameraIcon />} onTouchTap={() => this.navigateTo('/')}>Import</MenuItem>
          <MenuItem leftIcon={<SettingsIcon />} onTouchTap={() => this.navigateTo('/settings')}>Settings</MenuItem>
        </Drawer>
        {this.props.children}
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
};

export default CoreLayout;
