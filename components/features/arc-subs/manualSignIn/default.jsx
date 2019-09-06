/*
eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import React, { Component } from "react";
import getProperties from "fusion:properties";

/**
 * ManualSignIn class component renders 3 input fields controlled by the @function onChange and a button that triggers the @function signIn
 *
 * @function signIn
 * checks if the email and password values are present
 * if true:
 * Calls the getProperties method imported from the fusion:properties namespace
 * getProperties returns the props stored inside the properties/index.json, which we deconstruct and assign to the apiOrigin constant
 * window.Identity.apiOrigin is set to the apiOrigin constant
 * calls the @async window.Identity.signIn
 * @param {email: string, password: string}
 * @returns {Promise} <APIErrorResponse | UserIdentity>
 * if false:
 * throws an alert to the user
 * @function onChange
 * @param event
 * checks for the name of the event and sets the appropriate state
 * */

class ManualSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: false
    };
    this.signIn = this.signIn.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  signIn() {
    if (this.state.email && this.state.password) {
      /*
        Some credentials that will return a valid response:
        login: testuser2
        pass: 1234567_Aa

        login2: testuser7865_badf31123@test.com
        pass2: #AlphaTestUSer123%!

        In this case we reset the apiOrigin to a reacheable one
        The apiOrigin is saved in the 'index.json' file inside the 'properties' folder
        */
      const { apiOrigin } = getProperties();
      window.Identity.apiOrigin = apiOrigin;
      /*
          the following is based of the doc instruction of use of the arc-sub's Identity/sdk api calls
          login(userName: string, password: string, options?: object): Promise<APIErrorResponse | UserIdentity>
          more can be found at:https://s3.amazonaws.com/arc-learning-center-static/docs/api/arc-sdks/modules/sdk_identity.html#login
          */
      window.Identity.login(this.state.email, this.state.password, {
        rememberMe: this.state.rememberMe
      })
        .then(console.log)
        .catch(console.error);
      /*
        REPLACE THE ABOVE CONSOLE STATEMENTS WITH THE APPROPRIATE LOGIC ONCE YOU START DEVELOPMENT
      */
    } else {
      alert("please add an Email address and Password");
    }
  }

  onChange(e) {
    if (e.target.name === "rememberMe") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="font--primary">Sign In</h1>
        <label className="font--primary">
          Email
          <input onChange={this.onChange} name="email" className="input" />
        </label>
        <label className="font--primary">
          Password
          <input
            onChange={this.onChange}
            name="password"
            className="input"
            type="password"
          />
        </label>
        <a href="#" className="font--primary">
          I Forgot my password
        </a>
        <button
          className="btn btn--secondary
          font--primary"
          onClick={this.signIn}
        >
          Sign In
        </button>
        <input
          type="checkbox"
          onChange={this.onChange}
          id="rememberMe"
          name="rememberMe"
          checked={this.state.rememberMe}
        />
        <label htmlFor="rememberMe" className="font--primary">
          Keep me signed in
        </label>
      </div>
    );
  }
}

export default ManualSignIn;
