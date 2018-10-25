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
  appBar: {
    top: 'auto',
    bottom: 96
  }
});

class ScrollableTabsButtonAuto extends React.Component {
    state = {
      catState: this.props.restaurant,
      value: "All"
    }

    callFoodCat = (event, value) => {
      this.setState({ value });
      console.log('TARGET BELOW');
      console.log(value);
      // send callback
      // console.log(event.target.i);
      console.log(event.target.attributes.getNamedItem('value'));
      this.props.sendFoodCat(value)
    }

  render() {

    const { classes } = this.props;
    const { value } = this.state;



    return (
      <div className={classes.root}>
    {console.log("THIS IS REST CAT")}
    {/* {console.log(this.props.tabValue)} */}
    {console.log(this.state.value)}
    {console.log(this.props)}


        <AppBar position="fixed" color="default" className = {classes.appBar}>
          <Tabs
            value={value}
            onChange={this.callFoodCat}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
            
          >
            <Tab value = 'All' label="All" />
            <Tab value = 'American (New)' label="American" />
            <Tab value = 'Chinese' label="Chinese" />
            <Tab value = 'Tex-Mex' label="Tex-Mex" />
            <Tab value = 'French' label="French" />
            <Tab value = 'Swedish' label="Swedish" />
            <Tab value = 'Mediterranean' label="Mediterranean" />
            <Tab value = 'Italian' label="Italian" />
            <Tab value = 'Barbeque' label="BBQ" />
            <Tab value = 'Burgers' label="Burgers" />
            <Tab value = 'Thai' label="Thai" />
            <Tab value = 'Vietnamese' label="Vietnamese" />
            <Tab value = 'Cafes' label="Cafes" />
          </Tabs>
        </AppBar>
        {/* {value === "American (New)" && <TabContainer>American</TabContainer>}
        {value === "Chinese" && <TabContainer>Chinese</TabContainer>}
        {value === "Tex-Mex" && <TabContainer>Tex-Mex</TabContainer>}
        {value === "French" && <TabContainer>French</TabContainer>}
        {value === "Swedish" && <TabContainer>Swedish</TabContainer>}
        {value === "Mediterranean" && <TabContainer>Mediterranean</TabContainer>}
        {value === "Italian" && <TabContainer>Italian</TabContainer>} */}
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);