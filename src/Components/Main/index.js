import React, { Component } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "./Main.css";


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "1st text",
      eventName: null,
    };

  }


  changeTest() {
    this.setState({ title: "On CLick changed" });
    this.setState({ eventName: this.props.eventName });
  }

  setEventName = (eName) => {
  
    this.props.setEventName(eName);
    this.setState({ eventName: eName });
  };

  GetUITextByKey(key) {
    console.log("Transactions", this.props.translations);

    if (this.props.translations.length > 0) {
      console.log("Key : ", key);
      this.props.translations.forEach((item) => {
        if (item.key === key) {
          return item.value;
        }
      });
    }
  }


  render() {
    return (
      <Card className="MainCard">
        <Card.Body
          className="bg-darkGreen text-center text-white"
          style={{ paddingBottom: "5px" }}
        >
          <Row>
            <Col
              onClick={() => this.setEventName("v")}
              className={this.state.eventName == "v" && !this.props.clearBetKey ? "violet-event-selected" : "violet-button"}
            >
              {this.props.violetText}
            </Col>
            <Col
              onClick={() => this.setEventName("g")}
              className={this.state.eventName == "g" && !this.props.clearBetKey ? "green-event-selected" :"green-button"}
            >
              {this.props.greenText}
            </Col>
            <Col
              onClick={() => this.setEventName("r")}
              className={this.state.eventName == "r" && !this.props.clearBetKey ? "red-event-selected" : "red-button"}
            >
              {this.props.redText}
            </Col>
          </Row>
          <Row className="NumberRow number-padding">
            <Col>
        
              <div onClick={() => this.setEventName(0)}
                className={this.state.eventName == 0 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >0</div>
            </Col>
            <Col>
          
              <div onClick={() => this.setEventName(1)}
                className={this.state.eventName == 1 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >1</div>
            </Col>
            <Col>
         
              <div onClick={() => this.setEventName(2)}
                className={this.state.eventName == 2 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >2</div>
            </Col>
            <Col>
      
              <div onClick={() => this.setEventName(3)}
                className={this.state.eventName == 3 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >3</div>
            </Col>
            <Col>
         
              <div onClick={() => this.setEventName(4)}
                className={this.state.eventName == 4 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >4</div>
            </Col>
          </Row>
          <Row className="number-padding">
            <Col>
        
              <div onClick={() => this.setEventName(5)}
                className={this.state.eventName == 5 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >5</div>
            </Col>
            <Col>
     
              <div onClick={() => this.setEventName(6)}
                className={this.state.eventName == 6 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >6</div>
            </Col>
            <Col>
          
              <div onClick={() => this.setEventName(7)}
                className={this.state.eventName == 7 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >7</div>
            </Col>
            <Col>
         
              <div onClick={() => this.setEventName(8)}
                className={this.state.eventName == 8 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >8</div>
            </Col>
            <Col>
        
              <div onClick={() => this.setEventName(9)}
                className={this.state.eventName == 9 && !this.props.clearBetKey ? "num-event-selected" : "Numbers"}
              >9</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default Main;
