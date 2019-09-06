/*
eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import React, { Component } from "react";
import getProperties from "fusion:properties";

/**
 * ManualSignUp class component renders 8 input fields (6 type text, 2 type checkbox) controlled by the @function onChange
 *  and a button that triggers the @function signIn
 *
 * @function signIn
 * checks if the firstName, email, password, firstSurname values are present
 * if true:
 * Calls the getProperties method imported from the fusion:properties namespace
 * getProperties returns the props stored inside the properties/index.json, which we deconstruct and assign to the apiOrigin constant
 * window.Identity.apiOrigin is set to the apiOrigin constant
 * calls the @async window.Identity.signUp
 * @param {identity:{ userName: string,credentials: string},
 * profile: { displayName: string, email: string, firstName: string, lastName: string} }
 * @returns {Promise} <APIErrorResponse | SignUpResponse>
 * in case of a APIErrorResponse maps over the response error codes and displays the appropriate message to the user via an alert
 * if false:
 * throws an alert to the user
 * @function onChange
 * @param event
 * checks for the name of the event and sets the appropriate state
 * */

class ManualSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      firstSurname: "",
      secondSurname: "",
      email: "",
      password: "",
      confirmPassword: "",
      imNotARobot: false,
      rememberMe: false
    };
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  signUp() {
    const {
      firstName,
      email,
      password,
      firstSurname,
      imNotARobot,
      rememberMe
    } = this.state;
    const identity = {
      userName: email,
      credentials: password
    };
    const profile = {
      displayName: email,
      email,
      firstName,
      lastName: firstSurname
    };
    /*
    In this case we reset the apiOrigin to a reacheable one
    The apiOrigin is saved in the 'index.json' file inside the 'properties' folder
    */
    const { apiOrigin } = getProperties();
    window.Identity.apiOrigin = apiOrigin;
    /*
    the following is based of the doc instruction of use of the arc-sub's Identity/sdk api calls
    signUp(identity: object, profile: Nullable<Partial<BaseUserProfile>>,
    doLogin?: undefined | false | true, rememberMe?: undefined | false | true):
    Promise<APIErrorResponse | SignUpResponse>
    more can be found at: https://s3.amazonaws.com/arc-learning-center-static/docs/api/arc-sdks/modules/sdk_identity.html#signup
    */

    if (firstName && email && password && firstSurname && imNotARobot) {
      window.Identity.signUp(identity, profile, undefined, rememberMe)
        .then(
          console.log
          /*
        REPLACE THE ABOVE CONSOLE STATEMENTS WITH THE APPROPRIATE LOGIC ONCE YOU START DEVELOPMENT
      */
        )
        .catch(res => {
          const errorCodes = res.code.split(",");
          const errorMessage = [];
          errorCodes.map(v => {
            switch (v) {
              case "300128":
                return errorMessage.push("First Name is required");
              case "300009":
                return errorMessage.push("Invalid email address");
              case "300093":
                return errorMessage.push("First Surname is required");
              case "300083":
                return errorMessage.push(
                  "password must be min 8 char, at least one uppercase letter, one lowercase letter, one number and one special character"
                );
              case "300081":
                return errorMessage.push("Invalid email address");
              case "300130":
                return errorMessage.push("First surname is required");
              default:
                return errorMessage.push("Sign Up Failed");
            }
          });
          console.log(res);
          /*
          REPLACE THE ABOVE CONSOLE STATEMENTS WITH THE APPROPRIATE LOGIC ONCE YOU START DEVELOPMENT
          */
          alert(errorMessage.join(", "));
        });
    } else {
      alert(
        "Please add the First Name, First Surname, Email, Password and confirm you are not a robot"
      );
    }
  }

  onChange(e) {
    if (e.target.name === "rememberMe" || e.target.name === "imNotARobot") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="font--primary">Sign Up</h1>
        <label className="font--primary">
          First Name
          <input
            onChange={this.onChange}
            value={this.state.firstName}
            name="firstName"
            className="input"
          />
        </label>
        <div className="container-secondary">
          <div className="container-tertiary">
            <label className="font--primary" htmlFor="firstSurname">
              First Surname
            </label>
            <input
              onChange={this.onChange}
              name="firstSurname"
              value={this.state.firstSurname}
              type="text"
              className="input input-secondary"
            />
          </div>
          <div className="container-tertiary">
            <label className="font--primary">Second Surname</label>
            <input
              onChange={this.onChange}
              name="secondSurname"
              className="input input-secondary"
              value={this.state.secondSurname}
              type="text"
            />
          </div>
        </div>
        <label className="font--primary">
          Email
          <input
            onChange={this.onChange}
            value={this.state.email}
            name="email"
            className="input"
            type="email"
          />
        </label>
        <label className="font--primary">
          Password
          <input
            onChange={this.onChange}
            value={this.state.password}
            name="password"
            className="input"
            type="password"
          />
        </label>
        <label className="font--primary">
          Confirm Password
          <input
            onChange={this.onChange}
            value={this.state.confirmPassword}
            name="confirmPassword"
            className="input"
            type="password"
          />
        </label>
        <div className="container-quaternary grid grid__col grid__col--lg-5 grid__col--md-12 grid__col--sm-12">
          <label htmlFor="imNotARobot" className="font--primary">
            I&apos;m not a robot
            <input
              type="checkbox"
              onChange={this.onChange}
              id="imNotARobot"
              name="imNotARobot"
              checked={this.state.imNotARobot}
            />
          </label>
          <img
            className="image-reCapcha"
            src="/pf/resources/images/arc-subs-on-fusion/reCapcha.png"
          />
        </div>
        <button
          className="btn btn--secondary font--primary"
          onClick={this.signUp}
        >
          Sign Up
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

export default ManualSignUp;
