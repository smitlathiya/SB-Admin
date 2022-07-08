import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useAuth } from "../../AuthContext/AuthContext";
import Postcard from "../Postcard";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const {authData} = useAuth();

  useEffect(() => {
    if(authData){
      axios
        .get(`/posts`, {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
        })
        .then((res) => {
          setPosts(res.data.posts);
        });
    }
  }, [authData]);

  return (
    <main>
      <div className="container-fluid px-4">
        <div className="card-wrapper">
          {posts.map((data) => {
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
                menu={false}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
