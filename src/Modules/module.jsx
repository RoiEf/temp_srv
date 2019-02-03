import React, { Component } from "react";
import axios from "axios";
import Service from "./service";
import { Card } from "react-bootstrap";

class Module extends Component {
  state = {
    sData: {
      id: "",
      name: "",
      src: "",
      alt: "",
      service: null
    }
  };

  styles = {
    module: {
      margin: "10px",
      border: "2px solid azure",
      borderRadius: "5px",
      padding: "5px",
      display: "grid",
      gridTemplateColumns: "1fr 3fr",
      gridTemplateRows: "max-content",
      textAlign: "center",
      color: "black"
    },
    logo: { gridRow: "1/3" },
    img1: {
      width: "150px",
      height: "150px"
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
    this.getIdData();
  }

  getIdData = () => {
    axios
      .post(this.serverLocation() + "about", {
        request: "id",
        id: this.props.myKey
      })
      .then(res => {
        const data = res.data;
        //  console.log(data);
        this.setState({
          sData: {
            id: data.id,
            name: data.name,
            src: data.photo,
            alt: data.name + " Logo",
            service: data.serviceAddress
          }
        });
      })
      .catch(error => console.log("something failed", error));
  };

  render() {
    return (
      <Card bg="light" border="secondary">
      <Card.Body>
        <Card.Img  variant="top" src={this.state.sData.src} alt={this.state.sData.alt} style={{ width: '150px', height: '150px' }} />
        <Card.Title>{this.state.sData.name}</Card.Title>
       </Card.Body>
       {this.state.sData.service ? (
          <Service
            address={this.state.sData.service}
            key={this.state.sData.id}
          />
        ) : (
          <div />
        )}
      </Card>
    );
  }
}
export default Module;
