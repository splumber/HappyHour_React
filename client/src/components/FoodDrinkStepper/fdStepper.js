import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ props }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  //   dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "auto",
  },
  appBar: {
    top: 'auto',
    bottom: 48
  }
});

class FullWidthTabs extends React.Component {
  //   handleChange = (event, value) => {
  //     this.setState({ value });
  //   };

  //   handleChangeIndex = index => {
  //     this.setState({ value: index });
  //   };

  callDealBoolean = (event, value) => {
    //running this breaks our code?
    // this.setState({ value });

    var returnObj = {}

    console.log("FDSTEPPER BELOW")
    console.log(value)

    console.log(event.target.attributes.getNamedItem('value'));
    this.props.sendDealBoolean(value)
    this.props.setStepperFdValue(value)
  }

  render() {
    const { classes } = this.props;
    // const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default" className = {classes.appBar}>
          <Tabs
            value={this.props.stepperFdValue}
            onChange={this.callDealBoolean}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab value='All' label="All" />
            <Tab value='hasFood' label="Has Food" />
            <Tab value='hasBoth' label="Has Both" />
            <Tab value='hasDrink' label="Has Drinks" />

          </Tabs>
        </AppBar>

      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  //   theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);