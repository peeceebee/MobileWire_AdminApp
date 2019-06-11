import React, { Component } from "react";
import withUnmounted from "@ishawnwang/withunmounted";

import WebServiceGet from "../../../utility/API/webServiceGet";

import LoadingViewComponent from "../../shared/loadingview";
import ErrorViewComponent from "../../shared/errorview";

import MissionSettingView from "./MissionSettingsView";

export class MissionSettingWrapper extends Component {
    
    render() {
      if (this.props.loading) {
        return <LoadingViewComponent pagetitle="Maintain Employees Page" />
      } else if (this.props.wasloaded) {
        return <MissionSettingView {...this.props} />
      } else {
        return  <ErrorViewComponent error={this.props.error} />
      }
    }
  }
  
  class MissionSettingsContainer extends React.Component {
    state = { loading: true };

  async componentDidMount() {
    WebServiceGet("api/settings/GetMissionSettings")
    .then(resp => {
      console.log(resp.viewdata); 
        if (resp.successful) {         
          this.setState({            
            mobdate: resp.viewdata.MobDate,
            demobdate: resp.viewdata.DemobDate,
            mission: resp.viewdata.MissionName,
            contract: resp.viewdata.ContractNum,
            task: resp.viewdata.TaskOrderNumber,
            wasloaded: resp.viewdata.WasLoaded,
            loading: false,
          });
        }   
        else {
          this.setState({
            loading: false,
            error: resp.error
          });
        }  
        console.log(this.state);
     })};
  
    render() {
      return <MissionSettingWrapper {...this.state} />;
    }
  }
  
  export default withUnmounted(MissionSettingsContainer);

