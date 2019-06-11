import HomeView from "../homeView";
import React from "react";
import { shallow } from "enzyme";

describe("HomeView", () => {
  let wrapper = shallow(<HomeView />);
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
   