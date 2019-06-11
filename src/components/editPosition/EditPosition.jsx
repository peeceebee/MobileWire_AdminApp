import React, { Component } from "react";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import WebServicePost from "../../utility/API/webServicePost";
library.add(faArrowAltCircleLeft);

export class EditPosition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionId: "",
      title: "",
      abbreviation: "",
      error: ""
    };
  }

  componentDidMount() {
    this.setPosition();
  }

  setPosition = () => {
    const {
      positionId,
      title,
      abbreviation
    } = this.props.location.state.position;
    this.setState({
      positionId,
      title,
      abbreviation
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSavePosition = async e => {
    e.preventDefault();
    const { positionId, title, abbreviation } = this.state;
    const request = {
      positionId,
      title,
      abbreviation
    };
    WebServicePost("api/settings/UpdatePosition", request).then(resp => {
      if (resp.successful) {
        this.setState({
        });
        this.props.history.push("/maintain=positions");
      } else {
        this.setState({
          error: resp.error
        });
      }
    });
  };

  render() {
    return (
      <section className="edit-position-container">
        <h3>Edit Position</h3>
        <form>
          <label>Position Title:</label>
          <input
            name="title"
            type="text"
            placeholder="Position Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label>Abbreviation: </label>
          <input
            name="abbreviation"
            type="text"
            placeholder="Abbreviation"
            value={this.state.abbreviation}
            onChange={this.handleChange}
          />
          <span className="error-msg">{this.state.error}</span>
          <section className="button-container">
            <button className="save-btn" onClick={this.handleSavePosition}>
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                this.props.history.push("/maintain=positions");
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

EditPosition.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
export default EditPosition;
