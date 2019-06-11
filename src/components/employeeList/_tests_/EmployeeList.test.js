import EmployeeList from "../EmployeeList";
import React from "react";
import { shallow } from "enzyme";

describe("EmployeeList", () => {
  let wrapper = shallow(<EmployeeList />);
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
