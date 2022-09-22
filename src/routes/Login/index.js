import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const scopes = [
  "user-read-playback-state",
  "playlist-read-private",
  "user-read-email",
  "user-read-recently-played",
];

const responseType = "token";
const redirectUrl = "http://localhost:3000/";
const authEndpoint = "https://accounts.spotify.com/authorize";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });
  const loginUrl = `${authEndpoint}?client_id=${
    config.api.clientId
  }&response_type=${responseType}&redirect_uri=${redirectUrl}&scope=${scopes.join(
    "%20"
  )}`;
  return <a href={loginUrl}>Sign in with spotify!</a>;
};

export default Login;
