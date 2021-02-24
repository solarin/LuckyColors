import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

class StatusBar extends Component {
  state = {};
  render() {
    return (
      <div
        className="bg-warning"
        style={{ paddingLeft: "10px", paddingRight: "5px" }}
      >
        <FontAwesomeIcon icon={faBullhorn} />
        &nbsp; {this.props.winningStatus}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {this.props.winningResult}
      </div>
    );
  }
}

export default StatusBar;
