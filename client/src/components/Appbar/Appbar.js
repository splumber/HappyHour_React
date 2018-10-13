import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "../Drawer/Drawer";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

function ButtonAppBar (props) {
  const { classes, drawerVisible, currentTab, toggleDrawerVisibility } = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            {/* <MenuIcon/> */}
            <Drawer drawerVisible={drawerVisible} currentTab={currentTab} toggleDrawerVisibility={toggleDrawerVisibility} />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Very Happy Hours Orlando
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);