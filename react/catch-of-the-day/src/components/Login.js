import React from "react";
import propTypes from "prop-types";

const Login = (props) => (
  <nav className="login">
    <p>Sign in to manage your store's inventory</p>
    <button className="github" onClick={() => props.authenticate("Github")}>
      Log in with Github
    </button>
    <button className="facebook" onClick={() => props.authenticate("Facebook")}>
      Log in with Facebook
    </button>
    <button className="twitter" onClick={() => props.authenticate("Twitter")}>
      Log in with Twitter
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: propTypes.func.isRequired,
};

export default Login;
