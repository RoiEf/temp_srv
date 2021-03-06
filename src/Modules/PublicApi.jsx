import React, { Component } from "react";
import { Jumbotron, InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import api from "../api";

export default class PublicApi extends Component {
  state = {
    dsn: "",
    data: []
  }

  renderJsonHandler = () => {
    axios
      .get(api.public + this.state.dsn)
      .then(res => {
        this.setState({data: res.data});
      })
      .catch(error => console.error("something failed", error));
  }

  inputChangeHandler = (event) => {
      this.setState({dsn: event.target.value});
  }

/*  inputKeypressHandler = (event) => {
    (event.keyCode === 13) ? (this.renderJsonHandler) : ("");
  }
*/
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
              type="number"
              placeholder="# << put a number here"
              aria-label="ApiNumber"
              aria-describedby="basic-addon1"
              onChange={this.inputChangeHandler}
              onKeyDown={event => { 
                if (event.key === "Enter") {
                  this.renderJsonHandler();
                }
              }}
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