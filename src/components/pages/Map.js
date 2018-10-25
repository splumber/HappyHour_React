import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MapComponent from './MapComponent'

class MapView extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLatLng: props.currentLatLng,
      geolocationEnabled: false,
      isMarkerShown: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
      this.setState({
          currentLatLng: nextProps.currentLatLng,
          geolocationEnabled: nextProps.geolocationEnabled
      })
      this.delayedShowMarker()
  }

  componentWillUpdate(){
    this.getGeoLocation()
  }

  componentDidMount() {
    this.props.handleCurrentLocation()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getGeoLocation()
      this.setState({ isMarkerShown: true })
    }, 5000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(prevState => ({
            center: {
                ...prevState.center,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            
          }))
        }
      )
    } else {
      error => console.log(error)
    }
  }

  render() {
    return (
      <MapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLatLng}
      />
    )
  }
}

export default MapView;