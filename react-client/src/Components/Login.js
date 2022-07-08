import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import swal from "sweetalert";
import { useAuth } from "../AuthContext/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const { login } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();

    if (emailRef.current.value && passwordRef.current.value) {
      login(
        emailRef.current.value,
        passwordRef.current.value,
        setRedirectToReferer
      );
    } else {
      swal("Error", "Fill All the Require Field", "error");
    }
  };
  let redirect = null;

  if (redirectToReferer) {
    redirect = <Navigate to="/dashboard" />;
  }

  return (
    <div className="bg-primary">
      {redirect}
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
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Login
                      </h3>
                    </div>
                    <div className="card-body">
                      <form onSubmit={submitHandler}>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputEmail"
                            type="email"
                            placeholder="name@example.com"
                            ref={emailRef}
                            required
                          />
                          <label htmlFor="inputEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            className="form-control"
                            id="inputPassword"
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            required
                          />
                          <label htmlFor="inputPassword">Password</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="#">
                            Forgot Password?
                          </a>
                          <button className="btn btn-primary" type="submit">
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                      <div className="small">
                        <Link to="/signup">Need an account? Sign up!</Link>
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

export default Login;
