"use client";
import axios from "axios";
import React, { useState } from "react";
// import Image from "next/image";

export default function GithubApp() {
  const [userName, setUserName] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [followerInfo, setFollowerInfo] = useState([]);
  let userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  let getData = async () => {
    let response = await axios.get(`https://api.github.com/users/${userName}`);
    // console.log(response);
    setUserInfo(response.data);
    setFollowerInfo([])
    setUserName('')
  };

  let seeFollowers = async () => {
    let response = await axios.get(userInfo.followers_url);
    setFollowerInfo(response.data);
    console.log(response.data);
  };

  return (
    <div className="mainApp">
      <h1 className="follo">GitHub App</h1>

      <input
        onChange={userNameHandler}
        type="text"
        value={userName}
        placeholder="enter User Name"
      />
      <button onClick={getData}>Find User</button>
      {/* Complete user Information */}
      <h2 className="follo">User Information</h2>
      <img src={userInfo.avatar_url} width={120} alt="" />
      <h1 className="follo">User Name is: {userInfo.login}</h1>
      <div className="follo">
        <h1 className="follo">Followers : {userInfo.followers}</h1>
        <button onClick={seeFollowers}>See Followers</button>
      </div>

      <h1 className="follo">User Bio</h1>
      <p className="follo">{userInfo.bio}</p>

      {/* User Followers List */}

      { followerInfo.length >=1 && <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>ID</th>
          <th>See Follower</th>
        </tr>

        {followerInfo.map((items, i) => {
          return (
            <tr key={i}>
              <td>
                <img src={items.avatar_url} width={50} alt="" />
              </td>
              <td>{items.login}</td>
              <td>{items.id}</td>
              <td>
                <button>See Followers</button>
              </td>
            </tr>
          );
        })}
      </table> }
    </div>
  );
}
