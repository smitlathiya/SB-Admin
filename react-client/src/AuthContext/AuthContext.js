import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import swal from "sweetalert";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [authData, setAuthData] = useState(false);
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [currentUserPost, setCurrentUserPost] = useState(null);
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    date_of_birth: "",
    phone_no: "",
    address: {
      city: "",
      state: "",
      country: "",
    },
    designation: "",
    website: "",
    contentType: "",
  });

  const login = (email, password, setRedirectToReferer) => {
    const cred = {
      email: email,
      password: password,
    };
    axios
      .post("/signin", cred)
      .then((res) => {
        authenticate(res.data, () => {
          setRedirectToReferer(true);
        });
      })
      .catch((e) => {
        swal("Error", e.response.data.error, "error");
        if (typeof window != "undefined") localStorage.removeItem("jwt");
      });
  };

  const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  };

  const signup = (fname, lname, email, username, password) => {
    const userData = {
      name: {
        first_name: fname,
        last_name: lname,
      },
      email: email,
      username: username,
      password: password,
      designation: "",
      date_of_birth: "",
      address: {
        city: "",
        state: "",
        country: "",
      },
      phoneNo: "",
      website: "",
      profile_image: {
        code: null,
        contentType: null,
      },
    };
    axios
      .post("/signup", userData)
      .then((res) => {
        swal("Registerd Successfully", "Please Login", "success");
      })
      .catch((e) => {
        swal("Error", e.response.data.error, "error");
      });
  };

  const editProfile = (data) =>{
    axios
    .put(`/user/${authData.id}`, data, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authData.token}`,
        email: authData.email,
      },
    })
    .then(() => {
      swal("Done", "Data has been updated", "success");
    })
    .catch((e) => {
      swal("faild", e.response.data.error, "error");
    });
  }

  const deleteUser = () =>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to Login with this Email",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
          if (willDelete) {
              axios.delete(`/user/${authData.id}`, {
                  headers: {
                      Accept: "application/json",
                      "content-type": "application/json",
                      Authorization: `Bearer ${authData.token}`
                  }
              })
              swal("You Account has beed Deleted", {
                  icon: "success",
                  buttons: true
              })
                  .then(() => {
                      setRedirectToReferer(true)
                  });
              localStorage.removeItem("jwt")
          }
      });
  }

  const addPost = (formData) => {
    axios
      .post(`/post/new/${authData.id}`, formData, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
      })
      .then((res) => {
        swal("Done", res.data.message, "success");
        return true
      })
      .catch(() => swal("Error", "something went wrong", "error"));
  }

  const editPost = (id, formData) =>{
    axios
      .put(`${process.env.REACT_APP_API_URL}/post/${id}`, formData, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
      })
      .then(() => swal("Done", "Updated Successfully", "success"))
      .catch(() => swal("fail", "Something went wrong", "error"));
  }

  const deletePost = (id) => {
    swal({
      title: "Are you sure?",
      text: "post will be deleted permenatly",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
      .then((willDelete) => {
          if (willDelete) {
              axios.delete(`/post/${id}`, {
                  headers: {
                      Accept: "application/json",
                      "content-type": "application/json",
                      Authorization: `Bearer ${authData.token}`
                  }
              })
                  .then(() => swal("Post Deleted Successfully ", {
                      icon: "success",
                      buttons: true
                  }))
                  .catch(() => swal("You're not Authorized", {
                      icon: "error",
                      buttons: true
                  }))
          }
      });
  }

  useEffect(() => {
    if(typeof window == 'undefined') {
      setAuthData(false);
    }
    if (localStorage.getItem("jwt")) {
      setAuthData({
        id: JSON.parse(localStorage.getItem("jwt")).user._id,
        email: JSON.parse(localStorage.getItem("jwt")).user.email,
        token: JSON.parse(localStorage.getItem("jwt")).token,
      });
    }
  }, []);

  //set Profile Data
  useEffect(() => {
    if(authData){
      axios.get(`/user/${authData.id}`, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        }
      })
      .then(res =>{
        const data = res.data
        setProfileData({
          id: data._id,
          firstName: data.name.first_name,
          lastName: data.name.last_name,
          email: data.email,
          username: data.username,
          designation: data.designation,
          address: {
            city: data.address.city,
            state: data.address.state,
            country: data.address.country,
          },
          website: data.website,
          phone_no: data.phone_no,
          date_of_birth: data.date_of_birth,
          contentType: data.profile_image.contentType
        });
      })
      .catch(() =>{
        setRedirectToReferer(true)
      })

      axios
      .get(`/post/by/${authData.id}`, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
      })
      .then((res) => {
        setCurrentUserPost(res.data);
      })
    }
  }, [authData]); 

  const value = {
    authData,
    login,
    signup,
    profileData,
    redirectToReferer,
    currentUserPost,
    deleteUser,
    deletePost,
    addPost,
    editPost,
    editProfile
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const currentUser = () => {
  if (typeof window == undefined) return false

  if (localStorage.getItem("jwt")) return true; 
  else return false
};

export default AuthProvider;
