import React from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSlash, faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSlash, faUser);

export class PositionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionList: this.props.positions,
    };
  }

  findPosition = id => {
    const { positionList } = this.state;
    return positionList.filter(postn => postn.positionId === id).pop();
  };

  render() {
    const columns = [
      {
        Header: "Position",
        accessor: "title",
        width: 200,
        Cell: e => (
          <Link
            to={{
              pathname: `maintain=positions/${e.original.positionId}`,
              state: { position: this.findPosition(e.original.positionId) }
            }}
          >
            {e.value.toUpperCase()}{" "}
          </Link>
        )
      },
      { Header: "Abbreviation", accessor: "abbreviation" }
    ];
    const { positionList } = this.state;
    return (
      <section className="maintain-positions">
        <h3>Maintain Positions</h3>
        <ReactTable
          showPagination={false}
          defaultPageSize={this.state.positionList.length}
          data={positionList}
          columns={columns}
          className="-striped -highlight"
          
        />
      </section>
    );
  }
}

PositionsView.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default PositionsView;
