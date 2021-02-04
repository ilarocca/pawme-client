import { React, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./LogIn.css";
import AuthApiService from "../../Services/auth-api-service";
import AuthContext from "../../Contexts/AuthContext";

function LogIn(props) {
  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();
  const context = useContext(AuthContext);

  const onSubmit = async (data) => {
    setError((error) => (error = ""));

    try {
      const { username, password } = data;
      //login user
      const response = await AuthApiService.login(username, password);
      console.log(response);
      context.login(response.authToken);
      //set user in context
      context.setCurrentUser(response.user);
      // get preferences
      const preferences = await AuthApiService.getUserPreferences(
        response.user.id,
        response.authToken
      );
      delete response.authToken;
      //set preferences in context
      context.setCurrentPreferences(preferences);
      props.history.push("/homepage");
    } catch (err) {
      console.log(err);
      setError((error) => (error = err.message));
    }
  };

  return (
    <div className="login">
      <div className="login-text">
        <form
          className="login-form"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label for="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="input"
              ref={register({
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
                maxLength: {
                  value: 25,
                  message: "Username must be under 25 characters",
                },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              ref={register({
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit" className="login-submit">
            Log In
          </button>
          <div>{error}</div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
