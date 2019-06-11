import React, { Component } from "react";
import Select from "react-select";

import PropTypes from "prop-types";
import WebServicePost from "../../utility/API/webServicePost";

export class EmployeeSignInEdit
 extends Component {

  constructor(props) {
    super(props);
    const postnOptions = this.props.positions.map(function(v) {
      return { value: v.positionId, label: v.title };
    });

    this.state = {
      barcode: "",
      selemployee: null,
      selposition: null,
      positionopts: postnOptions,
    };
  }

  handleEdit = (emp, pos, bcode) => {
    const employeeReq = {
      signInEventId: this.props.eventid,
      employeeId: emp.value,
      positionId: pos.value,
      barCode: bcode    
    };
    WebServicePost("api/signin/UpdateSignIn", employeeReq).then(resp => {
      if (resp.successful) {
        this.setState({
         error: '',
         barcode: ''
        });
      } 
      else {
        console.log(resp);
        this.setState({
          error: resp.error
        });
      }
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleEmployeeSelect = e => {
    this.setState({ selemployee: e });
    const thissignin = this.props.signins.find(f => f.employeeId === e.value);
    if (thissignin != null) {
      const posop = this.state.positionopts.find(
        f => f.value === thissignin.positionId
      );
      const bc = thissignin.lastBarcode === null ? " " : thissignin.lastBarcode;
      this.setState({
        barcode: bc,
        selposition: posop
      });
    } else {
      this.setState({
        selposition: null,
        barcode: ""
      });
    }
  };

  render() {
    const signedInEmplOptions = this.props.signins.map(function(v) {
      return { value: v.employeeId, label: v.employeeName };
    });
    // return empty content ifthere are no signins
    if (this.props.signins === null || this.props.signins.length === 0) {
      return null;
    }
    return (
      <section className="sign-in-employee-edit-container">
        <h3>Edit Employee Sign-In</h3>
        <form>
          <label>Signed In Employee:</label>
          <Select
            value={this.state.selemployee}
            onChange={this.handleEmployeeSelect}
            options={signedInEmplOptions}
          />
          <label>Barcode:</label>
          <input
            name="barcode"
            type="text"
            placeholder="Barcode"
            value={this.state.barcode}
            onChange={this.handleChange}
          />
          <div className="terminate-container">
          <Select
            value={this.state.selposition}
            onChange={this.handlePositionSelect}
            options={this.state.positionopts}
          />
          </div>
          <span className="error-msg">{this.state.error}</span>
          <button
            onClick={() =>
              this.handleEdit(this.state.selemployee, this.state.selposition, this.state.barcode)
            }
          >
            Save Changes
          </button>
        </form>
      </section>
    );
  }
}

EmployeeSignInEdit
.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object),
  eventDate: PropTypes.string,
  eventid: PropTypes.string,
  eventtype: PropTypes.number,
  loading: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.object),
  signInEmployees: PropTypes.func,
  signins: PropTypes.arrayOf(PropTypes.object)
};

export default EmployeeSignInEdit;
