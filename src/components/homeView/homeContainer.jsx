import React, { Component } from "react";
import withUnmounted from "@ishawnwang/withunmounted";

import WebServiceGet from "../../utility/API/webServiceGet";

import LoadingViewComponent from "../shared/loadingview";
import ErrorViewComponent from "../shared/errorview";

import HomeView from "./HomeView";

class HomeViewWrapper extends Component {
  render() {
    if (this.props.loading) {
      return <LoadingViewComponent pagetitle="SignIn Start Page" />;
    } else if (this.props.events) {
      const { events, startdate, enddate } = this.props;
      return (
        <HomeView events={events} startdate={startdate} enddate={enddate} />
      );
    } else {
      return <ErrorViewComponent error={this.props.error} />;
    }
  }
}

class HomeViewContainer extends React.Component {
  state = { loading: true };

  async componentDidMount() {
    WebServiceGet("api/signin/getHomeView").then(resp => {
      if (resp.successful) {
        this.setState({
          events: resp.viewdata.events,
          startdate: resp.viewdata.missionStart,
          enddate: resp.viewdata.missionEnd,
          loading: false
        });
      } else {
        this.setState({
          loading: false,
          error: resp.error
        });
      }
    });
  }

  render() {
    return <HomeViewWrapper {...this.state} />;
  }
}

export default withUnmounted(HomeViewContainer);
