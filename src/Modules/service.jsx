import React, { Component } from "react";
import axios from "axios";

class Service extends Component {
  state = {
    id: null,
    blo: []
  };

  styles = {
    serviceList: {
      margin: "10px",
      textAlign: "left",
      verticalAlign: "text-top"
    }
  };

  componentDidMount() {
    this.getServiceData();
  }

  getServiceData = () => {
    axios
      .get(this.props.address)
      .then(res => {
        //        const dat = res.data.data;
        //        console.log(dat);

        this.setState({
          id: res.data.id,
          blo: res.data.data
        });
      })
      .catch(error => console.log("something failed", error));
  };

  render() {
    return (
      <div className="serviceList" style={this.styles.serviceList}>
        <ul>
          {this.state.blo.map(Item => (
            <li key={this.state.id + Item.id}>
              {Item.lable} : {Item.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Service;
