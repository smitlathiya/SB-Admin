import React, { useRef } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import validator from "validator";
import { useAuth } from "../AuthContext/AuthContext";

const Registration = () => {
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confpassRef = useRef();
  const usernameRef = useRef();

  const { signup } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();

    const usernameChecker = (username) => {
      var usernameRegex = /^[a-zA-Z0-9._]+$/;
      return usernameRegex.test(username);
    };

    if (
      fnameRef.current.value &&
      emailRef.current.value &&
      passwordRef.current.value &&
      confpassRef.current.value
    ) {
      if (validator.isEmail(emailRef.current.value)) {
        if (usernameChecker(usernameRef.current.value)) {
          if (passwordRef.current.value === confpassRef.current.value) {
            signup(
              fnameRef.current.value,
              lnameRef.current.value,
              emailRef.current.value,
              usernameRef.current.value,
              passwordRef.current.value
            );

            fnameRef.current.value = "";
            lnameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confpassRef.current.value = "";
            usernameRef.current.value = "";
          } else {
            swal("Error", "Password Does not Match", "error");
          }
        } else {
          swal("Invalid Username", "use a-z, A-Z and 0-9", "error");
        }
      } else {
        swal("Error", "Invalid Email", "error");
      }
    } else {
      swal("Error", "Fill All the Require Field", "error");
    }
  };

  return (
    <div className="bg-primary">
      <div id="layoutAuthentication">
        <div
          id="layoutAuthentication_content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <main style={{ width: "100%" }}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Create Account
                      </h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={submitHandler}>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                placeholder="Enter your first name"
                                id="inputFirstName"
                                type="text"
                                ref={fnameRef}
                                required
                              />
                              <label htmlFor="inputFirstName">First name</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <input
                                className="form-control"
                                placeholder="Enter your last name"
                                id="inputLastName"
                                type="text"
                                ref={lnameRef}
                              />
                              <label htmlFor="inputLastName">Last name</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputEmail"
                            placeholder="name@example.com"
                            type="email"
                            ref={emailRef}
                            required
                          />
                          <label htmlFor="inputEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputUsername"
                            placeholder="name@example.com"
                            type="text"
                            ref={usernameRef}
                            required
                          />
                          <label htmlFor="inputUsername">Username</label>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="inputPassword"
                                type="password"
                                placeholder="Create a password"
                                ref={passwordRef}
                                required
                              />
                              <label htmlFor="inputPassword">Password</label>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <input
                                className="form-control"
                                id="inputPasswordConfirm"
                                type="password"
                                placeholder="Confirm password"
                                ref={confpassRef}
                                required
                              />
                              <label htmlFor="inputPasswordConfirm">
                                Confirm Password
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 mb-0">
                          <div className="d-grid">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                            >
                              Create Account
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        Have an account? Go to
                        <Link to="/signin">login</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Registration;
