import React, { Component } from "react";
import withUnmounted from "@ishawnwang/withunmounted";

import WebServiceGet from "../../../utility/API/webServiceGet";

import LoadingViewComponent from "../../shared/loadingview";
import ErrorViewComponent from "../../shared/errorview";

import GeneratorInventoryView from "./GeneratorInventoryView";

export class GeneratorInventoryWrapper extends Component {
    
    render() {
      if (this.props.loading) {
        return <LoadingViewComponent pagetitle="Generator Inventory Page" />
      } else if (this.props.generators) {
        return <GeneratorInventoryView {...this.props} />
      } else {
        return  <ErrorViewComponent error={this.props.error} />
      }
    }
  }
  
  class GeneratorInventorysContainer extends React.Component {
    state = { loading: true };

  async componentDidMount() {
    WebServiceGet("api/settings/GetGeneratorInventory")
    .then(resp => {
        if (resp.successful) {         
          this.setState({            
            generators: resp.viewdata,
            loading: false,
          });
        }   
        else {
          this.setState({
            loading: false,
            error: resp.error
          });
        }  
     })};
  
    render() {
      return <GeneratorInventoryWrapper {...this.state} />;
    }
  }
  
  export default withUnmounted(GeneratorInventorysContainer);

