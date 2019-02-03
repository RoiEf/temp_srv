import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Headder from "./Headder/Headder";
import Modules from "./Modules/Modules";
import Footer from "./Footer/Footer";
import Home from "./Routes/Home";
import TempView from "./Routes/TempView";
import Contact from "./Routes/Contact";
import ApiExp from "./Routes/ApiExp";
import Error from "./Routes/Error";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Headder />
          <Container style={{ marginTop: '10px'}}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/ApiExp" component={ApiExp} />
            <Route path="/Contact" component={Contact} />
            <Route path="/TempView" component={TempView} />
            <Route path="/aboutserver" component={Modules} />
            <Route component={Error} />
          </Switch>
          </Container>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
