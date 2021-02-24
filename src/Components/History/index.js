import React, { Component } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faTimes,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./History.css";
import axios from "axios";
import { toast } from "react-toastify";
import { format } from "react-string-format";

class History extends Component {
  state = {
    historyArray: [],
  };

  setBETBalance = (amount) => {
    this.props.textProps.setBETBalance(amount);
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/LuckyColors/GetMyBets?authToken=` +
          this.props.textProps.AUTH_TOKEN +
          `&gameToken=` +
          this.props.textProps.GAME_TOKEN
          )
      .then((res) => {
        this.setState({ historyArray: res.data.betInfo });
      });

  }

  cancelBet = (betId) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/LuckyColors/CancelBet?authToken=` +
        this.props.textProps.AUTH_TOKEN +
        `&gameToken=` +
        this.props.textProps.GAME_TOKEN +
        `&betId=` +
          betId
      )
      .then((res) => {
        if (isNaN(res.data.errorNo) || res.data.errorNo == 0) {
          toast.success(this.props.textProps.BET_CANCELED, {
            position: toast.POSITION.TOP_CENTER,
          });
          this.setState({ balance: isNaN(res.data.balance) ? 0 : res.data.balance });
          this.setBETBalance(res.data.balance);

          axios
            .get(
              `${process.env.REACT_APP_API_URL}/LuckyColors/GetMyBets?authToken=` +
              this.props.textProps.AUTH_TOKEN +
                `&gameToken=` +
                this.props.textProps.GAME_TOKEN
            )
            .then((res) => {
              this.setState({ historyArray: res.data.betInfo });
            });
        } else {
          toast.error(this.props.textProps.BET_CANT_CANCEL, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  // getFormattedDate = (date) => {
  //   var dateTimeArray = date.split("T");
  //   var dateArray = dateTimeArray[0].split("-");
  //   var timeArray = dateTimeArray[1].split(":");

  //   return (
  //     dateArray[2] + "/" + dateArray[1]
  //     // " " +
  //     //timeArray[0] + ":" + timeArray[1]
  //   );
  // };

  
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
  // getFormattedTime = (date) => {
  //   var dateTimeArray = date.split("T");
  //   var dateArray = dateTimeArray[0].split("-");
  //   var timeArray = dateTimeArray[1].split(":");

  //   return (
  //     dateArray[2] + "/" + dateArray[1]
  //     // " " +
  //     //timeArray[0] + ":" + timeArray[1]
  //   );
  // };
 
  getStatus = (statusID) => {
    switch (statusID) {
      case 2:
        return this.props.textProps.REFUSED_STATUS;
      case 4:
        return this.props.textProps.WON_STATUS;
      case 5:
        return this.props.textProps.LOST_STATUS;
      case 6:
        return this.props.textProps.CANCELED_STATUS;
      case 7:
        return this.props.textProps.ERROR_STATUS;
      default:
        return this.props.textProps.PENDING_STATUS;
    }
  };

  getResultString = (array) => {
    return array.join("-");
  };
  closeModal=()=>{
    this.props.closeModal();
  }



  getBetContent(content) {
    switch (content) {
      case "b":
        content = this.props.textProps.BIG_SYMBOL;
        break;
      case "s":
        content = this.props.textProps.SMALL_SYMBOL;
        break;
      case "o":
        content = this.props.textProps.ODD_SYMBOL;
        break;
      case "e":
        content = this.props.textProps.EVEN_SYMBOL;
        break;
      case "d":
        content = this.props.textProps.DRAGON_SYMBOL;
        break;
      case "p":
        content = this.props.textProps.PAIR_SYMBOL;
        break;
      case "t":
        content = this.props.textProps.TIGER_SYMBOL;
        break;
    }
    return content;
  }

  render() {
    return (
      <Card className="card-historySummary">
        <Card.Title className="bg-warning" style={{ marginBottom: "0px" }}>
          &nbsp;&nbsp;&nbsp;{this.props.textProps.historyText}
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
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>{this.props.textProps.ID}</th>
                <th>{this.props.textProps.Time}</th>
                <th>{this.props.textProps.BET_AMOUNT}</th>
                <th>{this.props.textProps.WON_AMOUNT}</th>
                <th>{this.props.textProps.STATUS}</th>
                <th style={{ paddingLeft: "0px" }}>{this.props.textProps.ACTION}</th>
              </tr>
            </thead>
            <tbody>
              {this.state.historyArray.map((item, i) => {
                return (
                  <tr>
                    <td>{item.betId}</td>
                    <td>{this.getFormattedTime(item.createdUtc)}</td>
                    <td>
                      {this.getBetContent(item.betContent) + "/" + item.amount}
                    </td>
                    <td style={{ padding: "0px" }}>{item.winning}</td>
                    <td>{this.getStatus(item.status)}</td>
                    <td style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                      <a
                        className={
                          item.status === 2 ||
                          item.status === 4 ||
                          item.status === 5 ||
                          item.status === 6 ||
                          item.status === 7
                            ? "hide-Content"
                            : "show-Content"
                        }
                        onClick={() => this.cancelBet(item.betId)}
                      >
                        <FontAwesomeIcon
                          className="actionIcon"
                          icon={faTimes}
                        />
                      </a>
                      <span
                        className={
                          item.status === 2 ||
                          item.status === 4 ||
                          item.status === 5 ||
                          item.status === 6 ||
                          item.status === 7
                            ? "hide-Content"
                            : "show-Content"
                        }
                      >
                        &nbsp;|&nbsp;
                      </span>
                      <a
                        href={item.roundInfo.checkLink}
                        target="blank"
                        style={{ color: "black" }}
                      >
                        <FontAwesomeIcon className="actionIcon" icon={faEye} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    );
  }
}

export default History;
