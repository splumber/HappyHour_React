// import React from "react";
// import {geolocated} from 'react-geolocated';

export default function showCurrentLocation () {
  let myLatLng = {
    lat: 49.2527,
    lng: -123.1207
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        myLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }
    )
  } else {
    error => console.log(error)
  }
}
