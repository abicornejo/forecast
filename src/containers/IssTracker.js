import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import MapContainer from './../components/MapContainer'
const IssTracker = () => {
    const [ trackerState, setTrackerState ]= useState({
        issInfo:{velocity:'', latitude:'', longitude:''},
        error: false,
    });

    useEffect(() => {
        setTimeout(() => {
            Axios.get("https://api.wheretheiss.at/v1/satellites/25544.json")
                .then(response => {
                    setTrackerState({
                        issInfo:{velocity:response.data.velocity, latitude:response.data.latitude, longitude:response.data.longitude},
                        error: false,
                    })
                })
                .catch(error => {
                    setTrackerState({
                        issInfo:{velocity:'', latitude:'', longitude:''},
                        error: false,
                    })
                })
        }, 1000);
    });

    return(
        <MapContainer velocity= {trackerState.issInfo.velocity} latitude= {trackerState.issInfo.latitude} longitude= {trackerState.issInfo.longitude}/>
    )
}
export default IssTracker;
