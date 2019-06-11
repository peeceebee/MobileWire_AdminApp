import Nav from "../Nav";
import React from "react";
import { shallow } from "enzyme";

describe("Nav", () => {
  let wrapper = shallow(<Nav />);
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

