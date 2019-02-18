import React, { Component } from "react";
import { Form, InputGroup,  Button} from "react-bootstrap";
// import api from "../api";

export default class dashboard extends Component {
    render () {
    return(
    <React.Fragment>
        <Form>
            <Form.Group controlId="formBasicSelect">
                <Form.Label>Station selection</Form.Label>
                <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSelectOptions">
                <Form.Label>Options selection</Form.Label>
                <Form.Check type="checkbox" id="temp1" label="Temprature" />
                <Form.Check type="checkbox" id="humid1" label="Humidity" />
            </Form.Group>
            <Form.Group controlId="formSelectSpan">
                <Form.Label>Date Span selection</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="from1">From: </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </Form.Control>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="to1">To: </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="select">
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                    </Form.Control>
                    </InputGroup>
                <Button variant="outline-primary">GET Data</Button>
            </Form.Group>
        </Form>
    </React.Fragment>
    );
    }
}
