import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from "../../AuthContext/AuthContext";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    designation: "",
    date_of_birth: "",
    address: {
      city: "",
      state: "",
      country: "",
    },
    phoneNo: "",
    website: "",
  });
  const {authData, editProfile} = useAuth()
  const formData = new FormData();

  useEffect(() => {
    if(authData){
      axios 
        .get(`/user/${authData.id}`, {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        })
        .then((res) => {
          const data = res.data;
  
          setUserData({
            name: {
              firstName: data.name.first_name,
              lastName: data.name.last_name,
            },
            email: data.email,
            designation: data.designation,
            date_of_birth: data.date_of_birth,
            address: {
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
            },
            phoneNo: data.phone_no,
            website: data.website,
          });
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [authData]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    formData.append("first_name", userData.name.firstName);
    formData.append("last_name", userData.name.lastName);
    formData.append("email", userData.email);
    formData.append("designation", userData.designation);
    formData.append("date_of_birth", userData.date_of_birth);
    formData.append("phone_no", userData.phoneNo);
    formData.append("website", userData.website);
    formData.append("city", userData.address.city);
    formData.append("state", userData.address.state);
    formData.append("country", userData.address.country);

    editProfile(formData)
  };

  return (
    <div className="container-fluid px-4">
      <div className="col-md-8">
        <div className="card mb-3">
          <div className="card-header">Edit Your Profile</div>
          <div className="card-body">
            <Form onSubmit={formSubmitHandler}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      value={userData.name.firstName || ''}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          name: {
                            ...userData.name,
                            firstName: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={userData.name.lastName || ''}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          name: {
                            ...userData.name,
                            lastName: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={userData.email || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Designation"
                  value={userData.designation || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      designation: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      value={userData.address.city || ''}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      value={userData.address.state || ''}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            state: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Country"
                      value={userData.address.country || ''}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            country: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={userData.date_of_birth || ''}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      date_of_birth: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Web Site</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Web Site"
                  value={userData.website || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      website: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  type="phone"
                  placeholder="Contact No."
                  value={userData.phoneNo || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      phoneNo: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Set Profile</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    formData.append("profile_image", e.target.files[0])
                  }
                  accept="image/jpeg,image/jpg"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {" "}
                Submit{" "}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
