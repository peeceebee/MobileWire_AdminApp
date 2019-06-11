import React, { Component } from "react";
import CreateEventView from "../eventCreate/EventCreate";
import EventList from '../eventList/EventList';
export default class TestHomeView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events, 
      startdate: this.props.startdate,
      enddate: this.props.enddate,     
    };
    console.log(this.state); 
  }

    render() {
      const {
        events,
        startdate,
        enddate,
      } = this.state;
      return (
        <section className="home-view-container">
          <CreateEventView startdate={startdate} enddate={enddate} />
          {events ? <EventList signInEvents={events} /> : <div>No events were loaded.</div> }
        </section>
      );
    }

  }
  