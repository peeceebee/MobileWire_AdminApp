import EditPositions from "../EditPosition";
import React from "react";
import { shallow } from "enzyme";
import { updatePosition } from "../../../utility/API/fetches";
jest.mock("../../../utility/API/fetches", () => ({
  updatePosition: jest.fn()
}));

describe("EditPositions", () => {
  let wrapper;
  const mockProps = {
    state: {
      position: {
        positionId: "1",
        title: "Site Manager",
        abbreviation: "SM"
      }
    }
  };
  beforeEach(() => {
    wrapper = shallow(<EditPositions location={mockProps} />);
  });
  afterEach(() => {
    wrapper = shallow(<EditPositions location={mockProps} />);
  });
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  describe("SetPositions", () => {
    it("Should set passed in positions to state when the component mounts", () => {
      expect(wrapper.state()).toEqual({
        abbreviation: "SM",
        error: "",
        positionId: "1",
        title: "Site Manager"
      });
    });
  });
  describe("handleSavePosition", () => {
    it("Should call updatePosition when the save button is clicked", () => {
      wrapper.find(".save-btn").simulate("click", { preventDefault: () => {} });
      expect(updatePosition).toHaveBeenCalled();
    });
    it("Should set the state with an error if the response has one", async () => {
      await updatePosition.mockReturnValue("Error message");
      wrapper.find(".save-btn").simulate("click", { preventDefault: () => {} });
      wrapper.update();
      setTimeout(() => {
        expect(wrapper.state("error")).toEqual("Error message");
      }, 1000);
    });
  });
  describe("handleChange", () => {
    it("Should call handleChange when the title input value changes", () => {
      expect(wrapper.state("title")).toEqual("Site Manager");
      wrapper.find('input[name="title"]').simulate("change", {
        target: {
          name: "title",
          value: "Project Manager"
        }
      });
      expect(wrapper.state("title")).toEqual("Project Manager");
    });
    it("Should call handleChange when the abbreviation input value changes", () => {
      expect(wrapper.state("abbreviation")).toEqual("SM");
      wrapper.find('input[name="abbreviation"]').simulate("change", {
        target: {
          name: "abbreviation",
          value: "PM"
        }
      });
      expect(wrapper.state("abbreviation")).toEqual("PM");
    });
  });
});
