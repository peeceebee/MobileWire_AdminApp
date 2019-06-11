import React, { Component } from "react";
import EventList from '../eventList/EventList'
import EventCreate from "../eventCreate/EventCreate";

export default class HomeView extends Component {
  constructor(props) {  
    super(props);
    this.state = {
      events: this.props.events, 
      startdate: this.props.startdate, 
      enddate: this.props.enddate 
    };
  }

  render() {
    const { events, startdate, enddate } = this.state;
    return (
      <section className="home-view-container">
        <EventCreate startdate={startdate} enddate={enddate} />
        {events ? (
          <EventList signInEvents={events} />
        ) : (
          <div>No events were loaded.</div>
        )}
      </section>
    );
  }
}
