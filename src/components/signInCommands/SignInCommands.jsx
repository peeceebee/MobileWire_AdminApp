import React from "react";
import { withRouter } from 'react-router-dom';
import moment from "moment";

import WebServicePost from "../../utility/API/webServicePost";

export class SignInCommands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventid: this.props.eventid, 
            eventdate: this.props.eventdate,
            eventtype: this.enumToStr(this.props.eventtype)
        };
        this.onViewReport = this.onViewReport.bind(this); 
        this.onDeleteEvent = this.onDeleteEvent.bind(this); 
    }
    
    enumToStr = val => {
        const strs = ["mobilization", "morning", "night"];
        return strs[val];
};

onViewReport = () => {
    this.props.history.push({
        pathname: 
        `/event_report` + 
            `/${this.state.eventid.toString()}` +
            `/${moment(this.state.eventdate).format("YYYY-MM-DD")}` +
            `/${this.state.eventtype}`,
      });
}
onLockEvent = () => {
  const request = {
    signInEventId: this.state.eventid
  };
  WebServicePost("api/signin/ToggleEventLock", request).then(resp => {
    console.log(resp, "toggle event resp")
    if (resp.successful) {
      this.props.history.push({
        pathname: `/`,
      });
    } else {
      this.setState({
        error: resp.error
      });
    }
  });
}
onDeleteEvent = () => {
    const request = {
        eventId: this.state.eventid
      };
      WebServicePost("api/signin/DeleteEvent", request).then(resp => {
        console.log(resp, "delete event resp")
        if (resp.successful) {
          this.props.history.push({
            pathname: `/`,
          });
        } else {
          this.setState({
            error: resp.error
          });
        }
      });
}
    render() {
        return (
            <section className="sign-in-commands sign-in-btn-container ">
                <button onClick={this.onViewReport} >View Report</button>
                <button onClick={this.onLockEvent} >Lock Event</button>
                <button onClick={this.onDeleteEvent}>Delete Event</button>                
            </section>
    );
}
};

export default withRouter(SignInCommands);
