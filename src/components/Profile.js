import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Profile = () => {
  let userId = 0;
  const [loggedInUser, setLoggedInUser] = useState();
  const [picCount, setPicCount] = useState();
  
  useEffect(() => {
    axiosWithAuth()
      .get("/users/" + userId)
      .then(res => {
        setLoggedInUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axiosWithAuth()
      .get("/pics/for/" + userId)
      .then(res => {
        setPicCount(res.data.length);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId]);

  userId = parseInt(localStorage.getItem("USER_ID"));

  function handleSubmit(e) {
    e.preventDefault();
    axiosWithAuth()
      .put("/users/" + userId, loggedInUser)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleChange(e) {
    setLoggedInUser({
      ...loggedInUser,
      [e.target.name]: e.target.value
    });
  }

  return (
    !loggedInUser ? <div>Loading...</div> :
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="full_name">Name</label>
        <input type="text" value={loggedInUser.full_name} name="full_name" id="full_name" onChange={handleChange} />
        <label htmlFor="numPics">Image Count</label>
        <div id="numPics">{picCount}</div>
        <input type="submit" value="Save Changes" />
      </form>
    </div>
  );
}

export default Profile;