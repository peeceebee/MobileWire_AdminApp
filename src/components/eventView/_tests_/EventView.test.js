import EventView from "../EventView";
import React from "react";
import { shallow } from "enzyme";

describe("EventView", () => {
  const mockProps = {
    match: {
      params: {
        id: '12'
      }
    }
  };
  let wrapper = shallow(<EventView {...mockProps} />);

  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
