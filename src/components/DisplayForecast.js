import React, { useState, useEffect } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import axios from 'axios';

const LoadingContainer = (props) => (
    <div>Fancy loading container!</div>
)

const DisplayForecast = ({ search }) => {
    const [foreCastData, setForeCastData] = useState([]);
    const [listCities, setListCities] = useState([]);



    useEffect(() => {
        (async () => {
            try {
                setListCities(JSON.parse(localStorage.getItem("cities") || "[]"));
                axios.get(`http://api.openweathermap.org/data/2.5/weather?APPID=d1e84cb66ca1147838f89a129355af31&q=${search}`)
                .then((data) => {debugger;
                    if(data) {
                        setForeCastData(data.data);



                        const newCity = {
                            id: data.data.id,
                            name: data.data.name,
                            coords: data.data.coords,
                            main: data.data.main
                        }
                        listCities.push(newCity);
                        localStorage.setItem("cities", JSON.stringify(listCities));
                    }else {
                        setForeCastData(null);
                    }
                })
                .catch(error => {
                    setForeCastData(null);
                });
            } catch (error) {
                setForeCastData(null);
            };
        })();

    }, [search]);

    console.log('foreCastData', foreCastData);

    // const rows = listCities.map(item, index =>
    //
    //           return  (<tr key={index}>
    //                 <td>{item.name}</td>
    //                 <td>{item.main.temp}</td>
    //                 <td>{item.main.pressure}</td>
    //                 <td>{item.main.humidity}</td>
    //                 <td>{item.main.temp_max}</td>
    //                 <td>{item.main.temp_min}</td>
    //                 <td></td>
    //             <tr/>);
    //
    //
    // );
    // const rows = listCities.map((item, index) => {
    //     return (<tr key={index}>
    //         <td>{item.name}</td>
    //          <td>{item.main.temp}</td>
    //          <td>{item.main.pressure}</td>
    //          <td>{item.main.humidity}</td>
    //          <td>{item.main.temp_max}</td>
    //          <td>{item.main.temp_min}</td>
    //          <td></td>
    //      <tr/>);
    // });

    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <div>
                        <h3>Details</h3>
                        <label htmlFor=""><b>Temperature: </b></label>
                        <span>{foreCastData?.main?.temp}</span><br/>
                        <label htmlFor=""><b>Pressure: </b></label>
                        <span>{foreCastData?.main?.pressure}</span><br/>
                        <label htmlFor=""><b>Humidity: </b></label>
                        <span>{foreCastData?.main?.humidity}</span><br/>
                        <label htmlFor=""><b>Max temperature: </b></label>
                        <span>{foreCastData?.main?.temp_max}</span><br/>
                        <label htmlFor=""><b>Min temperature: </b></label>
                        <span>{foreCastData?.main?.temp_min}</span>
                    </div>
                </div>
                <div className="col-9">
                    { foreCastData?.coord?.lat ?
                        <Map  google={window.google}
                              style={{width: '100%', height: '100%', position: 'relative'}}
                              className={'map'}
                              zoom={14}>
                            <Marker
                                name={foreCastData?.name}
                                position={{lat: foreCastData.coord.lat, lng: foreCastData.coord.lon}} />
                            <Marker />
                        </Map>
                        : null
                    }
                </div>
                <div className="col-12">
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
                        {/*{rows}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

DisplayForecast.propTypes = {
}

const mapStateToProps = state => ({
    search: state.simpleReducer.search
});

export default connect(mapStateToProps, null)(GoogleApiWrapper({
    apiKey: ("AIzaSyDE2XTOO3mc5CnZSdVG0xVfs8L9DidM__0"),
    LoadingContainer: LoadingContainer
})(DisplayForecast));

