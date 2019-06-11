import MaintainPositions from "../MaintainPositions";
import React from "react";
import { shallow } from "enzyme";

describe("MaintainPositions", () => {
  let wrapper = shallow(<MaintainPositions />);
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
