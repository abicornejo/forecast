import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component} from 'react';
import HocAux from './../hoc/HocAux';
//import {GoogleApiWrapper} from 'GoogleMapsReactComponent';
const mapStyles = {
    width: '100%',
    height: '100%',
};

const MapContainer = props => {
    let iconMarker = new window.google.maps.MarkerImage(
        "https://img.icons8.com/color/48/000000/satellite.png",
        null,
        null,
        null,
        new window.google.maps.Size(32, 32)
    );

    let mapTrack = ((props.latitude !== "") ?
        <Map google={props.google} zoom={5} style={mapStyles} initialCenter={{ lat: props.latitude, lng: props.longitude }} >
            <Marker position={{ lat: props.latitude, lng: props.longitude }}
                    icon={iconMarker}
            />
        </Map> : null)


    return (
        <HocAux>
            {mapTrack}
        </HocAux>
    );
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDEqT72zgRTMzif-S3Pz4BXKiMcIu0c9vc")
})(MapContainer)
