import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../nav";
function Signin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/project/account");
  };
  return (
    <div>
      <Nav></Nav>
      <h1 class="display-3">Sign In</h1>
      <h1 class="display-6">Username</h1>
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <h1 class="display-6">Password</h1>
      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <br></br>
      <br></br>
      <button className="btn btn-primary w-25" onClick={signin}>
        Sign In
      </button>
    </div>
  );
}
export default Signin;
