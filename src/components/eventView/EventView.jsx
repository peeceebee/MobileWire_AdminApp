import React, { Component } from "react";
import { getSignInView } from "../../utility/API/fetches";
import SignInEmployees from "../employeeSignIn/EmployeeSignIn";
import SignInNewEmployee from "../employeeNewSignIn/EmployeeNewSignIn";
import EmployeeSignInEdit from "../employeeSignInEdit/EmployeeSignInEdit";
import SignInCommands from "../signInCommands/SignInCommands";

import Loading from "../loading/Loading";
import { EventReport } from "../eventReport/EventReport";
import WebServicePost from "../../utility/API/webServicePost";

import PropTypes from "prop-types";

export class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      eventid: this.props.match.params.id,
      eventdate: this.props.match.params.date
    };
  }

  async componentDidMount() {
    const eventView = await getSignInView(this.state.eventid);
    this.setState({
      employees: eventView.employees,
      positions: eventView.positions,
      signins: eventView.signins,
      eventtype: eventView.eventtype,
      loading: false
    });
  }

  getResponse = response => {
    this.setState({
      signins: response.signIns,
      employees: response.allEmployees
    });
  };

  removeSignIn = e => {
    const request = {
      signInEventId: e.original.signInEventId,
      employeeId: e.original.employeeId
    };
    WebServicePost("api/signin/DeleteSignIn", request).then(resp => {
      if (resp.successful) {
        this.setState({signins: resp.viewdata.signIns, employees: resp.viewdata.allEmployees})
      } else {
        this.setState({
          error: resp.error
        });
      }
    });
  };

  render() {
    const { signins, positions, employees } = this.state;
    return (
      <section className="event-view">
        {!this.state.loading ? (
          <React.Fragment>
            <div className="event-view-form-container">

              <SignInCommands eventid={this.state.eventid} eventdate={this.state.eventdate} eventtype={this.state.eventtype} />
              <SignInEmployees {...this.state} getResponse={this.getResponse} />

              <SignInNewEmployee
                {...this.state}
                getResponse={this.getResponse}
              />
              <EmployeeSignInEdit
                {...this.state}
                getResponse={this.getResponse}
              />
            </div>
            <div className="event-view-report-container">
              {this.state.signins ? (
                <EventReport
                  signins={signins}
                  positions={positions}
                  employees={employees}
                  removeSignIn={this.removeSignIn}
                />
              ) : (
                <div />
              )}
            </div>
          </React.Fragment>
        ) : (
          <div className="loading-container">
            <Loading />
          </div>
        )}
      </section>
    );
  }
}

EventView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
      id: PropTypes.string
    }),
    path: PropTypes.string,
    url: PropTypes.string
  }),
  location: PropTypes.object
};
export default EventView;
