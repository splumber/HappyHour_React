import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import MenuIcon from '@material-ui/icons/Menu';
import MediaCard from '../Card/MediaCard';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import InboxIcon from '@material-ui/icons/Inbox';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const styles = {
  list: {
    width: 250,
  }
};


class TemporaryDrawer extends React.Component {
  state = {
    // panels: {
    //   left: {
    //     visible: false
    //   },
    //   right: {
    //     visible: false
    //   }
    // },
    object: this.props.id,
    navOpen: this.props.currentTab 
  };

  // toggleDrawerVisibility = (panelName) => {
  //   const {panels} = this.state

  //   panels[panelName].visible = !panels[panelName].visible

  //   this.setState({panels});
  // }
  
  render() {
    const { classes, currentTab, toggleDrawerVisibility, drawerVisible } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary="FOOD/DRINK" secondary="Monday 12pm-7pm" />
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="You can get 8 or 9 or even 10 drinks for like pretty much a chicken ya dig? A WHOLE CHICKEN." />
          </ListItem>
        </List>
      </div>
    );

    console.log(classes)
    return (
      <div>
        <MenuIcon onClick={toggleDrawerVisibility}>Open Left</MenuIcon>
        {/* <input type="text" value = {this.props.currentTab} onChange={this.toggleDrawerVisibility('left', true)}/> */}
        <Drawer open={drawerVisible} currentTab={currentTab} onClose={toggleDrawerVisibility}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawerVisibility}
            onKeyDown={toggleDrawerVisibility}
          >
            <MediaCard currentTab={currentTab}/>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);