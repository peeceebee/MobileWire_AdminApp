import React, { Component } from "react";
import withUnmounted from "@ishawnwang/withunmounted";

import WebServiceGet from "../../utility/API/webServiceGet";

import LoadingViewComponent from "../shared/loadingview";
import ErrorViewComponent from "../shared/errorview";
import EmployeesView from "./employeesView";

export class EmployeesWrapper extends Component {
    
    render() {
      if (this.props.loading) {
        return <LoadingViewComponent pagetitle="Maintain Employees Page" />
      } else if (this.props.positions) {
        const { positions, employees } = this.props;
        return <EmployeesView positions={positions} employees={employees} />
      } else {
        return  <ErrorViewComponent error={this.props.error} />
      }
    }
  }
  
  class EmployeesViewContainer extends React.Component {
    state = { loading: true };

  async componentDidMount() {
//    const { eventid } = this.props.match.params
//    WebServiceGet("api/settings/GetPositions", {params: { eventId: eventid }})
    WebServiceGet("api/settings/GetEmpsAndPos")
    .then(resp => {
//        console.log(resp, 'employeesContainer.componentDidMount'); 
        if (resp.successful) {         
          this.setState({            
            positions: resp.viewdata.allPositions,
            employees: resp.viewdata.allEmployees,
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
      return <EmployeesWrapper {...this.state} />;
    }
  }
  
  export default withUnmounted(EmployeesViewContainer);

