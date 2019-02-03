import React, { Component } from "react";
// import axios from "axios";
import Module from "./module";
import { CardDeck, Container } from "react-bootstrap";

class Modules extends Component {
  state = {
    ids: {
      id: []
    }
  };

serverLocation() {
 //   if (process.env.NODE_ENV === "production") {
      return "http://temp.efrati.info:44404/";
 //   } else {
 //     return "http://localhost:4000/";
 //   }
  }

  componentDidMount() {
    this.getIds();
  }
  getIds = () => {
    fetch(this.serverLocation() + "about", {
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
      <Container style={{ marginTop: '10px'}}>
      <CardDeck>
        {this.state.ids.id.map(tag => (
          <Module myKey={tag} key={tag} />
        ))}
      </CardDeck>
      </Container>
    );
  }
}

export default Modules;
