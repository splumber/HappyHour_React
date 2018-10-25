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
    backgroundColor: theme.palette.background.paper,
  },
});

class DemoTabs extends React.Component {
  state = {
    value: 'app',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  callFoodCat = (event, value) => {
    this.setState({ value });

    console.log('TARGET BELOW');
    console.log(value);
    // send callback
    // console.log(event.target.i);
    console.log(event.target.attributes.getNamedItem('value'));
    // this.props.sendFoodCat(value)
    // this.props.sendDemoValue(value)
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.props.valued} onChange={this.callFoodCat}>
            <Tab value="one" label="New Arrivals in the Longest Text of Nonfiction" />
            <Tab value="two" label="Item Two" />
            <Tab value="three" label="Item Three" />
          </Tabs>
        </AppBar>
        {/* {value === 'one' && <TabContainer>Item One</TabContainer>}
        {value === 'two' && <TabContainer>Item Two</TabContainer>}
        {value === 'three' && <TabContainer>Item Three</TabContainer>} */}
      </div>
    );
  }
}

DemoTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DemoTabs);