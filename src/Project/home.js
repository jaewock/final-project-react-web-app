import * as client from "./Users/client";
import React, { useState, useEffect } from "react";
import Nav from "./nav";
import * as service from "./service";
import { Link } from "react-router-dom";

function Home() {
  const [account, setAccount] = useState(null);
  const [likes, setLikes] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likesFollowing, setLikesFollowing] = useState([]);
  const [followed, setFollowed] = useState([]);
  const [likesFollowed, setLikesFollowed] = useState([]);

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    if (account) {
      await fetchLikes(account._id);
      await fetchFollowing(account._id);
      await fetchFollowed(account._id);
    }
  };

  const fetchLikes = async (userId) => {
    const likes = await service.getLikesForUser(userId);
    setLikes(likes);
  };

  const fetchFollowing = async (userId) => {
    const following = await service.getFollowedUsers(userId);
    setFollowing(following);

    const followingLikes = [];
    for (const f of following) {
      const likes = await fetchLikesOfFollowing(f.followed._id);
      followingLikes.push({
        likes: likes,
      });
    }

    setLikesFollowing(followingLikes);
  };

  const fetchLikesOfFollowing = async (userId) => {
    return await service.getLikesForUser(userId);
  };

  const fetchFollowed = async (userId) => {
    const followed = await service.getFollowerUsers(userId);
    setFollowed(followed);

    const followedLikes = [];
    for (const f of followed) {
      const likes = await fetchLikesOfFollowed(f.follower._id);
      followedLikes.push({
        likes: likes,
      });
    }

    setLikesFollowed(followedLikes);
  };

  const fetchLikesOfFollowed = async (userId) => {
    return await service.getLikesForUser(userId);
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div>
      <Nav></Nav>
      <h1 className="display-3">Home</h1>
      <p>
        Welcome to Album Alliance, where you can "like" your favorite albums and
        see what albums other people are listening to!
      </p>

      <p>
        Create an account, search for albums to add to your collection, and
        follow other users to see what albums they have been enjoying lately!
      </p>

      <div className="following-liked">
        <h1 className="display-6">Liked Albums of People That I Follow</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <tbody>
              <tr>
                {likesFollowing.map((user) =>
                  user.likes.map((like) => (
                    <td key={like.album._id}>
                      <Link to={`/project/album-details/${like.albumId}`}>
                        <img
                          src={service.getAlbumCover(like.albumId)}
                          alt={like.album.name}
                        />
                        <p>{like.album.name}</p>
                      </Link>
                    </td>
                  ))
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="followed-liked">
        <h1 className="display-6">Liked Albums of People That Follow Me</h1>
        <div className="table-responsive">
          <table className="table table-striped">
            <tbody>
              <tr>
                {likesFollowed.map((user) =>
                  user.likes.map((like) => (
                    <td key={like.album._id}>
                      <Link to={`/project/album-details/${like.albumId}`}>
                        <img
                          src={service.getAlbumCover(like.albumId)}
                          alt={like.album.name}
                        />
                        <p>{like.album.name}</p>
                      </Link>
                    </td>
                  ))
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
