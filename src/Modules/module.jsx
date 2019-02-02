import React, { Component } from "react";
import axios from "axios";
import Service from "./service";

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
    if (process.env.NODE_ENV === "production") {
      return "http://temp.efrati.info:44404/";
    } else {
      return "http://localhost:4000/";
    }
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
      <div className="module" style={this.styles.module}>
        <div className="logo" style={this.styles.logo}>
          <img
            className="img1"
            style={this.styles.img1}
            src={this.state.sData.src}
            alt={this.state.sData.alt}
          />
        </div>
        <div>{this.state.sData.name}</div>

        {this.state.sData.service ? (
          <Service
            address={this.state.sData.service}
            key={this.state.sData.id}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}
// <div>Server Data: {this.state.sData.service}</div>
export default Module;
