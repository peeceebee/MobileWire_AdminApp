import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

import Calendar from "react-calendar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faLockOpen, faFile } from "@fortawesome/free-solid-svg-icons";

library.add(faLock, faLockOpen, faFile); 

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seldate: new Date(),
      events: this.props.signInEvents
    };
    // console.log(this.state.events);
  }

  enumToStr = val => {
    const strs = ["mobilization", "morning", "night"];
    return strs[val];
  };

  makeEditLink = (dt, evid) => {
    const linkString = "/event_sign_in/";
    const dateString = moment(dt).format("YYYY-MM-DD");
    const evidString = "/" + evid;
    return linkString + dateString + evidString;
  };

  onCalChange = date => this.setState({ seldate: date });

  tileContent = ({ date, view }) => {
    if (!(view === "month") || this.state.events === null) return null;
    // see if there is an event
    const datematches = this.state.events.filter(
      d =>
        moment(date).format("YYYY-MM-DD") ===
        moment(d.eventDate).format("YYYY-MM-DD")
    );
    // console.log(datematches.length);
    if (datematches.length === 0) return null;

    const mob = datematches.find(e => e.eventType === 0);
    const morning = datematches.find(e => e.eventType === 1);
    const night = datematches.find(e => e.eventType === 2);

    if (mob && morning && night)
      return (
        <div>
          <p>MOB ({mob.signInCount})</p>
          <p>AM ({morning.signInCount})</p>
          <p>PM ({night.signInCount})</p>
        </div>
      );

    if (morning && night)
      return (
        <div>
          <p>
            <Link
              to={this.makeEditLink(morning.eventDate, morning.signInEventId)}
            >
              AM ({morning.signInCount})
            </Link>
          </p>
          <p>
            <Link to={this.makeEditLink(night.eventDate, night.signInEventId)}>
              PM ({night.signInCount})
            </Link>
          </p>
        </div>
      );

    if (morning)
      return (
        <p>
          <Link
            to={this.makeEditLink(morning.eventDate, morning.signInEventId)}
          >
            AM ({morning.signInCount})
          </Link>
        </p>
      );

    if (night)
      return (
        <p>
          <Link to={this.makeEditLink(night.eventDate, night.signInEventId)}>
            PM ({night.signInCount})
          </Link>
        </p>
      );

    if (mob)
      return (
        <p>
          <Link to={this.makeEditLink(mob.eventDate, mob.signInEventId)}>
            MOB ({mob.signInCount})
          </Link>
        </p>
      );

    return null;
  };

  render() {
    return (
 <div className="new-sign-in-container">
        <h3>New Sign-In Event</h3>
        <div className="event-form-container">
        <Calendar
          view="month"
          className="calendar-container"
          minDetail="month"
          tileContent={this.tileContent}
          onChange={this.onCalChange}
          value={this.state.seldate}
        />
      </div>
        {/* <ReactTable
          showPagination={false}
          data={signInEvents}
          columns={columns}
          className="-striped -highlight"
        /> */}
      </div>
    );
  }
}

EventList.propTypes = {
  signInEvents: PropTypes.arrayOf(PropTypes.object)
};
