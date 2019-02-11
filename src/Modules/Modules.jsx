import React, { Component } from "react";
// import axios from "axios";
import Module from "./module";
import { CardDeck } from "react-bootstrap";
import api from "../api";

class Modules extends Component {
  state = {
    ids: {
      id: []
    }
  };
  componentDidMount() {
    this.getIds();
  }
  getIds = () => {
    fetch(api.about, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ request: "ids" })
    })
      .then(response => response.json())
      .then(parsedJSON => this.setState({ ids: { id: parsedJSON.id } }))
      .catch(error => console.log("something failed", error));
  };

  render() {
    return (
      <CardDeck>
        {this.state.ids.id.map(tag => (
          <Module myKey={tag} key={tag} />
        ))}
      </CardDeck>
    );
  }
}

export default Modules;
