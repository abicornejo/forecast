import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { simpleAction } from '../actions/simpleAction';

const Search = ({ simpleAction }) => {
    const [query, setQuery] = useState('');
    console.log('query', query);

    const sendCityName = (e) => {
        e.preventDefault();
        simpleAction(query);
    }
    const sendCityNameByEnter = (e) => {
        if (e.keyCode === 13) {
            simpleAction(query);
            return false;
        }
    }

    // useEffect(() => {
    //    // simpleAction(query);
    // }, [query])

    return (
        <div>
            <nav className="navbar navbar-light nav-search">
                <a className="navbar-brand">FORECAST</a>
                <form className="form-inline">
                    <input onKeyPress={(e) => sendCityNameByEnter(e)} value={query} onChange={(e) => { setQuery(e.target.value) }} className="form-control mr-sm-2" type="search" placeholder="CityName" aria-label="Search"/>
                    <button onClick={(e) => sendCityName(e)} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        </div>
    )
}

Search.propTypes = {

}

const mapDispatchToProps = dispatch => ({
    simpleAction: (query) => dispatch(simpleAction(query))
})


export default connect(null, mapDispatchToProps)(Search);
