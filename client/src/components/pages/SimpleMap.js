import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Drawer from '../Drawer/Drawer';


import { STATES } from 'mongoose';
const AnyReactComponent = ({ address1, address2, address3, restaurantName, hasFood, hasDrink, image, url, rating, review_count, id, onClick, thumbnail }) => <div myid = {id}>{<img  src={require('../Images/2xthumbnail.png')} id = {id} data-address1 = {address1} data-address2 = {address2} data-address3 = {address3} data-restaurantname = {restaurantName} data-hasfood = {hasFood} data-hasdrink = {hasDrink} data-image = {image} data-url = {url} data-rating = {rating} data-review_count = {review_count}  onClick={onClick}/>}</div>;

// const button = ({ text }) => <div>{<button onClick={this.myFilter}><img src={require('../Images/1xLocation.png')} /></button>}</div>;


class SimpleMap extends Component {
  //the top of our lifecycle, and a state always has to be declared here
  constructor(props) {
    super(props);
    this.state = {
      center: props.center,
      latitude: props.latitude,
      longitude: props.longitude,
      categories: props.categories,
      Restaurants: props.Restaurants

    }
  }





  // the second level of our lifecycle, a static prop that just exists
  static defaultProps = {
    center: {
      lat: 28.5383355,
      lng: -81.37923649999999
    },
    zoom: 11
  };

  componentDidMount() {

    // var x = document.getElementById("demo");
    let y = 'Geolocation unsupported';
    console.log('I was called');

    if (navigator.geolocation) {
      console.log('Geolocation enabled');
      navigator.geolocation.getCurrentPosition((position) => {

        console.log('Show position called');
        if (position.coords) {
          this.setState({
            coords: position.coords,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        }
        // return "Latitude: " + position.coords.latitude +
        // "<br>Longitude: " + position.coords.longitude;
      });

    }

    else {
      return y;
    }


  }

  myFunction = (event) => {


    var myaddress3 = '';
    var myaddress2 = '';

    if (event.target.attributes.getNamedItem('data-address3') == null){
      console.log('This is null');
      myaddress3 = '';
    }
    else{
      myaddress3 = event.target.attributes.getNamedItem('data-address3').value
    }

    if (event.target.attributes.getNamedItem('data-address2') == null){
      console.log('This is null');
      myaddress2 = '';
    }
    else{
      myaddress2 = event.target.attributes.getNamedItem('data-address2').value
    }

    const myobject = {
      name: event.target.attributes.getNamedItem('data-restaurantname').value,
      hasFood: event.target.attributes.getNamedItem('data-hasfood').value,
      hasDrink: event.target.attributes.getNamedItem('data-hasdrink').value,
      image: event.target.attributes.getNamedItem('data-image').value,
      url: event.target.attributes.getNamedItem('data-url').value,
      rating: event.target.attributes.getNamedItem('data-rating').value,
      reviewCount: event.target.attributes.getNamedItem('data-review_count').value,
      address1: event.target.attributes.getNamedItem('data-address1').value,
      address2: myaddress2,
      address3: myaddress3
    }

    console.log(myobject);
  
    this.props.filterRestaurants(myobject);

    // let callback = this.state.Restaurants[0].coordinates.latitude;
    // console.log(this.state.Restaurants[0].coordinates.latitude);
    // // this.setState({ testState: callback })

    // console.log("A restaurant is clicked");
  }


  render() {
    console.log('I was rendered');
    console.log(this.props);
    console.log(this.state.latitude);
    console.log(this.state.Restaurants);
    console.log(this.state.Restaurants[0].categories)
    // console.log(this.state.coords);
    return (
      // Important! Always set the container height explicitly
      //API Key is bootstrapURLKeys
      <div style={{ height: '100vh', width: '100%' }}>
      <button> IS ME! </button>
        {
          this.state.coords && this.state.center ?
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA46ttkQXjotLXDI1xpNOCkUz5GCRRrQTI' }}
              defaultCenter={{
                lat: 28.5383355,
                lng: -81.37923649999999
              }}
              center={this.state.center}
              defaultZoom={this.props.zoom}
            >

              {this.state.Restaurants.map(restaurant => (
                <AnyReactComponent
                  id={restaurant._id}
                  key={restaurant._id}
                  lat={restaurant.coordinates.latitude}
                  lng={restaurant.coordinates.longitude}
                  address1={restaurant.address[0]}
                  address2={restaurant.address[1]}
                  address3={restaurant.address[2]}
                  restaurantName = {restaurant.restaurantName}
                  hasFood = {restaurant.hasFood}
                  hasDrink ={restaurant.hasFood}
                  image = {restaurant.image}
                  url = {restaurant.url}
                  text={'This is some text'}
                  rating = {restaurant.rating}
                  review_count = {restaurant.review_count}
                  thumbnail = '../Images/1xLocation.png'
                  onClick={this.myFunction}

                />

              ))}


            </GoogleMapReact>

            :

            // <div>Nothing</div>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA46ttkQXjotLXDI1xpNOCkUz5GCRRrQTI' }}
              defaultCenter={{
                lat: 28.5383355,
                lng: -81.37923649999999
              }}
              defaultZoom={11}
            >
              {this.state.Restaurants.map(restaurant => (
                <AnyReactComponent
                  id={restaurant._id}
                  key={restaurant._id}
                  lat={restaurant.coordinates.latitude}
                  lng={restaurant.coordinates.longitude}
                  address={restaurant.address[0]}
                  text={'This is some text'}
                  onClick={this.myFunction}
                  onClick={this.toggleDrawer} 

                />

              ))}

            </GoogleMapReact>


        }
        {/* <div>
        This is our Div
      </div>
      <div>
        {this.state.latitude}
      </div> */}


      </div>
    );
  }
}

export default SimpleMap;




// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import Geolocated from './Geolocated';
// import showCurrentLocation from "../currentLocation/CurrentLocation";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export class SimpleMap extends Component {
//   constructor (props) {
//     super(props)
//    this.state = {    
//    center: {
//          lat: 0,
//          lng: 0
//        },
//        zoom: 15

//      }
//    }

//    static defaultProps = {

//     center: {
//       lat: 28.5383355,
//       lng: -81.37923649999999
//     },
//     zoom: 11
//   };

//  showCurrentLocation = () => {

//    if (navigator.geolocation) {
//      navigator.geolocation.getCurrentPosition(
//        position => {
//          this.setState(prevState => ({
//            center: {
//              ...prevState.center,
//              lat: position.coords.latitude,
//              lng: position.coords.longitude
//            },
//            zoom: 1,
//            isMarkerShown: true
//          }))
//        }
//      )
//    } else {
//      error => console.log(error)
//    }
//  }

//  componentDidMount(){
//    this.showCurrentLocation()
//  }


//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       //API Key is bootstrapURLKeys
//       <div style={{ height: '100vh', width: '100%' }}>


//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyA46ttkQXjotLXDI1xpNOCkUz5GCRRrQTI'}}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent
//             lat={28.6024274}
//             lng={-81.20005989999999}
//             text={'This is some text'}
//           />
//         </GoogleMapReact>

//         <Geolocated
//           defaultCenter={this.props.center}
//         />





//       </div>
//     );
//   }
// }

// export default SimpleMap;

