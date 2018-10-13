import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    zIndex: "2",
    display: "flex",
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonAuto extends React.Component {


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.props.tabValue}
            onChange={this.props.onChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="American" />
            <Tab label="Chinese" />
            <Tab label="Tex-Mex" />
            <Tab label="French" />
            <Tab label="Swedish" />
            <Tab label="Mediterranean" />
            <Tab label="Italian" />
            <Tab label="BBQ" />
            <Tab label="Burgers" />
            <Tab label="Thai" />
            <Tab label="Vietnamese" />
            <Tab label="Cafes" />
          </Tabs>
        </AppBar>
        {/* {value === 0 && <TabContainer>American</TabContainer>}
        {value === 1 && <TabContainer>Chinese</TabContainer>}
        {value === 2 && <TabContainer>Tex-Mex</TabContainer>}
        {value === 3 && <TabContainer>French</TabContainer>}
        {value === 4 && <TabContainer>Swedish</TabContainer>}
        {value === 5 && <TabContainer>Mediterranean</TabContainer>}
        {value === 6 && <TabContainer>Italian</TabContainer>} */}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);