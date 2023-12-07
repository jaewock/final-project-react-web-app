import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Nav from "../nav";
import * as service from "../service.js";

function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [otherAccount, setOtherAccount] = useState(null);
  const [likes, setLikes] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  const fetchFollowed = async (follower) => {
    const followed = await service.getFollowedUsers(follower);
    setFollowed(followed);
  };

  const fetchFollowers = async (followed) => {
    const followers = await service.getFollowerUsers(followed);
    setFollowers(followers);
  };

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setOtherAccount(user);
    setAccount(null);
    if (user) {
      await fetchLikes(user._id);
      await fetchFollowed(user._id);
      await fetchFollowers(user._id);
    }
  };
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    setOtherAccount(null);
    if (account) {
      await fetchLikes(account._id);
      await fetchFollowed(account._id);
      await fetchFollowers(account._id);
    }
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
  };

  const fetchLikes = async (userId) => {
    const likes = await service.getLikesForUser(userId);
    setLikes(likes);
  };

  const followUser = async () => {
    const follow = await service.userFollowsAnotherUser(id);
  };

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, [id, followers]);
  return (
    <div className="w-100">
      <Nav></Nav>
      <h1 class="display-3">Account Profile</h1>
      <h1 class="display-6">
        Username:{" "}
        {(account && account.username) ||
          (otherAccount && otherAccount.username)}
      </h1>
      <h1 class="display-6">
        Name:{" "}
        {(account && account.firstName + " " + account.lastName) ||
          (otherAccount &&
            otherAccount.firstName + " " + otherAccount.lastName)}
      </h1>
      {otherAccount != null && (
        <button className="btn btn-primary w-25" onClick={followUser}>
          {" "}
          Follow{" "}
        </button>
      )}

      <br></br>

      <div className="w-100">
        <h1 class="display-6">Following:</h1>

        {/* <pre> {JSON.stringify(followed, null, 2)}</pre> */}
        <div className="list-group">
          {followed.map((follow) => (
            <div className="list-group-item" key={follow.followed._id}>
              <Link to={`/project/account/${follow.followed._id}`}>
                {follow.followed.username}
              </Link>
            </div>
          ))}
        </div>

        <br></br>
      </div>

      <br></br>

      <div className="w-100">
        <h1 class="display-6">Followed By:</h1>

        {/* <pre> {JSON.stringify(followers, null, 2)}</pre> */}
        <div className="list-group">
          {followers.map((follow) => (
            <div className="list-group-item" key={follow.follower._id}>
              <Link to={`/project/account/${follow.follower._id}`}>
                {follow.follower.username}
              </Link>
            </div>
          ))}
        </div>

        <br></br>
      </div>

      <br></br>

      <div className="w-100">
        <h1 class="display-6">Liked Albums:</h1>

        <div className="table-responsive">
          <table className="table table-striped">
            <tbody>
              <tr>
                {likes.map((like) => (
                  <td key={like.albumId}>
                    <Link to={`/project/album-details/${like.albumId}`}>
                      <img
                        src={service.getAlbumCover(like.albumId)}
                        alt={like.album.name}
                      />

                      <p>{like.album.name}</p>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <br></br>
      </div>

      {account && !otherAccount && (
        <div className="w-100">
          <button className="btn btn-danger w-50" onClick={signout}>
            Signout
          </button>
        </div>
      )}
      <Link to="/project/admin/users" className="btn btn-warning w-50">
        Users
      </Link>
      <br></br>
    </div>
  );
}
export default Account;
