import React, { Component } from "react";
// import PortfolioContainer from "./components/PortfolioContainer";
// import About from './components/pages/About';
// import Geolocated from './components/pages/Geolocated';
// import Momentjs from "./components/pages/Momentjs";
import SimpleMap from "./SimpleMap";
// import SimpleMap from './components/pages/SimpleMap';
// import Map from "./components/pages/Map";
import Stepper from "../Stepper/Stepper";
import Tabs from "../Tabs/Tabs";
import Appbar from "../Appbar/Appbar";
// import Drawer from "./components/Drawer/Drawer";
import Restaurants from "./RestaurantList.json";


//this is pretty straight forward, we have components and they go ito our shit and obviously there pretty reusuable
//we can also use props to pass stuff later. We can set these props relative to things and do stuff to em. It's basically like being able to set arrays and like JSON to attributes it's very powerful.
//Now let's try running our shitty app off of a server

//We're going to have to make our App smart so that we can pass props etc. to it and like actually use it for stuff

class Home extends Component {
  state = {
    tabValue: 0,
    stepperValue: 0,
    Restaurants: Restaurants,
    restaurantSelected: "",
    currentTab: 'placeholder',
    drawerVisible: false
  };

  toggleDrawerVisibility = () => {
    this.setState({
      drawerVisible: !this.state.drawerVisible
    })
  }

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };
  
  handleStepperChange = (event, stepperValue) => {
    this.setState({ stepperValue });
  };
  
  handleStepperChangeIndex = index => {
    this.setState({ stepperValue: index });
  };
  
  filterRestaurants = (card) => {
    this.setState({ 
      currentTab: card,
      drawerVisible: !this.state.drawerVisible
    })
  }
  
  render() {
    const {drawerVisible, currentTab, Restaurants} = this.state

    // console.log(this.state.Restaurants);
    console.log('Restaraunt latitude below');
    console.log(Restaurants[0].coordinates.latitude);
    // console.log(this.state.Restaurants.restaurantName);
   
    return(
      <div>
        <Appbar 
          currentTab={currentTab}
          drawerVisible={drawerVisible} 
          toggleDrawerVisibility={this.toggleDrawerVisibility} 
        />

        <SimpleMap
          Restaurants={Restaurants}
          filterRestaurants={this.filterRestaurants}
        /> 
          
        <Tabs 
          tabValue={this.state.tabValue}
          onChange={this.handleTabChange} />
        
        <Stepper
          stepperValue={this.state.stepperValue}
          onChange={this.handleStepperChange}/>  
      </div>  
    )
  }
}

  export default Home;