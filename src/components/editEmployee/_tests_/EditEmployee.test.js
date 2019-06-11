import EditEmployees from "../EditEmployee";
import React from "react";
import { shallow } from "enzyme";
import { updateEmployee } from "../../../utility/API/fetches";

jest.mock("../../../utility/API/fetches", () => ({
  updateEmployee: jest.fn()
}));

describe("EditEmployees", () => {
  let wrapper;
  const mockProps = {
    state: {
      employee: {
        employeeId: 1,
        lastName: "Silver",
        firstName: "Max",
        cellPhone: "1234567",
        lastBarcode: "S10043P1",
        lastPosition: 1,
        isTerminated: false
      }
    }
  };
  beforeEach(() => {
    wrapper = shallow(<EditEmployees location={mockProps} />);
  });
  it("Should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("Should have a default state equivalent to props", () => {
    expect(wrapper.state()).toEqual({
      barcode: "S10043P1",
      cellPhone: "1234567",
      employeeId: 1,
      error: "",
      firstName: "Max",
      lastName: "Silver",
      position: 1,
      terminated: false
    });
  });
  describe("handleChange", () => {
    beforeEach(() => {
      wrapper = shallow(<EditEmployees location={mockProps} />);
    });
    it("Should change state on firstName input change", () => {
      expect(wrapper.state("firstName")).toEqual("Max");
      wrapper
        .find({ name: "firstName" })
        .simulate("change", { target: { name: "firstName", value: "Peter" } });
      wrapper.update();
      expect(wrapper.state("firstName")).toEqual("Peter");
    });
    it("Should change state on lastName input change", () => {
      expect(wrapper.state("lastName")).toEqual("Silver");
      wrapper
        .find({ name: "lastName" })
        .simulate("change", { target: { name: "lastName", value: "Baxter" } });
      wrapper.update();
      expect(wrapper.state("lastName")).toEqual("Baxter");
    });
    it("Should change state on cellPhone input change", () => {
      wrapper.find({ name: "cellPhone" }).simulate("change", {
        target: { name: "cellPhone", value: "7654321" }
      });
      wrapper.update();
      expect(wrapper.state("cellPhone")).toEqual("7654321");
    });
    it("Should change state on barcode input change", () => {
      expect(wrapper.state("barcode")).toEqual("S10043P1");
      wrapper
        .find({ name: "barcode" })
        .simulate("change", { target: { name: "barcode", value: "S10043P5" } });
      wrapper.update();
      expect(wrapper.state("barcode")).toEqual("S10043P5");
    });
  });
  describe("handleToggle", () => {
    it("Should toggle the terminated boolean when handleToggle is called", () => {
      expect(wrapper.state("terminated")).toEqual(false);
      wrapper.find({ name: "terminated" }).simulate("click");
      wrapper.update();
      setTimeout(() => {
        expect(wrapper.state("terminated")).toEqual(true);
      }, 1000);
    });
  });
  describe("handleSaveEmployee", () => {
    it("Should call updateEmployee when the save button is clicked", () => {
      wrapper.find(".save-btn").simulate("click", { preventDefault: () => {} });
      expect(updateEmployee).toHaveBeenCalled();
    });
    it.skip("Should call updateEmployee when the save button is clicked", () => {
      updateEmployee.mockImplementation(() => Promise.reject());
      wrapper.find(".save-btn").simulate("click", { preventDefault: () => {} });
      expect(wrapper.state("error")).toEqual(null);
    });
  });
});
