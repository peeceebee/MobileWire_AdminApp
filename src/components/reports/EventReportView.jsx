import React, { Component } from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";

export default class EventReportView extends Component {
 
  render() {
    const columns = [
        {
            Header: "Position",
            accessor: "position"
          },
          {
            Header: "Count",
            accessor: "count"
          },  
          {
          Header: "Employee",
          accessor: "name"
        },
        {
          Header: "Barcode",
          accessor: "barcode"
        },
      ];
    return (
      <section className="report-container">
        <h3>Sign-In Event Report for {this.props.eventdate} {this.props.eventtype} </h3>
        <div className="report-data">
        <ReactTable
          showPagination={false}
          data={this.props.reportdata}
          columns={columns}
        />
        </div>
      </section>
    );
  }
}

EventReportView.propTypes = {
  reportdata: PropTypes.arrayOf(PropTypes.object)
};
