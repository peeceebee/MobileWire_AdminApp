import EditEventSignIn from "../EventEditSignIn";
import React from "react";
import { shallow } from "enzyme";

describe("EditEventSignIn", () => {
  let wrapper = shallow(<EditEventSignIn />);
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
