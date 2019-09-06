import React from "react";
import { shallow } from "enzyme";
import ManualSignIn from "./default.jsx";

describe("ManualSignIn", () => {
  beforeEach(() => {
    global.alert = jest.fn();
    global.Identity = {
      login: jest.fn()
    };
    global.console.log = jest.fn();
    // props = {};
  });
  it("should render", () => {
    const wrapper = shallow(<ManualSignIn />);
    expect(wrapper).toBeDefined();
  });
  describe("the Identity.login method will not be invoked if:", () => {
    it("both email and password fields are empty", () => {
      const wrapper = shallow(<ManualSignIn />);
      wrapper.find("button").simulate("click");
      expect(global.alert).toHaveBeenCalledWith(
        "please add an Email address and Password"
      );
    });
    it("password field is empty", () => {
      const wrapper = shallow(<ManualSignIn />);
      wrapper.find('input[name="email"]').simulate("change", {
        target: {
          name: "email",
          value: "test@test.org"
        }
      });
      wrapper.find("button").simulate("click");
      expect(global.alert).toHaveBeenCalledWith(
        "please add an Email address and Password"
      );
    });
    it("email field is empty", () => {
      const wrapper = shallow(<ManualSignIn />);
      wrapper.find('input[name="password"]').simulate("change", {
        target: {
          name: "password",
          value: "abc123"
        }
      });
      wrapper.find("button").simulate("click");
      expect(global.alert).toHaveBeenCalledWith(
        "please add an Email address and Password"
      );
    });
  });
  describe("the Identity.login method is invoked if:", () => {
    it("Both inputs are filled in", done => {
      const wrapper = shallow(<ManualSignIn />);
      wrapper.find('input[name="email"]').simulate("change", {
        target: {
          name: "email",
          value: "test@test.org"
        }
      });
      wrapper.find('input[name="password"]').simulate("change", {
        target: {
          name: "password",
          value: "abc123"
        }
      });
      global.Identity.login.mockReturnValue(Promise.resolve("test"));
      wrapper.find("button").simulate("click");
      setTimeout(() => {
        expect(global.console.log).toHaveBeenCalledWith("test");
        expect(global.Identity.login).toHaveBeenCalledWith(
          "test@test.org",
          "abc123",
          { rememberMe: false }
        );
        done();
      }, 0);
    });
    it("rememberMe is passed as true", done => {
      const wrapper = shallow(<ManualSignIn />);
      wrapper.find('input[name="email"]').simulate("change", {
        target: {
          name: "email",
          value: "test@test.org"
        }
      });
      wrapper.find('input[name="password"]').simulate("change", {
        target: {
          name: "password",
          value: "abc123"
        }
      });
      wrapper.find("input[type='checkbox']").simulate("change", {
        target: {
          name: "rememberMe",
          checked: true
        }
      });
      global.Identity.login.mockReturnValue(Promise.resolve("test"));
      wrapper.find("button").simulate("click");
      setTimeout(() => {
        expect(global.console.log).toHaveBeenCalledWith("test");
        expect(global.Identity.login).toHaveBeenCalledWith(
          "test@test.org",
          "abc123",
          { rememberMe: true }
        );
        done();
      }, 0);
    });
    it("rememberMe is passed as false", done => {
      const wrapper = shallow(<ManualSignIn />);
      wrapper.find('input[name="email"]').simulate("change", {
        target: {
          name: "email",
          value: "test@test.org"
        }
      });
      wrapper.find('input[name="password"]').simulate("change", {
        target: {
          name: "password",
          value: "abc123"
        }
      });
      wrapper.find("input[type='checkbox']").simulate("change", {
        target: {
          name: "rememberMe",
          checked: false
        }
      });
      global.Identity.login.mockReturnValue(Promise.resolve("test"));
      wrapper.find("button").simulate("click");
      setTimeout(() => {
        expect(global.console.log).toHaveBeenCalledWith("test");
        expect(global.Identity.login).toHaveBeenCalledWith(
          "test@test.org",
          "abc123",
          { rememberMe: false }
        );
        done();
      }, 0);
    });
  });
});
