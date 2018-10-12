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

    };
    handleTabChange = (event, tabValue) => {
        this.setState({ tabValue });
    };
    
    handleStepperChange = (event, stepperValue) => {
    this.setState({ stepperValue });
    };

    handleStepperChangeIndex = index => {
    this.setState({ stepperValue: index });
    };

    filterRestaurants = (callback) => {
        // this.setState({ restaurantSelected: this.state.Restaurants._id  })
        console.log(`I got ${callback}`);
        this.setState({ currentTab: callback  })

        // console.log("A restaurant is clicked");
    }

    
    render(){
        // console.log(this.state.Restaurants);
        console.log('Restaraunt latitude below');
        console.log(this.state.Restaurants[0].coordinates.latitude);
        // console.log(this.state.Restaurants.restaurantName);
        return(
            
        <div>
            {console.log ('currentTab name below')}
            <Appbar currentTab = {this.state.currentTab}/>
            {console.log('NEW STATE BELOW')}
            {console.log(this.state)}
            <SimpleMap
                // latitude={this.state.Restaurants[0].coordinates.latitude}
                // longitude={this.state.Restaurants[0].coordinates.longitude}
                // restCat={this.state.Restaurants.categories}
                Restaurants={this.state.Restaurants}
                filterRestaurants = {this.filterRestaurants}
            /> 
         
            <Tabs 
                tabValue={this.state.tabValue}
                onChange={this.handleTabChange} />
            
            <Stepper
                stepperValue={this.state.stepperValue}
                onChange={this.handleStepperChange}/>
            
    



        </div>


        )}
}
export default Home;