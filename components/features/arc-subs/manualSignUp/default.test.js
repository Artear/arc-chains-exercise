import React from "react";
import { shallow } from "enzyme";
import ManualSignUp from "./default.jsx";

describe("ManualSignUp", () => {
  beforeEach(() => {
    global.alert = jest.fn();
    global.Identity = {
      signUp: jest.fn()
    };
    global.console.log = jest.fn();
  });
  it("should render", () => {
    const wrapper = shallow(<ManualSignUp />);
    expect(wrapper).toBeDefined();
  });
  describe("the Identity.signUp method is not invoked if:", () => {
    it("all the fields are empty", () => {
      const wrapper = shallow(<ManualSignUp />);
      global.Identity.signUp.mockReturnValue(Promise.resolve("test"));
      wrapper.find("button").simulate("click");
      expect(global.alert).toHaveBeenCalledWith(
        "Please add the First Name, First Surname, Email, Password and confirm you are not a robot"
      );
    });
  });
  describe("the Identity.signUp method will be called", () => {
    it("First Name, First Surname, Email and Password fields are filled in, and you are not a robot", done => {
      const wrapper = shallow(<ManualSignUp />);
      wrapper.find('input[name="firstName"]').simulate("change", {
        target: {
          name: "firstName",
          value: "John"
        }
      });
      wrapper.find('input[name="firstSurname"]').simulate("change", {
        target: {
          name: "firstSurname",
          value: "Doe"
        }
      });
      wrapper.find('input[name="email"]').simulate("change", {
        target: {
          name: "email",
          value: "testest@test.com"
        }
      });
      wrapper.find('input[name="password"]').simulate("change", {
        target: {
          name: "password",
          value: "AAAAAaaaaa1213%"
        }
      });
      wrapper.find('input[name="imNotARobot"]').simulate("change", {
        target: {
          name: "imNotARobot",
          checked: true
        }
      });
      global.Identity.signUp.mockReturnValue(Promise.resolve("test"));
      wrapper.find("button").simulate("click");
      setTimeout(() => {
        expect(global.console.log).toHaveBeenCalledWith("test");
        expect(global.Identity.signUp).toHaveBeenCalledWith(
          {
            userName: "testest@test.com",
            credentials: "AAAAAaaaaa1213%"
          },
          {
            displayName: "testest@test.com",
            email: "testest@test.com",
            firstName: "John",
            lastName: "Doe"
          },
          undefined,
          false
        );
        done();
      }, 0);
    });
  });

  describe("the onChange function", () => {
    it("handles input type text", () => {
      const wrapper = shallow(<ManualSignUp />);
      wrapper.find('input[name="email"]').simulate("change", {
        target: {
          name: "email",
          value: "testValue"
        }
      });

      expect(wrapper.state().email).toBe("testValue");
    });
    it("handles input type checkbox", () => {
      const wrapper = shallow(<ManualSignUp />);
      wrapper.find('input[name="imNotARobot"]').simulate("change", {
        target: {
          name: "imNotARobot",
          checked: true
        }
      });
      expect(wrapper.state().imNotARobot).toBe(true);
    });
  });
});
