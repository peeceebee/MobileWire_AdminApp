import React, { Component } from "react";
import withUnmounted from "@ishawnwang/withunmounted";

import WebServiceGet from "../../utility/API/webServiceGet";

import LoadingViewComponent from "../shared/loadingview";
import ErrorViewComponent from "../shared/errorview";
import EventReportView from "./EventReportView";

class EventReportWrapper extends Component {
    
    render() {
      if (this.props.loading) {
        return <LoadingViewComponent pagetitle="Reporting Page" />
      } else if (this.props.reportdata) {
        const { reportdata, eventdate, eventtype } = this.props;
        return <EventReportView reportdata={reportdata} eventdate={eventdate} eventtype={eventtype} />
      } else {
        return  <ErrorViewComponent error={this.props.error} />
      }
    }
  }
  
  class EventReportContainer extends React.Component {
    state = 
    {
        loading: true,
        eventid: this.props.match.params.eventid,
        eventdate: this.props.match.params.eventdate,
        eventtype: this.props.match.params.eventtype,
        reportdata: []
     };

  async componentDidMount() {
    // console.log(this.state); 
    WebServiceGet("api/signin/getEventReport",{params: {eventId: this.state.eventid} })
    .then(resp => {
        // console.log(resp); 
        if (resp.successful) {         
          this.setState({            
            reportdata: resp.viewdata.rows, 
            loading: false,
          });
        }   
        else {
          this.setState({
            loading: false,
            error: resp.error
          });
        }  
        // console.log(this.state);
     })};
  
    render() {
      return <EventReportWrapper {...this.state} />;
    }
  }
  
  export default withUnmounted(EventReportContainer);
