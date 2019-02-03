import React, { Component } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";

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
      <ListGroup variant="flush">
          {this.state.blo.map(Item => (
            <ListGroup.Item key={this.state.id + Item.id}>
              {Item.lable} : {Item.value}
            </ListGroup.Item>
          ))}
      </ListGroup>
    );
  }
}

export default Service;
