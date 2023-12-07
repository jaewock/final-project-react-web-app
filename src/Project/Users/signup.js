import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../nav";
import * as client from "./client";
function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/project/account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <Nav></Nav>
      <h1 class="display-3">Sign Up</h1>
      {error && <div>{error}</div>}
      <h1 class="display-6">Username</h1>
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            username: e.target.value,
          })
        }
      />
      <h1 class="display-6">Password</h1>
      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
      />
      <br></br>
      <br></br>
      <button className="btn btn-primary w-25" onClick={signup}>
        Signup
      </button>
    </div>
  );
}
export default Signup;
