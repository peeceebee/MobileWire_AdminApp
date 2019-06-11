import EventList from "../EventList";
import React from "react";
import { shallow } from "enzyme";

describe("EventList", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventList />);
  });
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe("enumToStr", () => {
    it("Should change a value to a string indicating the event", () => {
      const eventVal = 0;
      const expected = "mobilization";
      const actual = wrapper.instance().enumToStr(eventVal);
      expect(actual).toEqual(expected);
    });
  });
  describe("makeEditLink", () => {
    it("Should create a link", () => {
      const eventId = 1;
      const expected = "/event_sign_in/1969-12-31/1";
      const actual = wrapper.instance().makeEditLink(0, eventId);
      expect(actual).toEqual(expected);
    });
  });
});
