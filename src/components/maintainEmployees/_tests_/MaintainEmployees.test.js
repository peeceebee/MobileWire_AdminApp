import MaintainEmployees from "../MaintainEmployees";
import React from "react";
import { shallow } from "enzyme";

describe("MaintainEmployees", () => {
  let wrapper = shallow(<MaintainEmployees />);
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
