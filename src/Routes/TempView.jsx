import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import axios from "axios";

class TempView extends Component {
  constructor(props) {
    super(props);
    this.updateChartData = this.updateChartData.bind(this);
    this.getChartData = this.getChartData.bind(this);
  }

  state = {
    dsn: "134",
    chartData: {
      labels: [],
      datasets: [
        {
          label: "Temprature",
          type: "line",
          fill: false,
          borderColor: "blue",
          backgroundColor: "blue",
          data: [],
          yAxisID: "y-axis-1"
        },
        {
          label: "Humidity",
          type: "line",
          fill: true,
          backgroundColor: "pink",
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

    let index = data.length;
    index--;
    for (index; index >= 0; index--) {
/*      var iTime = new Date(data[index].ts).toLocaleString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit', 
      }); */
      arr1.push( data[index].ts); // iTime
      arr2.push( data[index].temprature );
      arr3.push( data[index].humidity );
    }


    var newChartData = {
      ...this.state.chartData
    };

    newChartData.labels = arr1;
    newChartData.datasets[0].data = arr2;
    newChartData.datasets[1].data = arr3;

    this.setScales(Math.min(...arr2),Math.max(...arr2),Math.max(...arr3));
    this.setState({ chartData: newChartData });
}

  getChartData() {
    axios
      .get(this.serverLocation() + "public/" + this.state.dsn)
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
      </React.Fragment>
    );
  }
}

export default TempView;
