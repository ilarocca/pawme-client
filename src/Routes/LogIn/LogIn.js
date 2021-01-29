import React from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";

class LogIn extends React.Component {
  state = {
    error: null,
    username: "",
    password: "",
    loading: false,
  };

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   this.setState({ error: null, loading: true });
  //   try {
  //     const { username, password } = this.state;
  //     const response = await AuthApiService.login(username, password);
  //     // save authToken to local storage
  //     this.context.login(response.authToken);
  //     delete response.authToken;
  //     // save user info to context
  //     this.context.setCurrentUser(response.user);
  //     this.setState({ loading: false });
  //     // set next route on submit
  //     this.props.history.push(`/profile/${username}`);
  //   } catch (err) {
  //     this.setState({ error: err.message, loading: false });
  //   }
  // };

  // componentWillUnmount() {
  //   this.setState({ error: null });
  // }
  // handleChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  render() {
    return (
      <div className="login">
        <div className="login-text">
          <form className="login-form" action="#">
            <div className="error-msg">{this.state.error}</div>
            <div>
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="input"
                // value={this.state.username}
                // onChange={this.handleChange}
              />
            </div>
            <div>
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="input"
                // value={this.state.password}
                // onChange={this.handleChange}
              />
            </div>
            <Link to="/homepage">
              <button type="submit" className="login-submit">
                Log In
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
