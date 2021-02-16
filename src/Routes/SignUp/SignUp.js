import { React, useContext } from "react";
import { useForm } from "react-hook-form";
import AuthApiService from "../../Services/auth-api-service";
import AuthContext from "../../Contexts/AuthContext";
import "./SignUp.css";

export default function SignUp(props) {
  const { register, handleSubmit, errors } = useForm();
  const context = useContext(AuthContext);

  const onSubmit = async (data) => {
    const { name, username, email, password } = data;
    const newUser = { name, username, email, password };
    try {
      const savedUser = await AuthApiService.createUser(newUser);
      // console.log(savedUser);
      context.login(savedUser.authToken);
      context.setCurrentUser(savedUser.user);
      // get preferences
      const preferences = await AuthApiService.getUserPreferences(
        savedUser.user.id,
        savedUser.authToken
      );
      delete savedUser.authToken;
      //set preferences in context
      context.setCurrentPreferences(preferences);
      props.history.push("/homepage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="sign-up" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label for="name">Name</label>
        <input
          placeholder="Name"
          type="text"
          name="name"
          id="name"
          ref={register({
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
            maxLength: {
              value: 35,
              message: "Name must be under 35 characters",
            },
          })}
        />
      </div>
      {errors.name && <p>{errors.name.message}</p>}

      <div>
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="doglover92"
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
      </div>
      {errors.username && <p>{errors.username.message}</p>}

      <div>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          ref={register({
            required: "Email is required",
            minLength: {
              value: 5,
              message: "Email must be at least 5 characters",
            },
            maxLength: {
              value: 50,
              message: "Email must be under 50 characters",
            },
          })}
        />
      </div>
      {errors.email && <p>{errors.email.message}</p>}

      <div>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          ref={register({
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
        />
      </div>
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
