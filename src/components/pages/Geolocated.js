import React from 'react';
import {geolocated} from 'react-geolocated';
import SimpleMap from './SimpleMap';




 
class Geolocated extends React.Component {

   constructor (props) {
     super(props)
    this.state = {    
    center: {
          lat: 0,
          lng: 0
        },
        zoom: 15

      }
    }
  


  showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            center: {
              ...prevState.center,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            zoom: 1,
            isMarkerShown: true
          }))
        }
      )
    } else {
      error => console.log(error)
    }
  }

  componentDidMount(){
    this.showCurrentLocation()
  }

 

  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>;

          <SimpleMap 
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          />
  }
}


 

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Geolocated);

