import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import axios from "axios";
import api from "../api";

class TempView extends Component {
  constructor(props) {
    super(props);
    this.updateChartData = this.updateChartData.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  state = {
    dsn: "260",
    chartData: {
      labels: [],
      datasets: [
        {
          label: "Temp Indoors",
          type: "line",
          fill: false,
          borderColor: "blue",
          backgroundColor: "blue",
          data: [],
          yAxisID: "y-axis-1"
        },
        {
          label: "Temp Outdoors",
          type: "line",
          fill: false,
          borderColor: "aqua",
          backgroundColor: "aqua",
          data: [],
          yAxisID: "y-axis-1"
        },
        {
          label: "Humidity Indoors",
          type: "line",
          fill: true,
          backgroundColor: "pink",
          data: [],
          yAxisID: "y-axis-2"
        },
        {
          label: "Humidity Outdoors",
          type: "line",
          fill: true,
          backgroundColor: "red",
          data: [],
          yAxisID: "y-axis-2"
        }

      ]
    },
    chartOptions: {
      maintainAspectRatio: true,
      title: {
        display: "true",
        text: "Tempature and Humidity Dashboard",
        fontSize: 25
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
              displayFormats: {
                  quarter: 'MMM YYYY'
              }
          }
        }],
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            ticks: {
              min: 0,
              max: 50,
              stepSize: 5
            }
          },
          {
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            ticks: {
              min: 0,
              max: 80,
              stepSize: 10
            }
          }
        ]
      }
    }
  };

  componentDidMount() {
    this.getChartData();
  }

  setScales(arr2Min,arr2Max,arr3Max){
    if (arr3Max < 80) {
      arr3Max = Math.round(arr3Max/10)*10;
      arr3Max += 20;
    } else {
      arr3Max = 100;
    }

    if (arr2Min >= 0 && arr2Min < 30) {
      arr2Min = 0;
    } else {
      arr2Min = Math.round(arr2Min/10)*10;
      arr2Min -=20;
    }

    if (arr2Max >= 30) {
      arr2Max = 50;
    } else if (arr2Max < 30 && arr2Max >= -10) {
      arr2Max = Math.round(arr2Max/10)*10;
      arr2Max += 20;
    } else if (arr2Max < -10) {
      arr2Max = 0;
    } 
   
    var tempChartOptions = {
      ...this.state.chartOptions
    };
    
    tempChartOptions.scales.yAxes[0].ticks.min = arr2Min;
    tempChartOptions.scales.yAxes[0].ticks.max = arr2Max;
    tempChartOptions.scales.yAxes[1].ticks.max = arr3Max;

    this.setState({ chartOptions: tempChartOptions });
  }

  updateChartData(data) {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    let arr5 = [];

    let index = data.length;
    index--;
    for (index; index >= 0; index--) {

      if (data[index].iotId === 1) {
        arr1.push( data[index].ts);
        arr2.push( data[index].temprature );
        arr3.push( data[index].humidity );
      } else if (data[index].iotId === 2) {
        arr4.push( data[index].temprature );
        arr5.push( data[index].humidity );
      }
    }


    var newChartData = {
      ...this.state.chartData
    };

    newChartData.labels = arr1;
    newChartData.datasets[0].data = arr2;
    newChartData.datasets[1].data = arr4;
    newChartData.datasets[2].data = arr3;
    newChartData.datasets[3].data = arr5;

    this.setScales(Math.min(...arr2,...arr4),Math.max(...arr2,...arr4),Math.max(...arr3,...arr5));
    this.setState({ chartData: newChartData });
}

  getChartData() {
    axios
      .get(api.public + this.state.dsn)
      .then(res => this.updateChartData(res.data))
      .catch(error => console.error("something failed", error));
  }

  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1>Temp & Humidity Dashboard</h1>
        </Jumbotron>
        <Jumbotron>
          <Line data={this.state.chartData} options={this.state.chartOptions} />
        </Jumbotron>
        <Jumbotron>
          
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default TempView;
