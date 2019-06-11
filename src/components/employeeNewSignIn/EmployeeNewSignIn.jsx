import React from "react";
import withUnmounted from "@ishawnwang/withunmounted";
import PropTypes from "prop-types";
import Select from "react-select";
import WebServicePost from "../../utility/API/webServicePost";

class EmployeeNewSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      cellphone: "",
      barcode: "",
      selposition: null,
      positionid: 0
    };
    this.submitNewEmp = this.submitNewEmp.bind(this);
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSelect = e => {
    this.setState({
      selposition: e,
      positionid: e.value
    });
  };
  submitNewEmp = async event => {
    event.preventDefault();
    const request = {
      lastName: this.state.lastname,
      firstName: this.state.firstname,
      cellPhone: this.state.cellphone,
      barCode: this.state.barcode,
      positionId: parseInt(this.state.positionid),
      signInEventId: this.props.eventid
    };
    WebServicePost("api/signin/EmployeeNewSignIn", request).then(resp => {
      if (resp.successful) {
        this.setState({ signins: resp.viewdata.signIns });
        this.props.getResponse(resp.viewdata);
      } else {
        this.setState({
          error: resp.error
        });
      }
    });
  };
  render() {
    // console.log(this.props)
    const positionOptions = this.props.positions.map(postn => {
      return { value: postn.positionId, label: postn.title };
    });
    return (
      <section className="sign-in-new-employee-container">
        <h3>Sign In New Employee</h3>
        <form>
          <label>First Name:</label>
          <input
            name="firstname"
            type="text"
            placeholder="First name"
            value={this.state.firstname}
            onChange={this.handleInputChange}
          />
          <label>Last Name:</label>
          <input
            name="lastname"
            type="text"
            placeholder="Last name"
            value={this.state.lastname}
            onChange={this.handleInputChange}
          />
          <label>Cellphone:</label>
          <input
            name="cellphone"
            type="text"
            placeholder="Cellphone"
            value={this.state.cellphone}
            onChange={this.handleInputChange}
          />
          <label>Barcode:</label>
          <input
            name="barcode"
            type="text"
            placeholder="Barcode"
            value={this.state.barcode}
            onChange={this.handleInputChange}
          />
          <label>Position:</label>
          <Select
            name="position"
            value={this.state.selposition}
            onChange={this.handleSelect}
            options={positionOptions}
          />
          <button onClick={this.submitNewEmp}>New Employee Sign-In</button>
          <span className="error-msg">{this.state.error}</span>
        </form>
      </section>
    );
  }
}
EmployeeNewSignIn.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object),
  eventDate: PropTypes.string,
  eventid: PropTypes.string,
  eventtype: PropTypes.number,
  loading: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.object),
  submitNewEmp: PropTypes.func,
  signins: PropTypes.arrayOf(PropTypes.object)
};
export default withUnmounted(EmployeeNewSignIn);
