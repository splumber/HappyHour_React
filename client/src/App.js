import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Nav from "./components/Nav";
// import Jumbotron from './components/Jumbotron/Jumbotron';
import Home from './components/pages/Home'
// import Saved from './pages/Saved';

const App = () => (
  <Router>
    <div>
      {/* <Nav/> */}
      {/* <Jumbotron/> */}
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route exact path="/saved" component={Saved}/> */}

      </Switch>
    </div>
  </Router>
)

export default App

// import React from "react";
// // import PortfolioContainer from "./components/PortfolioContainer";
// import About from './components/pages/About';
// import Geolocated from './components/pages/Geolocated';
// import Momentjs from "./components/pages/Momentjs";
// import SimpleMap from "./components/pages/SimpleMap";
// // import SimpleMap from './components/pages/SimpleMap';
// // import Map from "./components/pages/Map";
// import Stepper from "./components/Stepper/Stepper";
// import Tabs from "./components/Tabs/Tabs";
// import Appbar from "./components/Appbar/Appbar";
// // import Drawer from "./components/Drawer/Drawer";

// //this is pretty straight forward, we have components and they go ito our shit and obviously there pretty reusuable
// //we can also use props to pass stuff later. We can set these props relative to things and do stuff to em. It's basically like being able to set arrays and like JSON to attributes it's very powerful.
// //Now let's try running our shitty app off of a server

// //We're going to have to make our App smart so that we can pass props etc. to it and like actually use it for stuff

// const App = () => (
// <div>
//     <Appbar/>
//     {/* What does the App bar need? */}
//     <SimpleMap/>
//     {/* What does the map need? */}
//     <Tabs/>
//     {/* What do the Tabs need? */}
//     <Stepper/>
//     {/* What does the Stepper need? */}

// </div>

// );

// export default App;
