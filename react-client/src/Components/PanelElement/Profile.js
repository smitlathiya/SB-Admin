import React from "react";
import "./Profile.css";
import { Link, Navigate } from "react-router-dom";
import DeleteUser from "../DeleteUser";
import UserImg from "../../assets/avatar.png";
import Postcard from "../Postcard";
import { useAuth } from "../../AuthContext/AuthContext";
const Profile = () => {

  const {profileData, redirectToReferer, currentUserPost} = useAuth();

  let redirect = null;

  if (redirectToReferer) {
    redirect = <Navigate to="/signin" />;
  }

  const photoUrl = profileData.contentType
    ? `${process.env.REACT_APP_API_URL}/user/photo/${profileData.id}`
    : UserImg;

  return (
    <div className="container-fluid px-4">
      {redirect}
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={photoUrl}
                      alt="Admin"
                      className="rounded-circle profile-img"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>
                        {profileData.firstName} {profileData.lastName}
                      </h4>
                      <p className="text-secondary">
                        {profileData.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-globe mr-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      Website
                    </h6>
                    <span className="text-secondary">
                      {profileData.website ? profileData.website : "N/A"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profileData.firstName} {profileData.lastName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profileData.email}
                    </div>
                  </div>

                  {profileData.phone_no ? (
                    <>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Mobile Number</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {profileData.phone_no}
                        </div>
                      </div>
                    </>
                  ) : null}
                  {profileData.address.city &&
                  profileData.address.state &&
                  profileData.address.country ? (
                    <>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Address</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {profileData.address.city},{" "}
                          {profileData.address.state},{" "}
                          {profileData.address.country}
                        </div>
                      </div>
                    </>
                  ) : null}
                  {profileData.date_of_birth ? (
                    <>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Birth Date</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          {profileData.date_of_birth}
                        </div>
                      </div>
                    </>
                  ) : null}
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <Link className="btn btn-primary" to="/profile/edit">
                        Edit
                      </Link>{" "}
                      <DeleteUser />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-header">Your Posts</div>
                <div className="card-body">
                  {currentUserPost ? (
                    currentUserPost.map((data) => {
                      return (
                        <Postcard
                          title={data.title}
                          body={data.body}
                          key={data._id}
                          username={data.postedBy.username}
                          photoUrl={
                            data.photo
                              ? `${process.env.REACT_APP_API_URL}/post/img/${data._id}`
                              : null
                          }
                          userId={data.postedBy._id}
                          firstName={data.postedBy.name.first_name}
                          lastName={data.postedBy.name.last_name}
                          designation={data.postedBy.designation}
                          menu={true}
                          postId={data._id}
                        />
                      );
                    })
                  ) : (
                    <div className="alert alert-dark" role="alert">
                      Post Not Found{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
