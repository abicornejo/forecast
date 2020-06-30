import React, { useState, useEffect } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import axios from 'axios';
import Details from './../components/Details';

function LoadingContainer() {
    return <div>Fancy loading container!</div>
}

const DisplayForecast = ({ search }) => {
    const [city, setCity] = useState(null);
    const [listCities, setListCities] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setListCities(JSON.parse(localStorage.getItem("cities") || "[]"));
                axios.get(`http://api.openweathermap.org/data/2.5/weather?APPID=d1e84cb66ca1147838f89a129355af31&q=${search}`)
                .then((data) => {
                    if(data) {
                        const newCity = {
                            id: data.data.id,
                            name: data.data.name,
                            coord: data.data.coord,
                            main: data.data.main
                        }
                        setCity(newCity);
                        if(listCities.length === 5){
                            listCities.pop();
                        }

                        const cityExists = listCities.find(item => item.id === newCity.id);
                        if(!cityExists) {

                            listCities.unshift(newCity);
                            setListCities(listCities);
                            localStorage.setItem("cities", JSON.stringify(listCities));
                        }
                    }else {
                        setCity(null);
                    }
                })
                .catch(error => {
                    setCity(null);
                });
            } catch (error) {
                setCity(null);
            };
        })();

    }, [search]);

    const rows = listCities.map((item, index ) => {

        return  (<tr key={index} onClick={() => selectRowCity(item.id)}>
            <td>{item.name}</td>
            <td>{item.main.temp}</td>
            <td>{item.main.pressure}</td>
            <td>{item.main.humidity}</td>
            <td>{item.main.temp_max}</td>
            <td>{item.main.temp_min}</td>
            <td><button onClick={(e)=>removeCity(e,item.id)} type="button" className="btn btn-outline-danger btn-sm">Remove</button></td>
        </tr>)
    });

    const removeCity = (e, id) => {
        e.preventDefault();
        setListCities(JSON.parse(localStorage.getItem("cities") || "[]"));
        if(listCities.length) {
            const lstTemp = listCities.filter(city => city.id !== id);
            setListCities(lstTemp);
            localStorage.setItem("cities", JSON.stringify(lstTemp));
        }
    }

    const selectRowCity = (id) => {
        setListCities(JSON.parse(localStorage.getItem("cities") || "[]"));
        if(listCities.length) {
            const citySelected = listCities.find(city => city.id === id);
            if(citySelected){
                setCity(citySelected);
            }
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <Details city={city} />
                </div>
                <div className="col-9" >
                    { city?.coord?.lat ?
                        <Map  google={window.google}
                              style={{width: '100%', height: '100%', position: 'relative'}}
                              className={'map'}
                              center={{
                                  lat: city.coord.lat,
                                  lng:  city.coord.lon
                              }}
                              zoom={14}>
                            <Marker
                                name={city?.name}
                                position={{lat: city.coord.lat, lng: city.coord.lon}} />
                            <Marker />
                        </Map>
                        : null
                    }
                </div>
                <div className="col-12">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature</th>
                            <th>Pressure</th>
                            <th>Humidity</th>
                            <th>Max temperature</th>
                            <th>Min temperature</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody id="myTable">
                        {rows}
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
    apiKey: ("AIzaSyB5UcwUUe4l2aXDcZbKvHZmcxi4rb04k8c"),
    LoadingContainer: LoadingContainer
})(DisplayForecast));

