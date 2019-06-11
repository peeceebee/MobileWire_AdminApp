import React from "react";
import ReactTable from "react-table";
import { getPositions } from "../../utility/API/fetches";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSlash, faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSlash, faUser);

export class MaintainPositions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionList: [],
      loading: true
    };
  }

  async componentDidMount() {
    let positions = await getPositions();
    this.setState({ positionList: positions, loading: false });
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
            {e.value}{" "}
          </Link>
        )
      },
      { Header: "Abbreviation", accessor: "abbreviation" }
    ];
    const { loading, positionList } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <section className="maintain-positions">
        <h3>Maintain Positions</h3>
        <ReactTable
          className="-striped -highlight"
          showPagination={false}
          defaultPageSize={this.state.positionList.length}
          data={positionList}
          columns={columns}
        />
      </section>
    );
  }
}
MaintainPositions.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};
export default MaintainPositions;
