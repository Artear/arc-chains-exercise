import React from "react";
import { shallow } from "enzyme";
import AddToCart from "./default.jsx";

describe("AddToCart", () => {
  beforeEach(() => {
    global.Sales = {
      addItemToCart: jest.fn()
    };
    global.console.log = jest.fn();
  });
  it("should render", () => {
    const wrapper = shallow(<AddToCart />);
    expect(wrapper).toBeDefined();
  });
  it("the on button click Sales.addItemToCart is called", done => {
    const wrapper = shallow(<AddToCart />);
    global.Sales.addItemToCart.mockReturnValue(Promise.resolve("test"));
    wrapper.find("button").simulate("click");
    setTimeout(() => {
      expect(global.Sales.addItemToCart).toHaveBeenCalledWith(
        "test",
        "test",
        1
      );
      expect(global.console.log).toHaveBeenCalledWith("test");
      done();
    }, 0);
  });
});
