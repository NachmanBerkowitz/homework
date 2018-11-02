import React, { Component } from 'react'
import ZipInput from './ZipInput';
import WeatherDisplay from './WeatherDisplay';

export default class Weather extends Component {

  state={
    current:{
      city:'{enter zip}',
    weather:''
    },
    haveData:false
  }

  async fetchWeather(zip){
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=faee83170cf031bea8f21d2ec064e4d7&units=imperial`)
    const weather = await data.json();
    console.log(weather);
    if(weather.cod === 200){
      document.title = weather.name;
      this.setState({current:{weather:weather.main.temp,
      city:weather.name}})
    }else{
      this.setState({current:{weather:'',
        city:'{You have entered an invalid zip}'}})
    }
  }

  render() {
    
    return (
      <div>
        <ZipInput updateCurrentZip={
          (zip)=>{
            this.setState({currentZip:zip});
            this.fetchWeather(zip);
      }}/>
        <WeatherDisplay current={this.state.current}/>
      </div>
    )
  }
}
