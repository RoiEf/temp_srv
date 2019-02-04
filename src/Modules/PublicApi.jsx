import React, { Component } from "react";
import { Jumbotron, InputGroup, FormControl, Button } from "react-bootstrap";

export default class PublicApi extends Component {
  state = {
    serverAdress: "temp.efrati.info:44404/",
    dsn: ""
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
            />
          </InputGroup>
          <Button variant="outline-primary">GET</Button>
        </Jumbotron>
      </div>
      <div style={{ marginTop: '30px'}}>
        <Jumbotron>
          <p>
            json response here
          </p>
        </Jumbotron>
      </div>
  </React.Fragment>
  );}
}


