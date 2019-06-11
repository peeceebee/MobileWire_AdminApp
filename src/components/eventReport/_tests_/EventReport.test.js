import { EventReport } from "../EventReport";
import React from "react";
import { shallow } from "enzyme";

describe("EventReport", () => {
  let wrapper;
  const mockProps = {
    employees: [
      {
        cellPhone: "7277547976",
        employeeId: 1,
        firstName: "Peter",
        isTerminated: false,
        lastBarcode: "S01P002",
        lastName: "Baxter",
        lastPosition: 7
      },
      {
        cellPhone: "7277547976",
        employeeId: 2,
        firstName: "Max",
        isTerminated: false,
        lastBarcode: "S01P003",
        lastName: "Silver",
        lastPosition: 8
      }
    ],
    positions: [
      { positionId: 8, title: "Electrical Helper", abbreviation: "EH" },
      { positionId: 5, title: "Electrical Supervisor", abbreviation: "ES" },
      { positionId: 7, title: "Electrician", abbreviation: "ELEC" }
    ],
    signins: [
      {
        employeeId: 1,
        positionId: 5,
        signInEmployeeId: 144,
        signInEventId: 128
      },
      {
        signInEventId: 129,
        signInEmployeeId: 145,
        employeeId: 2,
        positionId: 8
      }
    ]
  };
  beforeEach(() => {
    wrapper = shallow(<EventReport {...mockProps} />);
  });
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("getPostn", () => {
    it.skip("Should return the name of the position given a signIn", () => {
      const mockSignin = {
        employeeId: 1,
        positionId: 5,
        signInEmployeeId: 144,
        signInEventId: 128
      };
      const actual = wrapper.props('getEmpl');
    });
  });
});
