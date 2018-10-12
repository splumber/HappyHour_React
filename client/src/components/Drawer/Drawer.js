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
import SimpleMap from "../pages/SimpleMap";

const styles = {
  list: {
    width: 250,
  }
};


class TemporaryDrawer extends React.Component {
  state = {
    left: false,
    object: this.props.id
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary="FOOD/DRINK " secondary="Monday 12pm-7pm" />
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
        {/* THIS IS WHERE WE DO A MAP FROM THE DEALS COMPONENT AND WE GRAB THE SHIT FROM THE THUMBNAILS TO GET THE RIGHT SHIT */}
        {/* <Divider />
        <List>{mailFolderListItems}</List>
        
        <Divider />
        <List>{otherMailFolderListItems}</List> */}
      </div>
    );

    return (
      <div>
        {console.log("Restaurant state")}
        {console.log(this.props)}
        {console.log('Drawer props and classes below')}
        {console.log(this.props)}
        {console.log(classes)}
        <MenuIcon onClick={this.toggleDrawer('left', true)}>Open Left</MenuIcon>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >

            <MediaCard onChange={this.toggleDrawer('left', true)} currentTab = {this.props.currentTab}/>
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