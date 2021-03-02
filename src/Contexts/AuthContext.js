import React, { Component } from "react";
import AuthApiService from "../Services/auth-api-service";
import TokenService from "../Services/TokenService";

const AuthContext = React.createContext({
  logout: () => {},
  login: () => {},
  setCurrentUser: () => {},
  setCurrentPreferences: () => {},
  clearError: () => {},
  hasAuth: false,
  currentUser: null,
  userPreferences: null,
  error: null,
});
export default AuthContext;

export class AuthProvider extends Component {
  state = {
    hasAuth: TokenService.hasAuthToken(),
    currentUser: null,
    userPreferences: null,
    error: null,
    mounted: false,
  };

  async componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    if (TokenService.hasAuthToken()) {
      try {
        const res = await AuthApiService.getCurrentUser();
        this.setState({
          currentUser: res.user,
          userPreferences: res.preferences,
          mounted: true,
        });
      } catch (err) {
        this.setState({ error: err.message });
      }
    } else {
      this.setState({ mounted: true });
    }
    console.log(this.state.userPreferences);
  };

  login = (token) => {
    TokenService.saveAuthToken(token);
  };

  logout = () => {
    TokenService.clearAuthToken();
    this.setState({ hasAuth: false, currentUser: null, userPreferences: null });
  };

  setCurrentUser = (user) => {
    this.setState({ currentUser: user });
  };

  setCurrentPreferences = (preferences) => {
    this.setState({ userPreferences: preferences });
  };

  render() {
    // fetch current user before render
    if (this.state.mounted === false) {
      return <></>;
    } else {
      return (
        <AuthContext.Provider
          value={{
            ...this.state,
            login: this.login,
            logout: this.logout,
            setCurrentUser: this.setCurrentUser,
            setCurrentPreferences: this.setCurrentPreferences,
            clearError: this.clearError,
          }}
        >
          {this.props.children}
        </AuthContext.Provider>
      );
    }
  }
}
