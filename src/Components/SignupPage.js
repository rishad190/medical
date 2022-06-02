import React from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase/compat/app";
import { db } from "../firebase.Config";
import "firebase/compat/auth";
import firebaseConfig from "../firebase.Config";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const history = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const onSubmit = (data) => {
    if (data.email && data.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((res) => {
          // Signed in
          // ...
          addDoc(collection(db, "user"), {
            email: data.email,
            password: data.password,
            firstName: data.first_name,
            last_name: data.last_name,
            tel: data.tel,
            address: data.address,
            age: data.age,
            weight: data.weight,
            room: data.room,
            RFID: data.RFID,
          });
          history(from);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <div className="container ">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-md-8 col-md-offset-2">
            <div id="userform">
              <div className="tab-content">
                <div className="" id="signup">
                  <h2 className="text-uppercase text-center"> Sign Up</h2>
                  <form id="signup" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                          <label className="text-white">
                            First Name<span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            required
                            data-validation-required-message="Please enter your name."
                            autoComplete="off"
                            {...register("first_name")}
                          />
                          <p className="help-block text-danger"></p>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                          <label className="text-white">
                            Last Name<span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            required
                            data-validation-required-message="Please enter your name."
                            autoComplete="off"
                            {...register("last_name")}
                          />
                          <p className="help-block text-danger"></p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="text-white">
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
                      <label className="text-white">
                        Your Phone<span className="req">*</span>{" "}
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        required
                        data-validation-required-message="Please enter your phone number."
                        autoComplete="off"
                        {...register("tel")}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label className="text-white">
                        Your Address<span className="req">*</span>{" "}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        required
                        data-validation-required-message="Please enter your phone number."
                        autoComplete="off"
                        {...register("address")}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label className="text-white">
                        Age<span className="req">*</span>{" "}
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="age"
                        name="age"
                        required
                        data-validation-required-message="Please enter your phone number."
                        autoComplete="off"
                        {...register("age")}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label className="text-white">
                        Weight<span className="req">*</span>{" "}
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="weight"
                        name="weight"
                        required
                        data-validation-required-message="Please enter your phone number."
                        autoComplete="off"
                        {...register("weight")}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label className="text-white">
                        Room No<span className="req">*</span>{" "}
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="room"
                        name="room"
                        required
                        data-validation-required-message="Please enter your phone number."
                        autoComplete="off"
                        {...register("room")}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label className="text-white">
                        RFID Number<span className="req">*</span>{" "}
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="rfid"
                        name="rfid"
                        required
                        data-validation-required-message="Please enter your phone number."
                        autoComplete="off"
                        {...register("RFID")}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="form-group">
                      <label className="text-white">
                        Password<span className="req">*</span>{" "}
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
                    <div className="mrgn-30-top">
                      <button
                        type="submit"
                        id="submit"
                        name="submit"
                        className="btn btn-larger btn-block bg-warning"
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
