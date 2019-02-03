import React, { Component } from "react";
// import axios from "axios";
import Module from "./module";

class Modules extends Component {
  state = {
    ids: {
      id: []
    }
  };

  styles = {
    margin: "50px"
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
      <div className="modules" style={this.styles}>
        {this.state.ids.id.map(tag => (
          <Module myKey={tag} key={tag} />
        ))}
      </div>
    );
  }
}

export default Modules;
