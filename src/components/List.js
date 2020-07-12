import React, { useState, useEffect } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import axios from 'axios';
import favorite from './data/favoriteshow'

const style = {
    table: {
        borderCollapse: 'collapse',
        width:'100%'
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            marginLeft:'5px',
            padding: '10px 15px',
            border:'none',
            backgroundColor: 'lightblue',
            fontSize: '14px',
            borderRadius: '5px',
            cursor: 'pointer'
        },
        favoriteBtn:{
            marginTop: '10px'
        }
    },
    squareStyle : {
        width: "30px",
        height: "30px",
        border : '1px solid black',
        backgroundColor: "#ddd",
        margin: "4px",
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        fontSize: "20px",
        color: "black"
    },
    divFlex : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}
function LoadingContainer() {
    return <div>Fancy loading container!</div>
}

const List = ({ search }) => {
    const [city, setCity] = useState(null);
    const [listCities, setListCities] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setListCities([]);
                const currentSearch = search ? 'search/' : '';
                const searchDynamic = search ? `?q=${search}` : '';
                //const url =`http://api.tvmaze.com/shows`;
                //http://api.tvmaze.com/search/shows?q=${search}
                //http://api.tvmaze.com/shows
                //setListCities(JSON.parse(localStorage.getItem("cities") || "[]"));
                //axios.get(`http://api.openweathermap.org/data/2.5/weather?APPID=d1e84cb66ca1147838f89a129355af31&q=${search}`)
                axios.get(`http://api.tvmaze.com/${currentSearch}shows${searchDynamic}`)
                    .then((data) => {debugger;
                    if(data.data) {
                       // this._app.purchaseDetails = purchaseDetails.concat();;
                        let arrayTemp = [];
                        let counter = 0;
                        data.data.map(item => {

                            const newCity = {
                                id: item?.show?.id || item.id,
                                name: item?.show?.name || item.name
                            }
                            arrayTemp.push(newCity);
                            favorite.push(newCity);
                            // counter++;
                            // if(counter === 10){
                            //     return false;
                            // }
                        });
                        setListCities(arrayTemp);

                        // setCity(newCity);
                        // if(listCities.length === 5){
                        //     listCities.pop();
                        // }
                        //
                        // const cityExists = listCities.find(item => item.id === newCity.id);
                        // if(!cityExists) {
                        //
                        //     listCities.unshift(newCity);
                        //     setListCities(listCities);
                        //     localStorage.setItem("cities", JSON.stringify(listCities));
                        // }
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

        return  (<tr key={index}>
            <td className="text-center"> <div className="square" style={style.squareStyle}></div></td>
            <td>{item.name}</td>
            <td className="text-center">
                <input type="radio" name={item.name} value={item.id}/>
            </td>
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

    return (
        <div>
            <div className="row">

                <div className="col-12">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th colSpan="3" className="text-center">
                                <button>View Favorites</button>
                            </th>
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

List.propTypes = {
}

const mapStateToProps = state => ({
    search: state.simpleReducer.search
});

export default connect(mapStateToProps, null)(GoogleApiWrapper({
    apiKey: ("AIzaSyB5UcwUUe4l2aXDcZbKvHZmcxi4rb04k8c"),
    LoadingContainer: LoadingContainer
})(List));

