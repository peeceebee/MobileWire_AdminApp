import EventSignInEdit from "../EventSignInEdit";
import React from "react";
import { shallow } from "enzyme";

describe("EventSignInEdit", () => {
  const mockProps = {
    signineventid: 12
  };
  let wrapper = shallow(<EventSignInEdit mockProps={mockProps} />);

  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
