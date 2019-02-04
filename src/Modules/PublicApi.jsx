import React, { Component } from "react";
import { Jumbotron, InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export default class PublicApi extends Component {
  state = {
    serverAdress: "temp.efrati.info:44404/",
    dsn: "",
    data: []
  }

  serverLocation() {
    //    if (process.env.NODE_ENV === "production") {
          return "http://temp.efrati.info:44404/";
    //    } else {
    //      return "http://localhost:4000/";
    //    }
      }
    
  renderJsonHandler = () => {
    axios
      .get(this.serverLocation() + "public/" + this.state.dsn)
      .then(res => {
        this.setState({data: res.data});
      })
      .catch(error => console.error("something failed", error));
  }

  inputChangeHandler = (event) => {
      this.setState({dsn: event.target.value});
  }

  render () {
  return (
    <React.Fragment>
          <div style={{ marginTop: '30px'}}>
        <Jumbotron>
          <h1>Try me...</h1>
          <br />
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">{this.state.serverAdress}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="# << put a number here"
              aria-label="ApiNumber"
              aria-describedby="basic-addon1"
              onChange={this.inputChangeHandler}
            />
          </InputGroup>
          <Button variant="outline-primary" onClick={this.renderJsonHandler}>GET</Button>
        </Jumbotron>
      </div>
      <div style={{ marginTop: '30px'}}>
        <Jumbotron>
          
            {this.state.data[0] ? (<pre>{JSON.stringify(this.state.data, null, 2)}</pre>) : (<br />)}
          
        </Jumbotron>
      </div>
  </React.Fragment>
  );}
}