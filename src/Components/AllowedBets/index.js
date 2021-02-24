import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./AllowedBets.css";

class AllowedBets extends Component {
  state = {
    allowedBets: [],
  };

  constructor(props) {
    super(props);
  }

  setBETAmount = (amount) => {
    this.props.setBETAmount(amount);
  };

  render() {
    return (
      <Card className="Allowedbets">
        <Card.Body className="bg-warning text-center text-white">
          <Row className="NumberRowAB">
            <Col xs={1}></Col>
            {this.props.allowedBets.map((data, index) => {
              return (
                <Col xs={2}>
                  <div
                    onClick={() => this.setBETAmount(data)}
                    className={`numbers${index}`}
                  >
                    &nbsp;{data}&nbsp;
                  </div>
                </Col>
              );
            })}
          
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default AllowedBets;
