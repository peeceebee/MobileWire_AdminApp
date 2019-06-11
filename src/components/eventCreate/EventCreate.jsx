import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import WebServicePost from "../../utility/API/webServicePost";

import { convertToIntl } from "../../utility/cleaners/dateCleaner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EventCreate extends Component {
  hasUnmounted = false;

  constructor(props) {
    super(props);
    this.state = {
      newEventType: "1",
      newEventDate: moment().format("YYYY-MM-DD"),
      startDate: this.props.startdate,
      endDate: this.props.enddate,
      error: ""
    };
  }
  enumToStr = val => {
    const strs = ["mobilization", "morning", "night"];
    return strs[val];
  };

  handleEvTypeChange = event => {
    this.setState({
      newEventType: event.target.value
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleDateSelect = e => {
    const date = moment(e).format("YYYY-MM-DD");
    this.setState({ newEventDate: date });
  };

  submitNewEvent = async e => {
    e.preventDefault();
    const { newEventDate, newEventType } = this.state;
    const request = {
      eventDate: newEventDate,
      eventType: newEventType
    };
    WebServicePost("api/signin/CreateSignInEvent", request).then(resp => {
      console.log(resp)
      if (resp.successful) {
        this.props.history.push({
          pathname: `/event_sign_in/${this.state.newEventDate}/${
            resp.viewdata.signInEventId
          }`,
          state: {
            eventId: resp.viewdata.signInEventId,
            newEventDate: this.state.newEventDate
          }
        });
      } else {
        this.setState({
          error: resp.error
        });
      }
    });
  };

  render() {
    const { startDate, endDate, newEventDate, newEventType } = this.state;
    return (
      <div className="new-sign-in-container">
        <h3>New Sign-In Event</h3>
        <span className="event-date-range">
          {convertToIntl(startDate)} - {convertToIntl(endDate)}
        </span>
        <div className="event-form-container">
          <form
            className="event-form"
            onSubmit={this.submitNewEvent}
            autoComplete="off"
            placeholder="Click to select date..."
          >
            <div className="event-date-input-container">
              <label>Date of Event: </label>
              <DatePicker
                todayButton={"Today"}
                name="newEventDate"
                className="event-date-input"
                dateFormat="yyyy-MM-dd"
                onChange={this.handleDateSelect}
                value={newEventDate}
              />
            </div>
            <div className="radio-container">
              <div className="radio-btn-container">
                <input
                  type="radio"
                  value="0"
                  checked={newEventType === "0"}
                  onChange={this.handleEvTypeChange}
                />
                <label>Mobilization</label>
              </div>
              <div className="radio-btn-container">
                <input
                  type="radio"
                  value="1"
                  checked={newEventType === "1"}
                  onChange={this.handleEvTypeChange}
                />
                <label>Morning</label>
              </div>
              <div className="radio-btn-container">
                <input
                  type="radio"
                  value="2"
                  checked={newEventType === "2"}
                  onChange={this.handleEvTypeChange}
                />
                <label>Night</label>
              </div>
            </div>
            <span className="error-msg">{this.state.error}</span>
            <button className="new-sign-in-btn">Create Event</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EventCreate);
