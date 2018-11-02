import React, { Component } from 'react'

export default class WeatherDisplay extends Component {
  render() {
    const {city,weather} = this.props.current;
    return (
      <div>
        <p>The weather in {city} is: {weather}</p>
      </div>
    )
  }
}
