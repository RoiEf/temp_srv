import React from "react";
import { Jumbotron, ListGroup, ListGroupItem } from "react-bootstrap";
import PublicApi from "../Modules/PublicApi";

const ApiExp = () => {
  return (
    <React.Fragment>
      <Jumbotron>
        <h1>Api explenation</h1>
        <br />
        <p>
          This page come to explain the public API running on the server. How to access it, it's capabilities and 
          what is returned by it.
          <br /><br />
          There is also a trial area to visualise a GET request.<br />
          The output showed in the trial area is rendered as part of the SPA, (Single page application),
          that makes this entire React.JS App.
        </p>
      </Jumbotron>
      <ListGroup>
        <ListGroupItem>
          The public API address is "temp.efrati.info:44404/public"
        </ListGroupItem>
        <ListGroupItem>
          It accepts "GET requests only" as it does not support public insertion of data into the DB.
          This can be done only from the IoT devices who feed the system.<br />
        </ListGroupItem>
        <ListGroupItem>
          Sending a Blank "GET" request to the API will return a set of data from the LAST 10 insertion ocurences.<br />
          This is regardless of the IoT device who sent the data.
        </ListGroupItem>
        <ListGroupItem>
          The API also support a number modefire, where it accepts a "/#" at the end of the URL.<br />
          This will resault with the API returning a set of the LAST datasets, in the amount specified by the modefire.<br />
          e.g. temp.efrati.info:44404/public/35 will returen the last 35 datasets.
        </ListGroupItem>
      </ListGroup>

      <PublicApi />

    </React.Fragment>
  );
};

export default ApiExp;
