import React from "react";
import ReactTable from "react-table";
import { getEmpsAndPositns } from "../../utility/API/fetches";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

library.add(faUserSlash, faUser);

export class MaintainEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
      positionList: [],
      loading: true
    };
  }

  async componentDidMount() {
    let response = await getEmpsAndPositns();
    const employees = this.combineNames(response.allEmployees);
    this.setState({
      employeeList: employees,
      positionList: response.allPositions,
      loading: false
    });
  }

  combineNames = employees => {
    return employees.map(employee => {
      const employeeFullName = `${employee.firstName} ${employee.lastName}`;
      return { ...employee, fullName: employeeFullName };
    });
  };

  findEmployee = id => {
    const { employeeList } = this.state;
    return employeeList.filter(empl => empl.employeeId === id).pop();
  };

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "fullName",
        width: 200,
        Cell: e => (
          <Link
            to={{
              pathname: `maintain=employees/${e.original.employeeId}`,
              state: {
                employee: this.findEmployee(e.original.employeeId),
                allPositions: this.state.positionList
              }
            }}
          >
            {e.value}
          </Link>
        )
      },
      {
        Header: "Position",
        accessor: "lastPosition",
        Cell: e => e.original.lastPositionTitle
      },
      { Header: "BarCode", accessor: "lastBarcode", width: 200 },
      {
        Header: "Status",
        accessor: "isTerminated",

        Cell: e =>
          e.original.isTerminated ? (
            <FontAwesomeIcon className="event-icon" icon="user-slash" />
          ) : (
              <FontAwesomeIcon className="event-icon" icon="user" />
            )
      }
    ];
    const { loading, employeeList } = this.state;
    return loading ? (
      <Loading />
    ) : (
        <section className="maintain-employees">
          <h3>Maintain Employees</h3>
          <section className="button-container">
            <button
              className="button"
              type="button"
              onClick={() => {
                this.props.history.push({
                  pathname: `maintain=employees/0`,
                  state: {
                    employee: null,
                    allPositions: this.state.positionList
                  }
                });
              }}>Add Employee
            </button>
          </section>
          <ReactTable
            defaultPageSize={employeeList.length}
            showPagination={false}
            data={employeeList}
            columns={columns}
            className="-striped -highlight"
          />
        </section>
      );
  }
}
MaintainEmployees.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
};

export default MaintainEmployees;
