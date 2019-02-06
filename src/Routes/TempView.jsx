import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import {Line} from 'react-chartjs-2';

class TempView extends Component {

  state = {
    chartData: {
      labels: [0,1,2,3,4,5,6,7,8,9],
      datasets: [
        {
          label: 'Temprature',
          backgroundColor: 'rgba(75,192,192,0.4)',
          data: [10,20,30,40,30,50,60,70,50,80]
        },
        {
          label: 'Humidity',
          backgroundColor: 'pink',
          data: [30,40,40,50,50,60,70,80,70,85]
        },
      ]
    }
  };

  render () {
  return (
    <React.Fragment>
      <Jumbotron>
        <h1>Temp & Humidity Dashboard</h1>
      </Jumbotron>
      <Jumbotron>
        <Line 
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false
          }}
        />
      </Jumbotron>
    </React.Fragment>
  );
}}

export default TempView;
