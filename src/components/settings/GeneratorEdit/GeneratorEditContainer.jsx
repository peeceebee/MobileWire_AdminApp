import React, { Component } from "react";
import withUnmounted from "@ishawnwang/withunmounted";

import LoadingViewComponent from "../../shared/loadingview";
import ErrorViewComponent from "../../shared/errorview";
import GeneratorEditView from "./GeneratorEditView";

export class GeneratorEditWrapper extends Component {
    
    render() {
      console.log(this.props, 'GenEditWrapper'); 
      if (this.props.loading) {
        return <LoadingViewComponent pagetitle="Edit Generator Page" />
      } else if (this.props.wasloaded) {
        return <GeneratorEditView {...this.props} />
      } else {
        return  <ErrorViewComponent error={this.props.error} />
      }
    }
  }
  
  class GeneratorEditContainer extends React.Component {
    state = { 
      loading: false,
      wasloaded: true,
      error: '' };
          
    render() {
      console.log(this.props, this.state, 'GenEditContainer');
      return <GeneratorEditWrapper loading={false} wasloaded={true} error='' generator={this.props.location.state.generator} generatorid={this.props.location.state.generatorid} />;
    }
  }
  
  export default withUnmounted(GeneratorEditContainer);

