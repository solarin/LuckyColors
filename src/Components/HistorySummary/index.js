import React, { Component } from "react";
import { Row, Col, Card,Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import "./History.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "react-string-format";
import Modal from 'react-modal';
import History from '../History';

const customStyles = {
  content: {
       position: 'static',
       padding: '0',
       width: '90%',
       height: '80vh',
       margin: 'auto',
       marginTop: '20px'
  }
};

class HistorySummary extends Component {
  state = {
    modalIsOpen: false
  };

  componentDidMount() {
   
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {

  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }


  getFormattedTime = (date) => {
    var dateTimeArray = date.split("T");
    var dateArray = dateTimeArray[0].split("-");
    var timeArray = dateTimeArray[1].split(":");

    return (
      // dateArray[2] +
      // "/" +
      // dateArray[1] +
      // " " +
      timeArray[0] + ":" + timeArray[1]
    );
  };

  GetResultString = (item) => {
    let str = "";

    if (item.isViolet == true) {
      str = str.concat(
        str != "" ? " " + this.props.VIOLET_SYMBOL : this.props.VIOLET_SYMBOL
      );
    }

    if (item.isRed == true) {
      str = str.concat(
        str != "" ? " " + this.props.RED_SYMBOL : this.props.RED_SYMBOL
      );
    }

    if (item.isGreen == true) {
      str = str.concat(
        str != "" ? " " + this.props.GREEN_SYMBOL : this.props.GREEN_SYMBOL
      );
    }

    return str;
  };

  render() {
    return (
      <Card className="card-historySummary">
        <Card.Title className="bg-warning" style={{ marginBottom: "5px" }}>
          {this.props.historyText}
          <span className="btnViewHistory">
            <FontAwesomeIcon icon={faListAlt} onClick={this.openModal} />
          </span>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
            style={customStyles}
          >
            <History
              textProps={{
                historyText: this.props.historyText,
                ID: this.props.ID,
                Time: this.props.Time,
                BET_AMOUNT: this.props.BET_AMOUNT,
                WON_AMOUNT: this.props.WON_AMOUNT,
                STATUS: this.props.STATUS,
                ACTION: this.props.ACTION,
                VIEW: this.props.VIEW,
                CANCEL: this.props.CANCEL,
                HISTORY: this.props.HISTORY,
                BET_CANT_CANCEL: this.props.BET_CANT_CANCEL,
                BET_CANCELED: this.props.BET_CANCELED,
                BIG_SYMBOL: this.props.BIG_SYMBOL,
                SMALL_SYMBOL: this.props.SMALL_SYMBOL,
                ODD_SYMBOL: this.props.ODD_SYMBOL,
                EVEN_SYMBOL: this.props.EVEN_SYMBOL,
                TIGER_SYMBOL: this.props.TIGER_SYMBOL,
                PAIR_SYMBOL: this.props.PAIR_SYMBOL,
                DRAGON_SYMBOL: this.props.DRAGON_SYMBOL,
                AUTH_TOKEN: this.props.auth_token,
                GAME_TOKEN: this.props.game_token,
                PENDING_STATUS: this.props.PENDING_STATUS,
                CANCELED_STATUS: this.props.CANCELED_STATUS,
                REFUSED_STATUS: this.props.REFUSED_STATUS,
                ERROR_STATUS: this.props.ERROR_STATUS,
                WON_STATUS: this.props.WON_STATUS,
                LOST_STATUS: this.props.LOST_STATUS,
                setBETBalance:this.props.setBETBalance
              }}
              closeModal={this.closeModal}
            />
          </Modal>
        </Card.Title>
        <Card.Body
          className="text-center"
          style={{
            minHeight: "175px",
            maxHeight: window.innerHeight - 470 + "px",
            overflowX: "auto",
          }}
        >
          <Row>
            <Col className="font-bold">{this.props.EVENT}</Col>
            <Col className="font-bold">{this.props.Time}</Col>
            <Col className="font-bold">{this.props.NUMBERS}</Col>
            <Col className="font-bold" xs={3} style={{ padding: "0px" }}>
              {this.props.RESULT}
            </Col>
          </Row>

          {this.props.historyArray.map((item, i) => {
            return (
              <Row>
                <Col>{item.roundId}</Col>
                <Col>{this.getFormattedTime(item.dateTimeUtc)}</Col>
                <Col>
                  {/* {item.resultNumbers
                    .map(function (val) {
                      return val;
                    })
                    .join("-")} */}
                  {item.resultNumbers[0]}
                </Col>
                <Col xs={3} style={{ padding: "0px" }}>
                  {this.GetResultString(item)}
                </Col>
              </Row>
            );
          })}
        </Card.Body>
      </Card>
    );
  }
}

export default HistorySummary;
