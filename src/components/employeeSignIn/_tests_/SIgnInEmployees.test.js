import SignInEmployees from "../EmployeeSignIn";
import React from "react";
import { shallow } from "enzyme";

describe("SignInEmployees", () => {
  const mockProps = {
    employees: [
      {
        cellPhone: "90135900",
        employeeId: 57,
        firstName: "Justin",
        isTerminated: false,
        lastBarcode: "",
        lastName: "2",
        lastPosition: 1
      }
    ],
    positions: [
      { positionId: 8, title: "Electrical Helper", abbreviation: "EH" }
    ],
    signIns: [
      {
        employeeId: 1,
        positionId: 4,
        signInEmployeeId: 144,
        signInEventId: 128
      }
    ]
  };
  let wrapper = shallow(<SignInEmployees {...mockProps} />);
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
