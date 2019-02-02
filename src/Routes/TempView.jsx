import React from "react";
import { Container, Alert } from "react-bootstrap";
import "./TempView.css";

const TempView = () => {
  return (
    <Container>
      <Alert variant={"primary"}>Temp & Humidity</Alert>
    </Container>
  );
};

export default TempView;
