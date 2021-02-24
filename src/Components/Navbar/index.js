import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar } from "react-bootstrap";
import Countdown from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./NavbarElements.css";

class NavigationBar extends Component {
  state = {
    openBet: 10,
    closedBet: 4,
    duration: this.props.timerDuration,
    winners: "2, 4, 5, 6",
    minutes: this.props.timerDuration,
    seconds: this.props.timerDuration,
    renderer: ({ hours, minutes, seconds, completed }) => {
      return (
        <span>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      );
    },
  };

  constructor(props) {
    super(props);
    //this.msToTime(this.props.timerDuration);
    //console.log("called", this.props.timerDuration);
  }

  componentDidMount() {
    // this.myInterval = setInterval(() => {
    //   const { seconds, minutes } = this.state;
    //   if (seconds > 0) {
    //     this.setState(({ seconds }) => ({
    //       seconds: seconds - 1,
    //     }));
    //   }
    //   if (seconds === 0) {
    //     if (minutes === 0) {
    //       clearInterval(this.myInterval);
    //     } else {
    //       this.setState(({ minutes }) => ({
    //         minutes: minutes - 1,
    //         seconds: 59,
    //       }));
    //     }
    //   }
    //   if ((minutes === 0) & (seconds === 0)) {
    //     alert("Completed..");
    //   }
    // }, 1000);
  }

  // componentWillReceiveProps() {
  //   console.log("FROM NAVBAR : ", this.props.timerDuration);
  //   this.setState({ minutes: this.msToTime(this.props.timerDuration, "min") });
  //   this.setState({ seconds: this.msToTime(this.props.timerDuration, "sec") });
  // }

  msToTime = (s, type) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (type == "min") {
      return mins;
    } else {
      return secs;
    }
    console.log(hrs + ":" + mins + ":" + secs + "." + ms);
  };

  onCounterComplete = () => {
    this.props.onCounterComplete();
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.isCounterTobeUpdated;
  }

  render() {
    var { seconds } = this.props.timerDuration;
    var { minutes } = this.props.timerDuration;
    return (
      <div className="divMain">
        <Navbar collapseOnSelect className="bg-darkGreen" variant="dark">
          <Navbar.Brand href="#home">
            <img src={this.props.logoUrl} style={{ width: "50px" }} />
          </Navbar.Brand>
          <Navbar.Brand>{this.props.title}</Navbar.Brand>
          <Navbar.Brand>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Navbar.Brand>
          <Navbar.Brand>
            <Countdown
              key={this.props.timerDuration}
              date={Date.now() + this.props.timerDuration}
              renderer={this.state.renderer}
              autoStart={true}
              onComplete={this.onCounterComplete}
            />
            {/* <span>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span> */}
          </Navbar.Brand>
          <Navbar.Brand href={this.props.EXIT_URL}>
            <FontAwesomeIcon icon={faTimes} />
          </Navbar.Brand>
        </Navbar>

        {/* <Row className="row bg-warning text-center">
          <Col>
            <span className="StatusBarTitle">Open</span>
            <br />
            <Badge variant="primary">{this.state.openBet}</Badge>
          </Col>
          <Col>
            <span className="StatusBarTitle"> Closed</span>
            <br />
            <Badge variant="danger">{this.state.closedBet}</Badge>
          </Col>
          <Col xs={6}>
            <span className="StatusBarTitle"> Winners</span>
            <br />
            <Badge variant="success">{this.state.winners}</Badge>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default NavigationBar;
