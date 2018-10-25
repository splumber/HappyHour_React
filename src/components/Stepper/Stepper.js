import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "auto",
    bottom: 0
  },
  appBar: {
    top: 'auto',
    bottom: 0
  }
});

class FullWidthTabs extends React.Component {


  callTimeValue = (event, value) => {
    var returnObj = {}

    console.log("time value below");
    console.log(value);

    console.log(event.target.attributes.getNamedItem('value'));
    this.props.sendTimeValue(value)
    this.props.setStepperValue(value)
  }


  render() {
    const { classes, theme } = this.props;
    // const { classes } = this.props;


    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default" className = {classes.appBar}>
          <Tabs 
            // value={this.props.stepperValue}\
            value = {this.props.stepperValue}
            onChange={this.callTimeValue}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          > 
          {/* what is the value that this is gonna send? The value will be the command to set the relevant modals to open. */}
            <Tab value = 'Days' label = {this.props.currentDay} />
            <Tab value = 'Time' label = {this.props.currentTimePresent} />
            {/* <Tab value = 'Now' label="Now" />
            <Tab value = 'Custom' label="Custom" /> */}
          </Tabs>
        </AppBar>
        {/* {value === 'Now' && <TabContainer>Now</TabContainer>}
        {value === 'Custom' && <TabContainer>Custom</TabContainer>} */}
        {/* <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>Item One</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews> */}
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);