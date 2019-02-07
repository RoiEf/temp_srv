import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import {parse, stringify} from 'flatted/esm';

class TempView extends Component {
  constructor(props) {
    super(props);
    this.updateChartData = this.updateChartData.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  state = {
    dsn: "",
    axiosData: [],
    chartData: {
      labels: [0,1,2,3,4,5,6,7,8,9,],
      datasets: [
        {
          label: 'Temprature',
          backgroundColor: 'rgba(75,192,192,0.4)',
          data: [0,10,20,30,20,4,20,50,40,10]
        },
        {
          label: 'Humidity',
          backgroundColor: 'pink',
          data: [5,20,40,40,50,60,50,60,50,20]
        },
      ]
    }

  };
  serverLocation() {
    //    if (process.env.NODE_ENV === "production") {
          return "http://temp.efrati.info:44404/";
    //    } else {
    //      return "http://localhost:4000/";
    //    }
      }
    
  componentDidMount() {
    this.getChartData();
  }

  updateChartData() {
    let myState = parse(stringify(this.state.chartData));
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    for (let index = 0; index < this.state.axiosData.length; index++) {
      arr1.push(this.state.axiosData[index].ts);
      arr2.push(this.state.axiosData[index].temprature);
      arr3.push(this.state.axiosData[index].humidity);
    }

    myState.labels = arr1;
    myState.datasets[0].data = arr2;
    myState.datasets[1].data = arr3;

    console.log(myState);
    
    this.setState({chartData: myState});
}

  getChartData(){
    axios
      .get(this.serverLocation() + "public/" + this.state.dsn)
      .then(res => {
        this.setState({axiosData: res.data});
      })
      .then(
        this.updateChartData
      )
      .catch(error => console.error("something failed", error));
  }

  render () {

    let myData = parse(stringify(this.state.chartData));

  return (
    <React.Fragment>
      <Jumbotron>
        <h1>Temp & Humidity Dashboard</h1>
      </Jumbotron>
      <Jumbotron>
        <Line 
          data={myData}
          options={{
            maintainAspectRatio: true
          }}
        />
      </Jumbotron>
    </React.Fragment>
  );
}}

export default TempView;
