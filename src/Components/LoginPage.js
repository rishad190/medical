import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const LoginPage = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.email && data.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          newUserInfo.email = data.email;
          setUser(newUserInfo);
          history(from);

          // ...
        })
        .catch((error) => {
          console.log(error);
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;

          setUser(newUserInfo);
          console.log(error.message);
          alert(error.message);
        });
    }
  };
  return (
    <div className="container " id="login">
      <div className="row d-flex justify-content-center">
        <div className="col-6 ">
          <h2 className="text-uppercase text-center"> Log in</h2>
          <form id="login" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>
                Your Email<span className="req">*</span>{" "}
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                data-validation-required-message="Please enter your email address."
                autoComplete="off"
                {...register("email")}
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="form-group">
              <label>
                Password<span className="req">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                data-validation-required-message="Please enter your password"
                autoComplete="off"
                {...register("password")}
              />
              <p className="help-block text-danger"></p>
            </div>
            <div className="mrgn-30-top d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-larger btn-block bg-primary text-white"
              >
                Log in
              </button>
              <p>
                Create New Account <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
