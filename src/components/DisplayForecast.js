import React, { useState, useEffect } from 'react';
// si timport { GoogleMapReact, Map, GoogleApiWrapper, Marker } from 'google-map-react'
import { connect } from 'react-redux';
import axios from 'axios';
//import {simpleAction} from './../actions/simpleAction'
// import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types'
import { compose } from 'redux';
import IssTracker from './../containers/IssTracker';

const DisplayForecast = ({ search }) => {
    const [foreCastData, setForeCastData] = useState([]);
    const [map, setMap] = useState([]);


    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };


    useEffect(() => {
        (async () => {
            try {

                console.log('search weather', search);
                const resultSearch = await axios.get(`http://api.openweathermap.org/data/2.5/weather?APPID=74d4d0f36ee698904c98ea64fb2fbe89&q=${search}`);
                console.log('resultSearch', resultSearch);
                setForeCastData(resultSearch.data);
            } catch (error) {
                setForeCastData(null);
                console.log('error', error);
            };
        })();

    }, [search]);

    console.log('foreCastData', foreCastData);

    return (
        <div>

            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>Temperature</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                    <th>Max temperature</th>
                    <th>Min temperature</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody id="myTable">
                <tr>
                    <td>{foreCastData?.main?.temp}</td>
                    <td>{foreCastData?.main?.pressure}</td>
                    <td>{foreCastData?.main?.humidity}</td>
                    <td>{foreCastData?.main?.temp_max}</td>
                    <td>{foreCastData?.main?.temp_min}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <IssTracker></IssTracker>
        </div>
    )
}

DisplayForecast.propTypes = {
}


const mapStateToProps = state => ({
    search: state.simpleReducer.search
});
//
// const enhance = compose(
//     GoogleApiWrapper,
//     connect(mapStateToProps, DisplayForecast)
// );

// export default connect(mapStateToProps,simpleAction)(
// //     GoogleApiWrapper({
// //     apiKey: 'AIzaSyDEqT72zgRTMzif-S3Pz4BXKiMcIu0c9vc'
// //     })(DisplayForecast));

// export default connect(
//     mapStateToProps,
//      null
// )(
//     GoogleApiWrapper({
//         apiKey: 'AIzaSyCw1Cu5QmZqsFLWq-D7m12E3Qqjjj13xWY'
//     })(DisplayForecast)
// )

// export default enhance(DisplayForecast);

// export default connect(mapStateToProps,simpleAction)(mapStateToProps, null)

// export default connect(mapStateToProps,null)(
//     GoogleApiWrapper({
//         apiKey: 'AIzaSyDEqT72zgRTMzif-S3Pz4BXKiMcIu0c9vc'
//     })(DisplayForecast));

// export default connect(mapStateToProps, null)(
//     GoogleApiWrapper({
//         apiKey: 'AIzaSyDEqT72zgRTMzif-S3Pz4BXKiMcIu0c9vc'
//     })(DisplayForecast)
// );
export default connect(mapStateToProps, null)(DisplayForecast);
