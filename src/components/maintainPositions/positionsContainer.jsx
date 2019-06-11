import React, { Component } from "react";
import withUnmounted from "@ishawnwang/withunmounted";

import WebServiceGet from "../../utility/API/webServiceGet";

import LoadingViewComponent from "../shared/loadingview";
import ErrorViewComponent from "../shared/errorview";
import PositionView from "./positionsView";

export class PositionViewWrapper extends Component {
    
    render() {
      if (this.props.loading) {
        return <LoadingViewComponent pagetitle="Maintain Position Page" />
      } else if (this.props.positions) {
        const { positions } = this.props;
        return <PositionView positions={positions} />
      } else {
        return  <ErrorViewComponent error={this.props.error} />
      }
    }
  }
  
  class PositionViewContainer extends React.Component {
    state = { loading: true };

  async componentDidMount() {
//    const { eventid } = this.props.match.params
//    WebServiceGet("api/settings/GetPositions", {params: { eventId: eventid }})
    WebServiceGet("api/settings/GetPositions")
    .then(resp => {
       // console.log(resp, 'positionContainer.componentDidMount'); 
        if (resp.successful) {         
          this.setState({            
            positions: resp.viewdata,
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
      return <PositionViewWrapper {...this.state} />;
    }
  }
  
  export default withUnmounted(PositionViewContainer);

