import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { withRouter } from 'react-router-dom';



import { STATES } from 'mongoose';
const AnyReactComponent = ({ address1, address2, address3, restaurantName, hasFood, hasDrink, image, url, rating, review_count, id, onClick, thumbnail }) => <div myid = {id}>{<img  src={require('../Images/2xthumbnail.png')} id = {id} data-address1 = {address1} data-address2 = {address2} data-address3 = {address3} data-restaurantname = {restaurantName} data-hasfood = {hasFood} data-hasdrink = {hasDrink} data-image = {image} data-url = {url} data-rating = {rating} data-review_count = {review_count}  onClick={onClick}/>}</div>;
const AnyReactComponentGrey = ({ address1, address2, address3, restaurantName, hasFood, hasDrink, image, url, rating, review_count, id, onClick, thumbnail }) => <div myid = {id}>{<img  src={require('../Images/2xthumbnailgrey.png')} id = {id} data-address1 = {address1} data-address2 = {address2} data-address3 = {address3} data-restaurantname = {restaurantName} data-hasfood = {hasFood} data-hasdrink = {hasDrink} data-image = {image} data-url = {url} data-rating = {rating} data-review_count = {review_count}  onClick={onClick}/>}</div>;

const button = ({ text }) => <div>{<button onClick={this.myFilter}><img src={require('../Images/1xLocation.png')} /></button>}</div>;


class SimpleMap extends Component {
  //the top of our lifecycle, and a state always has to be declared here
  constructor(props) {
    super(props);
    this.state = {
      center: {},
      latitude: '',
      longitude: '',
      categories: [],
      Restaurants: props.Restaurants,
      //have to fix this because it won't allow our state to update
    }
    // this.state = {
    //   center: props.center,
    //   latitude: props.latitude,
    //   longitude: props.longitude,
    //   categories: props.categories,
    //   Restaurants: props.Restaurants,
    //   //have to fix this because it won't allow our state to update
    // }
  }

  // the second level of our lifecycle, a static prop that just exists
  static defaultProps = {
    center: {
      lat: 28.5383355,
      lng: -81.37923649999999
    },
    zoom: 11
  };

  // static getDerivedStateFromProps = (props, state) => {
  //   this.setState({
  //     Restaurants: props.Restaurants,
  //   })
  // }

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
          lng: position.coords.longitude,
        },
        Restaurants: this.props.Restaurants,
      })
    })
  }

  componentDidMount() {
    this.checkGeolocation()
  }

  // componentDidUpdate(){

  //   this.setState({
  //     center: this.props.center,
  //     latitude: this.props.latitude,
  //     longitude: this.props.longitude,
  //     categories: this.props.categories,
  //     Restaurants: this.props.Restaurants,
  //   })

  //   //An update loop

  // }

  handleRestaurantClick = (restaurant, event) => {
   
    const [address1 = '', address2 = '', address3 = ''] = restaurant.address 

    const card = {
      id: restaurant._id,
      name: restaurant.restaurantName,
      alias: restaurant.restaurantAlias,
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
  }

  componentWillReceiveProps(nextProps) {
   this.setState({
     ...nextProps
   })
  }


  render() {
    // console.log('The Simple Map Render was called again');
    // console.log(this.props.Restaurants);
    // for some reason these two things are not the same even though the parent has made a change to props and thusly re-rendered the component, and the state is still set to the old array
    // console.log(this.state.Restaurants);
    // console.log(this.state)

   
    return (
      // Important! Always set the container height explicitly
      //API Key is bootstrapURLKeys
      <div style={{ height: '100vh', width: '100%' }}>
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

              {this.state.Restaurants.map(restaurant => {

              console.log('A restaurant being logged', restaurant.deals);
                if (restaurant.deals == undefined || restaurant.deals.length < 1) {
                  console.log('This restaurant is empty', restaurant.deals);
                  
                  return <AnyReactComponentGrey
                  restaurant={restaurant}
                  key={restaurant._id}
                  lat={restaurant.coordinates.latitude}
                  lng={restaurant.coordinates.longitude}
                  onClick={this.handleRestaurantClick.bind(this, restaurant)}
                />
                }

                // console.log('restaurant', restaurant)
                return  <AnyReactComponent
                restaurant={restaurant}
                key={restaurant._id}
                lat={restaurant.coordinates.latitude}
                lng={restaurant.coordinates.longitude}
                onClick={this.handleRestaurantClick.bind(this, restaurant)}
              />

              })}


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

export default withRouter(SimpleMap);















