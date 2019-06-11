import React, { Component } from "react";
import Select from "react-select";
import moment from "moment";
import PropTypes from "prop-types";
import WebServicePost from "../../utility/API/webServicePost";

export class EmployeeSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredBarcode: "",
      barcodeError: "",
      error: ""
    };
  }

  ValidateBc = bc => {
    if (!this.props.employees) return "";
    const empl = this.props.employees.find(
      e => e.lastBarcode.toUpperCase() === bc.toUpperCase()
    );
    if (!empl) {
      return (
        "Barcode (" + bc.toUpperCase() + ") is not assigned to an employee."
      );
    } else {
      if (!this.props.signins) return "";
      const si = this.props.signins.find(s => s.employeeId === empl.employeeId);
      if (si) {
        return (
          "Employee (" +
          empl.firstName +
          " " +
          empl.lastName +
          ") has already signed in."
        );
      }
    }
    return " ";
  };

  HandleKeyPressEv = e => {
    if (e.keyCode === 13) {
      const bcStatus = this.ValidateBc(e.target.value);
      this.setState({
        enteredBarcode: e.target.value,
        barcodeError: bcStatus
      });
    }
  };

  handleSignIn = (empl, postn) => {
    const { enteredBarcode } = this.state;
    if (empl) {
      const employeeReq = {
        signInEventId: this.props.eventid,
        employeeId: empl.value,
        positionId: postn.value,
        barCode: enteredBarcode,
        signInDateTime: moment().format("YYYY-MM-DDTHH:mm:ssZ")
      };
      this.setState({ enteredBarcode: "", signInError: "" });
      this.signInEmployee(employeeReq);
    } else {
      this.setState({ error: "All fields are required!" });
    }
  };

  signInEmployee = empl => {
    WebServicePost("api/signin/SignInEmployee", empl).then(resp => {
      if (resp.successful) {
        this.setState({
          employees: resp.viewdata.allEmployees
        });
        this.props.getResponse(resp.viewdata);
      } else {
        console.log(resp);
        this.setState({
          error: resp.error
        });
      }
    });
  };

  enumToStr = val => {
    const strs = ["mobilization", "morning", "night"];
    return strs[val];
  };

  render() {
    const { employees, positions } = this.props;
    const postnOptions = positions.map(function(v) {
      return { value: v.positionId, label: v.title };
    });
    const emplOptions = employees.map(function(v) {
      return { value: v.employeeId, label: v.lastName + ", " + v.firstName };
    });
    const valueFromId = (opts, id) => opts.find(o => o.value === id);
    function findEmplOption(optns, propempls, bc) {
      if (bc == null || bc.length < 1) return null;
      const empl = propempls.find(
        e => e.lastBarcode.toUpperCase() === bc.toUpperCase()
      );
      if (empl != null) {
        return optns.find(o => o.value === empl.employeeId);
      }
    }
    function findPostnOption(optns, propempls, bc) {
      if (bc == null || bc.length < 1) return null;
      const empl = propempls.find(
        e => e.lastBarcode.toUpperCase() === bc.toUpperCase()
      );
      if (empl != null) {
        return optns.find(o => o.value === empl.lastPosition);
      }
    }
    const selEmpl = findEmplOption(
      emplOptions,
      this.props.employees,
      this.state.enteredBarcode
    );
    const selPostn = findPostnOption(
      postnOptions,
      this.props.employees,
      this.state.enteredBarcode
    );

    return (
      <section className="sign-in-employees">
        <h3>Sign In Employee</h3>
        <span className="sign-in-employee-date">
          {this.props.eventdate} - {this.enumToStr(this.props.eventtype)}{" "}
        </span>
        <div className="sign-in-btn-container">
          <section>
            <input
              type="text"
              placeholder="Barcode..."
              onKeyUp={this.HandleKeyPressEv}
            />
            <label>{this.state.barcodeError}</label>
          </section>

          <Select
            value={valueFromId(
              emplOptions,
              selEmpl != null ? selEmpl.value : 0
            )}
            onChange="(function(e){selEmpl=e.target.value;})"
            options={emplOptions}
          />
          <Select
            value={valueFromId(
              postnOptions,
              selPostn != null ? selPostn.value : 0
            )}
            onChange="(function(e){selPostn=e.target.value;})"
            options={postnOptions}
          />
          <span className="error-msg">{this.state.error}</span>
          <button onClick={() => this.handleSignIn(selEmpl, selPostn)}>
            Sign in
          </button>
        </div>
      </section>
    );
  }
}

EmployeeSignIn.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object),
  eventDate: PropTypes.string,
  eventid: PropTypes.string,
  eventtype: PropTypes.number,
  loading: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.object),
  signInEmployees: PropTypes.func,
  signins: PropTypes.arrayOf(PropTypes.object)
};

export default EmployeeSignIn;
