import React, { Component } from "react";
import getSignInView from "../../utility/API/getSignInView";
import SignInNewEmployee from "../employeeNewSignIn/EmployeeNewSignIn";
import SignInEmployees from "../employeeSignIn/EmployeeSignIn";
import PropTypes from 'prop-types';

export default class EventSignInEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signineventid: this.props.signInEventId,
      eventdate: "2019/05/01",
      eventtype: 0,
      employees: [],
      positions: [],
      signins: []
    };
  }
  enumToStr = val => {
    const strs = ["mobilization", "morning", "night"];
    return strs[val];
  };

  async componentDidMount() {
    const siv = await getSignInView(this.props.signInEventId);
    this.setState({
      eventdate: siv.eventdate,
      eventtype: siv.eventtype,
      employees: siv.employees,
      positions: siv.positions,
      signins: siv.signins
    });
  }

  render() {
    return (
      <div>
        <h2>Sign-In Event</h2>
        <h3>
          {this.props.EventDate} {this.props.EventTypeStr}
        </h3>
        <SignInEmployees>
          signineventid={this.state.signineventid}
        </SignInEmployees>
        <SignInNewEmployee signineventid={this.state.signineventid} />
      </div>
    );
  }
}
EventSignInEdit.propTypes = {

}