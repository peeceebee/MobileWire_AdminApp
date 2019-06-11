import React from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class MissionSettingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mission: this.props.mission,
      contract: this.props.contract,
      task: this.props.task,
      mobdate: moment(this.props.mobdate).format("YYYY-MM-DD"),
      demobdate: moment(this.props.demobdate).format("YYYY-MM-DD"),
      positionList: this.props.positions,
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleDateChange = (propname,value)  => {
    const date = moment(value).format("YYYY-MM-DD");
    this.setState({ [propname]: date });
  };

  render() {
    return (
      <section className="mission-settings-container">
        <h3>Mission Settings</h3>
        <form>
          <label>Mission Name:</label>
          <input
            name="mission"
            type="text"
            placeholder="Mission name"
            value={this.state.mission}
            onChange={this.handleChange}
          />
          <label>Contract Number:</label>
          <input
            name="contract"
            type="text"
            placeholder="Contract name"
            value={this.state.contract}
            onChange={this.handleChange}
          />
          <label>Task Order Number:</label>
          <input
            name="task"
            type="text"
            placeholder="Task Order Num"
            value={this.state.task}
            onChange={this.handleChange}
          />      
            <label>MOB Date:</label>
            <DatePicker
              todayButton={"Today"}
              name="mobdate"
              dateFormat="yyyy-MM-dd"                         
              onChange={(value) => this.handleDateChange("mobdate", value)}
              value={this.state.mobdate}
            />
            <label>DEMOB Date:</label>
            <DatePicker
              todayButton={"Today"}
              name="demobdate"
              dateFormat="yyyy-MM-dd"
              onChange={(value) => this.handleDateChange("demobdate", value)}
              value={this.state.demobdate}
            />         
          <span className="error-msg">{this.state.error}</span>
          <section className="button-container">
            <button className="save-btn" onClick={this.handleSaveSettings}>
              Save
        </button>
            <button
              type="button"
              onClick={() => {
                this.props.history.push("/settings");
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

export default withRouter(MissionSettingView);
