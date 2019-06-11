import React, { Component } from "react";
import Select from "react-select";
import WebServicePost from "../../utility/API/webServicePost";

// SVG Imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

library.add(faArrowAltCircleLeft);

export class EditEmployee extends Component {
  constructor(props) {
    super(props);
  
        this.state = {
      employeeId: 0,
      lastName: "",
      firstName: "",
      cellPhone: "",
      barcode: "",
      positionTitle: "",
      positionId: "",
      terminated: false,
      error: ""
    };
  }

  componentDidMount() {
     if (this.props.match.params.id > 0)  {
        this.setEmployee();
     }
    this.createPositionOptions();
  }

  setEmployee = () => {
    const {
      employeeId,
      lastName,
      firstName,
      cellPhone,
      lastBarcode,
      lastPositionTitle,
      lastPosition,
      isTerminated
    } = this.props.location.state.employee;
    this.setState({
      employeeId,
      lastName,
      firstName,
      cellPhone,
      barcode: lastBarcode,
      positionTitle: lastPositionTitle,
      positionId: lastPosition,
      terminated: isTerminated
    });
  };
  createPositionOptions = () => {
    const { allPositions } = this.props.location.state;
    const positionOptions = allPositions.map(postn => {
      return { value: postn.positionId, label: postn.title };
    });
    this.setState({ positionOptions });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSelect = e => {
    const { label, value } = e;
    this.setState({ positionTitle: label, positionId: value });
  };

  handleToggle = e => {
    this.setState({ terminated: !this.state.terminated });
  };

  handleSaveEmployee = async e => {
    e.preventDefault();
    const {
      employeeId,
      lastName,
      firstName,
      cellPhone,
      terminated,
      barcode,
      positionId
    } = this.state;
    const request = {
      employeeId,
      firstName,
      lastName,
      cellPhone,
      isTerminated: terminated,
      lastBarcode: barcode,
      lastPosition: positionId
    };
    console.log(request);
    WebServicePost("api/settings/UpdateEmployee", request).then(resp => {
      if (resp.successful) {
        this.props.history.push("/maintain=employees");
      } else {
        this.setState({
          error: resp.error
        });
      }
    });
  };
  
  render() {
    return (
      <section className="edit-employees-container">
        <h3>Edit Employee</h3>
        <form>
          <label>First Name:</label>
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <label>Last Name:</label>
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <label>Cellphone:</label>
          <input
            name="cellPhone"
            type="text"
            placeholder="Cellphone"
            value={this.state.cellPhone}
            onChange={this.handleChange}
          />
          <label>Barcode:</label>
          <input
            name="barcode"
            type="text"
            placeholder="Barcode"
            value={this.state.barcode}
            onChange={this.handleChange}
          />
          <label>Position:</label>
          <Select
            name="position"
            value={{ label: this.state.positionTitle }}
            onChange={this.handleSelect}
            options={this.state.positionOptions}
          />
          <div className="terminate-container">
            <input
              name="terminated"
              type="checkbox"
              checked={this.state.terminated}
              onChange={this.handleToggle}
            />
            <label>Terminated</label>
          </div>
          <span className="error-msg">{this.state.error}</span>
          <section className="button-container">
            <button className="save-btn" onClick={this.handleSaveEmployee}>
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.history.push("/maintain=employees");
              }}
            >
              Cancel
            </button>
          </section>
        </form>
      </section>
    );
  }
}

EditEmployee.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default EditEmployee;
