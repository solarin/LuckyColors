import React, { Component } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faTimes,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./GameInfo.css";

class GameInfo extends Component {

  closeModal=()=>{
    this.props.gameInfoCloseModal();
  }

  render() {
    return (
      <Card className="card-historySummary">
        <Card.Title className="bg-warning" style={{ marginBottom: "0px" }}>
          &nbsp;&nbsp;&nbsp;{this.props.GAME_INFO_TITLE}
          <FontAwesomeIcon className="backIcon" icon={faWindowClose} onClick={this.closeModal} />
        </Card.Title>
        <Card.Body
          className="text-center"
          style={{
            border: "1",
            minHeight: "175px",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
            <div dangerouslySetInnerHTML={{ __html: this.props.GAME_INFO }} />
        </Card.Body>
      </Card>
    );
  }
}

export default GameInfo;
