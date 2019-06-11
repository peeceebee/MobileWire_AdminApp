import React from "react";
import { withRouter } from "react-router-dom";
import WebServicePost from "../../../utility/API/webServicePost";
import CheckBox from "../../shared/checkbox";

export class GeneratorEditView extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props, 'GenEditView constructor');
    this.state = {
      barcode: '',
      location: '',
      powerpack: '',
      powerrange: '',
      kwprime: 0,
      phaseconfig: '',
      isswitchable: false,
      make: '',
      model: '',
      serialnumber: '',
      weight: 0,
      fuelcapacity: 0,
      hourmeter: 0,
      skidmounted: false,
      assigned: false,
      generatorid: this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.props.match.params.id > 0) {
      this.setGenerator();
    }
  }

  setGenerator = () => {
    this.setState({
      generatorid: this.props.generator.generatorid,
      barcode: this.props.generator.barcode,
      location: this.props.generator.location,
      powerpack: this.props.generator.powerpack,
      powerrange: this.props.generator.powerrange,
      kwprime: this.props.generator.kwprime,
      phaseconfig: this.props.generator.phaseconfig,
      isswitchable: this.props.generator.isswitchable,
      make: this.props.generator.make,
      model: this.props.generator.model,
      serialnumber: this.props.generator.serialnumber,
      weight: this.props.generator.weight,
      fuelcapacity: this.props.generator.fuelcapacity,
      hourmeter: this.props.generator.hourmeter,
      skidmounted: this.props.generator.skidmounted,
      assigned: this.props.generator.assigned,
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    this.setState({
      [name]: !this.state[name],
    });
  };

  handleSave = async e => {
    e.preventDefault();
    const request = {
      generatorid: this.state.generatorid,
      barcode: this.state.barcode,
      location: this.state.location,
      powerpack: this.state.powerpack,
      powerrange: this.state.powerrange,
      kwprime: this.state.kwprime,
      phaseconfig: this.state.phsaeconfig,
      isswitchable: this.state.isswitchable,
      make: this.state.make,
      model: this.state.model,
      serialnumber: this.state.serialnumber,
      weight: this.state.weight,
      fuelcapacity: this.state.fuelcapacity,
      hourmeter: this.state.hourmeter,
      skidmounted: this.state.skidmounted,
      assigned: this.state.assigned
    };
    console.log(request);
    WebServicePost("api/settings/UpdateGenerator", request).then(resp => {
      if (resp.successful) {
        this.props.history.push("/maintain=geninventory");
      } else {
        this.setState({
          error: resp.error
        });
      }
    });
  };
  render() {
    return (
      <section className="gen-edit-container">
        <h3>Generator Properties</h3>
        <form>
          <label>Barcode:</label>
          <input
            name="barcode"
            type="text"
            placeholder="b/c"
            value={this.state.barcode}
            onChange={this.handleChange}
          />
          <div >
            <CheckBox
              label="Assigned to Mission?" name="assigned"
              isSelected={this.state.assigned}
              onCheckboxChange={this.handleCheckboxChange}
              key='cb_001' />
          </div>
          <label>Location:</label>
          <input
            name="location"
            type="text"
            placeholder="loction"
            value={this.state.location}
            onChange={this.handleChange}
          />
          <label>KW Prime:</label>
          <input
            name="kwprime"
            type="text"
            placeholder="kw prime"
            value={this.state.kwprime}
            onChange={this.handleChange}
          />
          <label>Make:</label>
          <input
            name="make"
            type="text"
            placeholder="make"
            value={this.state.make}
            onChange={this.handleChange}
          />
          <label>Model:</label>
          <input
            name="model"
            type="text"
            placeholder="model"
            value={this.state.model}
            onChange={this.handleChange}
          />
          <label>Weight:</label>
          <input
            name="weight"
            type="text"
            placeholder="weight"
            value={this.state.weight}
            onChange={this.handleChange}
          />
          <label>Fuel Capacity:</label>
          <input
            name="fuel"
            type="text"
            placeholder="fuel capacity"
            value={this.state.fuelcapacity}
            onChange={this.handleChange}
          />
          <label>Serial Num:</label>
          <input
            name="serialnumber"
            type="text"
            placeholder="serial number"
            value={this.state.serialnumber}
            onChange={this.handleChange}
          />
          <label>Power Pack Range:</label>
          <input
            name="powerrange"
            type="text"
            placeholder="power pack range"
            value={this.state.powerrange}
            onChange={this.handleChange}
          />
          <div style={{ display: 'inline-block' }} >
            <CheckBox
              label="Is switchable?" name="isswitchable"
              isSelected={this.state.isswitchable}
              onCheckboxChange={this.handleCheckboxChange}
              key='cb_002' />
          </div>
          <span className="error-msg">{this.state.error}</span>
          <section className="button-container">
            <button className="save-btn" onClick={this.handleSaveSettings}>
              Save
        </button>
            <button
              type="button"
              onClick={() => {
                this.props.history.push("/maintain=geninventory");
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

export default withRouter(GeneratorEditView);
