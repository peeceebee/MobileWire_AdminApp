import React from "react";

class ErrorViewComponent extends React.Component {

render() {
    return (   
        <div>  
        <h3>Load Error</h3>  
        <h4> An error occured while loading this page. </h4>
        <h4> {this.props.error} </h4>
        </div> 
        );
    }
};

export default ErrorViewComponent;