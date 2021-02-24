import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./BalanceBar.css";
import axios from "axios";
import loader from "./loading.gif";

class BalanceBar extends Component {
  state = {};

  PlaceBet = () => {
    this.props.PlaceBet();
  };

  ClearBet = () => {
    this.props.ClearBet();
  };

  render() {
    return (
      <Card className="BalanceBar">
        <Card.Body className="bg-darkGreen text-center text-white">
          <Row className="NumberRowBB">
            <Col xs={3}>
              <div className="NumbersBB">
                {this.props.balanceText} <br />
                {this.props.balance}
              </div>
            </Col>
            <Col xs={2}>
              <div className="NumbersBB">
                {this.props.betText}
                <br />
                {this.props.betAmount}
              </div>
            </Col>
            <Col xs={3}>
              <div className="NumbersBB">
                {this.props.maxwinText}
                <br />
                {this.props.maxBet}
              </div>
            </Col>
            <Col xs={2} onClick={() => this.ClearBet()}>
              <div className="NumbersBB divIcon">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </Col>
            <Col
              xs={2}
              key="loader_001"
              style={{ display: this.props.Show_loader ? "block" : "none" }}
            >
              <div className="NumbersBB divIcon">
                <img style={{ height: "30px" }} src={loader}></img>
              </div>
            </Col>
            <Col
              xs={2}
              onClick={() => this.PlaceBet()}
              style={{ display: this.props.Show_loader ? "none" : "block" }}
            >
              <div className="NumbersBB divIcon">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </Col>
          </Row>
          <Row className="NumberRowBB">
            <Col xs={6}>X {this.props.multiplier}</Col>
            <Col xs={6}>{this.props.currency}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default BalanceBar;
