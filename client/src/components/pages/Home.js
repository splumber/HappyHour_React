import React, { Component } from "react";
import SimpleMap from "./SimpleMap";
import Stepper from "../Stepper/Stepper";
import Tabs from "../Tabs/Tabs";
import DemoTabs from "../Tabs/DemoTabs";

import Appbar from "../Appbar/Appbar";
import Stepperfd from "../FoodDrinkStepper/fdStepper";
import Restaurants from "./RestaurantList.json";
import axios from "axios";
import Clock from 'react-live-clock';
import MyDialog from '../Dialog/MyDialog';
import MyDialogConfirm from '../Dialog/MyDialogConfirm';
import MyDayModal from '../Dialog/MyDayModal';
import MyTimeModal from '../Dialog/MyTimeModal';
import MySnackbar from '../Snackbar/MySnackbar';
import LoginModal from '../Dialog/LoginModal';
import Snackbar from '@material-ui/core/Snackbar';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';



//this is pretty straight forward, we have components and they go ito our shit and obviously there pretty reusuable
//we can also use props to pass stuff later. We can set these props relative to things and do stuff to em. It's basically like being able to set arrays and like JSON to attributes it's very powerful.
//Now let's try running our shitty app off of a server

//We're going to have to make our App smart so that we can pass props etc. to it and like actually use it for stuff

class Home extends Component {
  state = {
    value: 'one',
    stepperFdValue: 'All',
    stepperValue: 'All',
    loggingIn: false,
    loggedIn: false,
    currentUserName: '',
    currentUserEmail: '',
    currentUserId: '',
    snackOpen: false,
    snackText: 'Please login to use this feature',
    vertical: 'top',
    horizontal: 'left',
    foodCat: 'All',
    hasFood: false,
    hasDrink: false,
    stepperValue: 0,
    Restaurants: Restaurants,
    Deals: [],
    currentTab: 'placeholder',
    drawerVisible: false,
    open: false,
    openconfirm: false,
    currentTime: '',
    currentTimePresent: '',
    currentDay: 'All',
    selectedDay: new moment().format('dddd'),
    selectedType: 'Both',
    selectedFood: false,
    selectedDrink: false,
    selectedStart: 930,
    selectedEnd: 1230,
    selectedSumm: '',
    dayModalOpen: false,
    timeModalOpen: false
  };

