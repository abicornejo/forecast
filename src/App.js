import React,{ Component, useState, useEffect } from 'react';
import Search from './components/Search';
import DisplayForecast from './components/DisplayForecast';
import './App.css';

const App = () => {

  return (
      <div className="container">
        <Search />
        <DisplayForecast />
      </div>
  );
}

export default App;
