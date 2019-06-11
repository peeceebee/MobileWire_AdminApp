import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);

export const EventReport = props => {
  const getPostn = signin => {
    return props.positions.filter(
      postn => postn.positionId === signin.positionId
    );
  };
  const getEmpl = signin => {
    let empl = props.employees.filter(
      empl => empl.employeeId === signin.employeeId
    );
    empl = empl.pop();
    return `${empl.firstName} ${empl.lastName}`;
  };

  const signins = props.signins.map(signin => {
    const postn = getPostn(signin);
    const emplName = getEmpl(signin);
    return {
      name: emplName,
      position: postn.pop().title,
      barcode: signin.lastBarcode,
      employeeId: signin.employeeId,
      signInEventId: signin.signInEventId
    };
  });

  const columns = [
    {
      Header: "Name",
      accessor: "name"
    },
    {
      Header: "Barcode",
      accessor: "barcode"
    },
    {
      Header: "Position",
      accessor: "position"
    },
    {
      Header: "",
      accessor: "isLocked",
      Cell: e => (
        <button onClick={() => props.removeSignIn(e)}>
          <FontAwesomeIcon className="event-icon" icon="trash" />
        </button>
      )
    }
  ];

  return (
    <ReactTable
      data={signins}
      columns={columns}
      className="-striped -highlight"
    />
  );
};

EventReport.propTypes = {
  signins: PropTypes.arrayOf(PropTypes.object),
  employees: PropTypes.arrayOf(PropTypes.object),
  positions: PropTypes.arrayOf(PropTypes.object)
};
