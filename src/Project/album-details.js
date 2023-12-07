import React from "react";
import { Link, useParams } from "react-router-dom";
import { getAlbumDetails } from "./service";
import { useState, useEffect } from "react";
import { getAlbumCover } from "./service";
import { getAlbumTracks } from "./service";
import { userLikesAlbum } from "./service";
import { getLikesForAlbum } from "./service";
import Nav from "./nav";

function AlbumDetails() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [likes, setLikes] = useState([]);

  const fetchLikes = async () => {
    const likes = await getLikesForAlbum(albumId);
    setLikes(likes);
  };

  const fetchAlbum = async () => {
    const response = await getAlbumDetails(albumId);
    setAlbum(response.albums[0]);
  };

  const fetchTracks = async () => {
    const response = await getAlbumTracks(albumId);
    setTracks(response.tracks);
  };

  useEffect(() => {
    fetchAlbum();
    fetchTracks();
    fetchLikes();
  });

  return (
    <div>
      <Nav></Nav>
      <h1 className="display-3">Album Details</h1>
      {album && (
        <>
          <button
            onClick={() =>
              userLikesAlbum(album.id, {
                name: album.name,
                albumId: album.id,
              })
            }
            className="btn btn-success w-50"
          >
            Like
          </button>
          <br></br>
          <br></br>

          <h1 className="display-6">Album Likes</h1>

          {likes && likes.length > 0 && (
            <div className="list-group">
              {likes.map((like) => (
                <div className="list-group-item" key={like.user._id}>
                  <Link to={`/project/account/${like.user._id}`}>
                    {like.user.username}
                  </Link>
                </div>
              ))}
            </div>
          )}

          <br></br>
          <img src={getAlbumCover(albumId)} alt={album.name} />

          <br></br>
          <br></br>
          <h1 className="display-6">
            {album.name} by {album.artistName}
          </h1>
          <br></br>

          <ul className="list-group">
            {tracks.map((track) => (
              <li key={track.id} className="list-group-item">
                {track.name}
                <audio controls>
                  <source src={track.previewURL} type="audio/mpeg" />
                </audio>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AlbumDetails;
