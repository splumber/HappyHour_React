import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


import { STATES } from 'mongoose';
const AnyReactComponent = ({ address1, address2, address3, restaurantName, hasFood, hasDrink, image, url, rating, review_count, id, onClick, thumbnail }) => <div myid = {id}>{<img  src={require('../Images/2xthumbnail.png')} id = {id} data-address1 = {address1} data-address2 = {address2} data-address3 = {address3} data-restaurantname = {restaurantName} data-hasfood = {hasFood} data-hasdrink = {hasDrink} data-image = {image} data-url = {url} data-rating = {rating} data-review_count = {review_count}  onClick={onClick}/>}</div>;

const button = ({ text }) => <div>{<button onClick={this.myFilter}><img src={require('../Images/1xLocation.png')} /></button>}</div>;


class SimpleMap extends Component {
  //the top of our lifecycle, and a state always has to be declared here
  constructor(props) {
    super(props);
    this.state = {
      center: props.center,
      latitude: props.latitude,
      longitude: props.longitude,
      categories: props.categories,
      Restaurants: props.Restaurants,
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

  checkGeolocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation unsupported!')
      return
    }

    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Show position called');
      if (!position.coords) {
        console.log('Coords not found')
        return
      }

      this.setState({
        coords: position.coords,
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    })
  }

  componentDidMount() {
    this.checkGeolocation()
  }

  handleRestaurantClick = (restaurant, event) => {
    // {_id: "wmV8YffVA6W24Vojkwjshw", coordinates: {…}, address: Array(1), categories: Array(4), restaurantName: "Treehouse Truck", …}
    // address: ["Orlando, FL 32805"]
    // categories: (4) [{…}, {…}, {…}, {…}]
    // coordinates: {latitude: 28.53755, longitude: -81.39191}
    // hasDrink: false
    // hasFood: false
    // image: "https://s3-media2.fl.yelpcdn.com/bphoto/HUOUo4fMgxV4Gu6tg8yv9Q/o.jpg"
    // phone: "(407) 346-8670"
    // rating: 4.5
    // restaurantAlias: "treehouse-truck-orlando-2"
    // restaurantName: "Treehouse Truck"
    // review_count: 88
    // url: "https://www.yelp.com/biz/treehouse-truck-orlando-2?adjust_creative=MApaTOiBmRxFFCPpctymVw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=MApaTOiBmRxFFCPpctymVw"
    // __v: 0
    // _id: "wmV8YffVA6W24Vojkwjshw"

    const [address1 = '', address2 = '', address3 = ''] = restaurant.address 

    const card = {
      name: restaurant.restaurantName,
      hasFood: restaurant.hasFood,
      hasDrink: restaurant.hasDrink,
      image: restaurant.image,
      url: restaurant.url,
      rating: restaurant.rating,
      reviewCount: restaurant.review_count,
      address1,
      address2,
      address3
    }

    this.props.filterRestaurants(card)
    // var myaddress3 = '';
    // var myaddress2 = '';

    // if (event.target.attributes.getNamedItem('data-address3') == null){
    //   console.log('This is null');
    //   myaddress3 = '';
    // }
    // else{
    //   myaddress3 = event.target.attributes.getNamedItem('data-address3').value
    // }

    // if (event.target.attributes.getNamedItem('data-address2') == null){
    //   console.log('This is null');
    //   myaddress2 = '';
    // }
    // else{
    //   myaddress2 = event.target.attributes.getNamedItem('data-address2').value
    // }

    // const myobject = {
    //   name: event.target.attributes.getNamedItem('data-restaurantname').value,
    //   hasFood: event.target.attributes.getNamedItem('data-hasfood').value,
    //   hasDrink: event.target.attributes.getNamedItem('data-hasdrink').value,
    //   image: event.target.attributes.getNamedItem('data-image').value,
    //   url: event.target.attributes.getNamedItem('data-url').value,
    //   rating: event.target.attributes.getNamedItem('data-rating').value,
    //   reviewCount: event.target.attributes.getNamedItem('data-review_count').value,
    //   address1: event.target.attributes.getNamedItem('data-address1').value,
    //   address2: myaddress2,
    //   address3: myaddress3,
    //   click: true
    // }

    // console.log(myobject);
  
    // this.props.filterRestaurants(myobject);

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
                  restaurant={restaurant}
                  key={restaurant._id}
                  lat={restaurant.coordinates.latitude}
                  lng={restaurant.coordinates.longitude}
                  onClick={this.handleRestaurantClick.bind(this, restaurant)}
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
                  onClick={this.handleRestaurantClick}

                />

              ))}

            </GoogleMapReact>


        }
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

