import React from "react";
import ReactTable from "react-table";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash, faUser } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSlash, faUser);

export class EmployeesView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        employeeList: this.combineNames(this.props.employees),
        positionList: this.props.positions,
      };
    }
   
    combineNames = employees => {
      return employees.map(employee => {
        const employeeFullName = `${employee.lastName.toUpperCase()}, ${employee.firstName}`;
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
          width: 140,
          style: {textAlign: "left"},
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
      const { employeeList } = this.state;
      return (
        <section className="maintain-employees">
          <h3>Maintain Employees</h3>
          <section className="button-container">
            <button
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

  EmployeesView.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };
  
  export default withRouter(EmployeesView);
  