  getRestaurants = () => {

    var self = this;

    axios.get('/api/restaurants')
      .then(function (response) {
        console.log('This is the API utils talking');
        console.log('my response.data', response.data);
        console.log(self);
        console.log('current state of Restaurants', self.state.Restaurants);

        self.setState({
          Restaurants: response.data
        })
        // why is this undefined? Is that because it's on didMount?
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDeals = () => {

    var self = this;

    axios.get('/api/restaurants/deals')
      .then(function (response) {
        console.log('This is the API utils talking');
        console.log('my response.data', response.data);
        console.log(self);
        console.log('current state of Restaurants', self.state.Restaurants);

        self.setState({
          Deals: response.data
        })
        // why is this undefined? Is that because it's on didMount?
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateDeals = () => {
    console.log('meep');
    const currentRestaurant = this.state.currentTab

    var happyFoodOverride = this.state.selectedFood;
    var happyDrinkOverride = this.state.selectedDrink;

    if (happyFoodOverride == false && happyDrinkOverride == false) {
      happyFoodOverride = true;
      happyDrinkOverride = true;

    }

    //check if this userId is your userId and say you can't do that. But you also can't upvote or downvote a friends thing more than once. So.

    let deal = {
      userId: this.state.currentUserId,
      businessId: currentRestaurant.id,
      restaurantAlias: currentRestaurant.alias,
      happyFood: happyFoodOverride,
      happyDrink: happyDrinkOverride,
      timeDay: this.state.selectedDay,
      timeStart: this.state.selectedStart,
      timeEnd: this.state.selectedEnd,
      summary: this.state.selectedSumm,
      // isBeer: blep,
      // isWine: blep,
      // isLiquor: blep,
      // isOther: blep,
      isGood: 0,
      isBad: 0

    }

    let user = {
      userId: this.state.currentUserId,
      userName: this.state.currentUserName
    }

    // TODO: consider lowercasing payload entries
    axios.post('/api/restaurants/update', {
      Restaurant: currentRestaurant,
      Deal: deal,
      User: user
    })
      .then((response) => {
        this.getRestaurants();
        this.getDeals();
        // const updatedRestaurant = response.data
        // currentRestaurant.deals = updatedRestaurant.deals


        // this.setState({currentTab: currentRestaurant })
        // console.log('This is the API utils talking');
        // console.log('my response.data',response.data);
        // console.log(self);
        // console.log('current state of Restaurants', self.state.Restaurants);
      })
      .catch((error) => {
        console.log(error);
      });
  }



  toggleDrawerVisibility = () => {
    this.setState({
      //this is a toggle because it sets it to NOT it's state. It's probably only going to close when we click out of the drawer. Why don't we put the modal outside of the drawer and then get it to toggle by sending the toggle up and then down to trigger a modal not in the drawer (because that's really the issue. Then we can just have it open when we resend the confirm);
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

  sendFoodCat = (value) => {
    this.setState({
      foodCat: value,
    })
  }

  sendDealBoolean = (value) => {
    console.log('SEND DEAL BOOLEAN BELOW')
    console.log(value)

    if (value == 'All') {
      this.setState({
        hasFood: false,
        hasDrink: false,
      })
    }

    if (value == 'hasBoth') {
      this.setState({
        hasFood: true,
        hasDrink: true,
      })
    }

    if (value == 'hasDrink') {
      this.setState({
        hasFood: false,
        hasDrink: true,
      })
    }

    if (value == 'hasFood') {
      this.setState({
        hasFood: true,
        hasDrink: false,
      })
    }

  }

  sendTimeValue = (value) => {
    console.log('SEND TIME VALUE BELOW')
    console.log(value)

    // update for new stuff

    if (value == 'Days') {
      this.setState({
        dayModalOpen: true
      })
    }

    if (value == 'Time') {
      this.setState({
        timeModalOpen: true
      })
    }



    // if (value == 'All') {
    //   this.setState({
    //     currentDay: 'All',
    //   })
    // }

    // if (value == 'Today') {
    //   this.setState({
    //     currentDay: new moment().format('dddd'),
    //   })
    // }

    // if (value == 'Now') {
    //   this.setState({
    //     currentDay: new moment().format('dddd'),
    //     currentTime: new moment().format('Hmm'),
    //   })
    // }

    // if (value == 'Custom') {
    //   console.log('Run the custom function');
    // }

  }

  getModalState = (modal) => {
    console.log('Get modal state got ran');
    this.setState({
      open: modal
    })
  }

  getModalStateConfirm = (modal) => {
    console.log('Get modal state confirm got ran');
    this.setState({
      openconfirm: modal
    })
  }

  getModalDayState = (modal) => {
    console.log('Get modal state got ran');
    this.setState({
      dayModalOpen: modal
    })
  }

  getModalTimeState = (modal) => {
    console.log('Get modal state got ran');
    this.setState({
      timeModalOpen: modal
    })
  }

  getModalInfo = (modal) => {
    console.log('This is getModalInfo', modal);
  }

  setSelectedDay = (chosenDay) => {
    console.log('This is setSelectedDay', chosenDay);
    this.setState({
      selectedDay: chosenDay
    })
  }

  setSelectedType = (chosenType) => {
    if (chosenType == 'Food') {
      this.setState({
        selectedFood: true,
        selectedDrink: false
      })
    }

    if (chosenType == 'Drink') {
      this.setState({
        selectedFood: false,
        selectedDrink: true
      })
    }

    if (chosenType == 'Both') {
      this.setState({
        selectedFood: true,
        selectedDrink: true
      })
    }

    this.setState({
      selectedType: chosenType
    })
  }

  setSelectedTypeDay = (chosenType) => {

    this.setState({
      currentDay: chosenType
    })
  }

  setSelectedSummary = (summary) => {
    console.log('This is setSelectedSumm', summary);
    this.setState({
      selectedSumm: summary
    })
  }

  setSelectedStart = (start) => {
    console.log('This is setSelectedStart', start);
    this.setState({
      selectedStart: start
    })
  }

  setSelectedEnd = (end) => {
    console.log('This is setSelectedEnd', end);
    this.setState({
      selectedEnd: end
    })
  }

  setChangedTime = (time) => {
    //set this to the chaned time

    var changeTime = time;
    var presentTime = '';
    var noon = '12';


    if (time < 100) {
      presentTime = noon + ':' + time + ' AM';
      // changeTime = moment(time, 'Hmm');
      // presentTime = changeTime.format('hh:mm');
      // presentedTime = changeTime.format('h:mm');
      // console.log('YOU MONSTER its something', presentTime, presentedTime);
    }
    else {
      changeTime = moment(time, 'Hmm');
      presentTime = changeTime.format('h:mm a');
    }





    console.log('This is changed time', time);
    this.setState({
      currentTime: time,
      currentTimePresent: presentTime
    })
  }

  handleResetTime = () => {
    this.setState({
      currentTime: new moment().format('Hmm'),
      currentTimePresent: new moment().format('h:mm a'),

    })
  }





  sendDeal = () => {
    //add a confirm here. So like set a confirm modal to open that says like, are you sure and shows your information in an uneditable format.
    //If the person says they wanna edit, just set the state of the other deal open/closer to open again. I think the state is literally called open.

    this.setState({
      openconfirm: true
    })

    // this.updateDeals()

  }

  sendCancel = () => {
    //add a confirm here. So like set a confirm modal to open that says like, are you sure and shows your information in an uneditable format.
    //If the person says they wanna edit, just set the state of the other deal open/closer to open again. I think the state is literally called open.

    this.setState({
      selectedDay: new moment().format('dddd'),
      selectedType: 'Both',
      selectedFood: false,
      selectedDrink: false,
      selectedStart: 930,
      selectedEnd: 1230,
      selectedSumm: '',
    })


  }





  getUp = (value) => {

    console.log('Up working');
    let parsed = parseInt(value.vote, 10);
    let newUp = parsed + 1

    let user = {
      userId: this.state.currentUserId,
      userName: this.state.currentUserName
    }

    let dealdata = {
      name: value.name,
      user: user
    }

    console.log('DEAL DATA', dealdata);


    axios.put('/api/restaurants/votes/good', {
      user: user,
      newUp: newUp,
      busId: value.busId,
      Id: value.Id,
      dealdata: dealdata
    })
      .then((response) => {
        console.log('MEH RESPONSE DUDE UP', response);
        this.getRestaurants();
        this.getDeals();

        if (response.data.userId == 'failed') {
          console.log('HORRAY FAILURE!');
          this.setState({
            snackText: 'You may not up vote a post more than once',
            snackOpen: true
          })
        }


        //these didn't fix anything.
        //I think I have to wait to get it to reload the db and remap. Like some kind of override. Force update?

        // console.log('This is the API utils talking');
        // console.log('my response.data',response.data);
        // console.log(self);
        // console.log('current state of Restaurants', self.state.Restaurants);
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  getDown = (value) => {
    console.log('Down working');
    let parsed = parseInt(value.vote, 10);
    let newDown = parsed + 1

    let user = {
      userId: this.state.currentUserId,
      userName: this.state.currentUserName
    }


    let dealdata = {
      name: value.name,
      user: user
    }

    console.log('DEAL DATA', dealdata);


    axios.put('/api/restaurants/votes/bad', {
      user: user,
      newDown: newDown,
      busId: value.busId,
      Id: value.Id,
      dealdata: dealdata,

    })
      .then((response) => {
        console.log('MEH RESPONSE DUDE', response);
        this.getRestaurants();
        this.getDeals();

        if (response.data.userId == 'failed') {
          console.log('HORRAY FAILURE!');
          this.setState({
            snackText: 'You may not down vote a post more than once',
            snackOpen: true
          })
        }

        // console.log('This is the API utils talking');
        // console.log('my response.data',response.data);
        // console.log(self);
        // console.log('current state of Restaurants', self.state.Restaurants);
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  loggingIn = () => {
    this.setState({
      loggingIn: true
    })

  }

  getLoggingInState = (loginState) => {
    this.setState({
      loggingIn: loginState
    })
  }

  setLoggedInState = (response) => {
    this.setState({
      loggedIn: true,
      currentUserName: response.name,
      currentUserEmail: response.email,
      currentUserId: response.userID
    })

    //TARGET HERE

    const user = {
      userId: this.state.currentUserId,
      userEmail: this.state.currentUserEmail,
      userName: this.state.currentUserName,
    }


    axios.post('/api/restaurants/users', {
      userObject: user
    })
      .then((response) => {
        console.log('WE POSTED A USER OR SOMETHING');
        // this.getRestaurants();
        // this.getDeals();
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount = () => {
    console.log('Component indeed mounted');
    console.log(this);
    this.getRestaurants();
    this.getDeals();
    this.setState({
      currentTime: new moment().format('Hmm'),
      currentTimePresent: new moment().format('h:mm a'),
      currentDay: new moment().format('dddd')

    })

    // debugger

    setInterval(

      () => {
        // console.log('THIS IS ME',this.state.currentTime)
        this.setState({
          currentTime: new moment().format('Hmm'),
          currentTimePresent: new moment().format('h:mm a'),
          currentDay: new moment().format('dddd')

        })

      },
      1000 * 60
    );

    // console.log(this.state.currentTime)

    // debugger

    //some kind of get deals

    //some kind of get deals

  }

  handleClose = () => {
    this.setState(
      {
        snackText: 'Please login to use this feature',
        snackOpen: false
      });
  };

  handleOpen = () => {
    this.setState({ snackOpen: true });
  };

  // TODO consider get e.g
  //get visibleRestaurants () {}

  filterByTypeAndFlags = (restaurants) => {
    // let filteredRestaurants = restaurants.slice()
    let filteredRestaurants = restaurants;
    const { hasDrink, hasFood, foodCat, currentTime, currentDay } = this.state

    // console.log('This is the filtered Restaurants pre-filtering', filteredRestaurants);
    // console.log('This is my actual data', restaurants);

    //this filter is always running, it's just getting triggered by the state changes being sent back up by appbar 

    //the variable byCategory will filter the restaurants by food category first and return categories that are equal to this.state.foodCat in the array


    // First filter: the matching category




    if (foodCat !== 'All') {
      filteredRestaurants = restaurants.filter(restaurant => {
        return restaurant.categories.find(cat => cat.title === foodCat)
      })
    }

    if (!hasDrink && !hasFood) return filteredRestaurants

    filteredRestaurants = filteredRestaurants.filter(restaurant => {
      // console.log('I know bleep');
      if (hasDrink && !restaurant.hasDrink) return false
      if (hasFood && !restaurant.hasFood) return false

      return true
    })

    if (currentDay == 'All') return filteredRestaurants;

    console.log('BEFORE TIME WITH DEAL AND CATEGORY APPLIED', filteredRestaurants);

    if (filteredRestaurants == []) {
      return filteredRestaurants;
      console.log('There is no data under the category and deal specified.')
    }

    //this is becoming undefined sometimes, probably because filtered restuarants sometimes comes back as nothing

    filteredRestaurants = filteredRestaurants.filter(restaurant => {

      // console.log('THIS IS A TEST');
      var hasDeal = false;
      //the problem is that nothing is pass this test for restaurants

      console.log('The current restaurant being read', restaurant);
      if (restaurant == []) {
        console.log('This restaurant had no deals');
        return filteredRestaurants;
      }

      restaurant.deals.forEach(deal => {
        // console.log('THAT TIME SHIT RAN');

        // console.log(`The current proccessing deal has the day ${deal.timeDay} starts at ${deal.timeStart} and ends at ${deal.timeEnd}. The current time is ${currentTime}`);
        // console.log('deal object', deal);

        // if (deal.timeStart < currentTime && deal.timeEnd > currentTime && currentDay ==  deal.timeDay || 'All') {
        //   console.log(`CONDITION WAS TRUE`);
        //   console.log('This deal met the condition', currentDay, deal.timeDay, deal);
        //   hasDeal = true;
        // }

        //if I change this to some dumb word like butts, it doesn't pass, but if I say a day it works

        if (currentDay == deal.timeDay) {
          console.log(`This deal is for the day given`, currentDay, deal.timeDay, deal);
          hasDeal = true;
        }


      })

      return hasDeal
    })

    if (filteredRestaurants == []) {
      return filteredRestaurants;
      console.log('There is no data under the category, deal and day specified.')
    }

    //this is becoming undefined sometimes, probably because filtered restuarants sometimes comes back as nothing

    filteredRestaurants = filteredRestaurants.filter(restaurant => {

      // console.log('THIS IS A TEST');
      var hasTime = false;
      //the problem is that nothing is pass this test for restaurants

      console.log('The current restaurant being read POST DAY', restaurant);
      // if (restaurant == []) {
      //   console.log('This restaurant had no deals');
      //   return filteredRestaurants;
      // }

      restaurant.deals.forEach(deal => {
        // console.log('THAT TIME SHIT RAN');

        console.log(`The current proccessing deal has the day ${deal.timeDay} starts at ${deal.timeStart} and ends at ${deal.timeEnd}. The current time is ${currentTime}`);
        console.log('deal object', deal);

        if (deal.timeStart < currentTime && deal.timeEnd > currentTime) {
          console.log(`CONDITION WAS TRUE`);
          console.log('This deal met the condition', currentDay, deal.timeDay, deal);
          hasTime = true;
        }

        //if I change this to some dumb word like butts, it doesn't pass, but if I say a day it works

        // if (currentDay ==  deal.timeDay) {
        //   console.log(`CONDITION WAS TRUE`);
        //   console.log('This deal met the condition', currentDay, deal.timeDay, deal);
        //   hasDeal = true;
        // }


      })

      return hasTime
    })

    return filteredRestaurants
  };

  sendDemoValue = (valued) => {
    this.setState({
      value: valued
    })
  }

  setStepperFdValue = (valued) => {
    this.setState({
      stepperFdValue: valued
    })
  }

  setStepperValue = (valued) => {
    this.setState({
      stepperValue: valued
    })
  }


  render() {
    const { vertical, horizontal, drawerVisible, currentTab, Restaurants } = this.state
    const { classes } = this.props;

    const variantIcon = {
      info: InfoIcon,
    };

    const snackStyle = {
      backgroundColor: 'red'
    }

    const styles = {
      root: {
        background: 'red'
      }
    };



    // console.log(this.state.Restaurants);
    console.log('Restaraunt latitude below');
    console.log(Restaurants[0].coordinates.latitude);
    // console.log(this.state.Restaurants.restaurantName);

    return (
      <div>
        {console.log('THE CURRENT STATE OF WHOLE APP')}
        {console.log(this.state)}

        {/* You must login */}
        {/* <Snackbar
          ContentProps={{
            classes: {
                root: {background: 'red'}
              
            }
        }}
          // anchorOrigin={{ this.state.vertical, this.state.horizontal }
          variant="info"
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.snackOpen}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">I love snacks</span>}
        /> */}



        <MySnackbar
          open={this.state.snackOpen}
          anchorOrigin={{ vertical, horizontal }}
          onClose={this.handleClose}
          snackText={this.state.snackText}



        />

        <LoginModal
          loggingIn={this.state.loggingIn}
          getLoggingInState={this.getLoggingInState}
          setLoggedInState={this.setLoggedInState}

        />

        <MyDialog
          getModalState={this.getModalState}
          open={this.state.open}
          getModalInfo={this.getModalInfo}
          currentTab={this.currentTab}
          selectedDay={this.state.selectedDay}
          setSelectedDay={this.setSelectedDay}
          selectedType={this.state.selectedType}
          setSelectedType={this.setSelectedType}
          selectedStart={this.state.selectedStart}
          setSelectedStart={this.setSelectedStart}
          selectedEnd={this.state.selectedEnd}
          setSelectedEnd={this.setSelectedEnd}
          selectedSumm={this.state.selectedSumm}
          setSelectedSummary={this.setSelectedSummary}
          sendDeal={this.sendDeal}
          sendCancel={this.sendCancel}
        />

        <MyDialogConfirm
          getModalState={this.getModalState}
          getModalStateConfirm={this.getModalStateConfirm}
          openconfirm={this.state.openconfirm}
          getModalInfo={this.getModalInfo}
          currentTab={this.currentTab}
          selectedDay={this.state.selectedDay}
          setSelectedDay={this.setSelectedDay}
          selectedType={this.state.selectedType}
          setSelectedType={this.setSelectedType}
          selectedStart={this.state.selectedStart}
          setSelectedStart={this.setSelectedStart}
          selectedEnd={this.state.selectedEnd}
          setSelectedEnd={this.setSelectedEnd}
          selectedSumm={this.state.selectedSumm}
          setSelectedSummary={this.setSelectedSummary}
          sendDeal={this.sendDeal}
          updateDeals={this.updateDeals}
          sendCancel={this.sendCancel}
        />

        <MyDayModal
          getModalDayState={this.getModalDayState}
          dayModalOpen={this.state.dayModalOpen}
          currentDay={this.state.currentDay}
          setSelectedTypeDay={this.setSelectedTypeDay}
        />

        <MyTimeModal
          getModalTimeState={this.getModalTimeState}
          timeModalOpen={this.state.timeModalOpen}
          currentTime={this.state.currentTime}
          currentTimePresent={this.state.currentTimePresent}
          setChangedTime={this.setChangedTime}
          handleResetTime={this.handleResetTime}
        />

        <Appbar
          currentTab={currentTab}
          drawerVisible={drawerVisible}
          toggleDrawerVisibility={this.toggleDrawerVisibility}
          getModalState={this.getModalState}
          open={this.state.open}
          deals={this.state.Deals}
          getUp={this.getUp}
          getDown={this.getDown}
          loggingIn={this.state.loggingIn}
          loggedIn={this.state.loggedIn}
          getLoggingInState={this.getLoggingInState}
          setLoggedInState={this.setLoggedInState}
          currentUserName={this.state.currentUserName}
          currentUserId={this.state.currentUserId}
          handleOpen={this.handleOpen}
        />

        <SimpleMap
          Restaurants={this.filterByTypeAndFlags(Restaurants)}
          filterRestaurants={this.filterRestaurants}
        />

        {/* <DemoTabs
          foodCat={this.state.foodCat}
          onChange={this.handleTabChange}
          sendFoodCat={this.sendFoodCat}
          value={this.state.value}
          sendDemoValue={this.sendDemoValue}
        /> */}

        <Tabs 
          foodCat={this.state.foodCat}
          onChange={this.handleTabChange}
          sendFoodCat={this.sendFoodCat}
        />

        <Stepperfd position = 'fixed'
          onChange={this.handleTabChange}
          sendDealBoolean={this.sendDealBoolean}
          stepperFdValue = {this.state.stepperFdValue}
          setStepperFdValue = {this.setStepperFdValue}
        />

        {/* I don't know how to reference the data in clock, maybe with event.target*/}

        <Stepper position = 'fixed'
          currentDay = {this.state.currentDay}
          currentTime = {this.state.currentTime}
          currentTimePresent = {this.state.currentTimePresent}
          stepperValue={this.state.stepperValue}
          onChange={this.handleStepperChange} 
          sendTimeValue={this.sendTimeValue}
          stepperValue = {this.state.stepperValue}
          setStepperValue = {this.setStepperValue}

          />

      </div>
    )
  }
}

export default Home;