import axios from "axios";

const KEY = process.env.REACT_APP_NAPSTER_API_KEY;
const NAPSTER_API = "https://napi-v2-2-cloud-run-b3gtd5nmxq-uw.a.run.app/v2.2";
const NAPSTER_IMAGE_URL = "https://api.napster.com/imageserver/v2";

const ALBUM_API = "http://localhost:4000/api/albums";
const USER_API = "http://localhost:4000/api/users";
const FOLLOW_API = "http://localhost:4000/api/follows";

const request = axios.create({
  withCredentials: true,
});

export const userFollowsAnotherUser = async (followed) => {
  const response = await request.post(`${FOLLOW_API}/${followed}`, followed);
  return response.data;
};

export const getFollowedUsers = async (follower) => {
  const response = await request.get(`${USER_API}/${follower}/followed`);
  return response.data;
};

export const getFollowerUsers = async (followed) => {
  const response = await request.get(`${USER_API}/${followed}/followers`);
  return response.data;
};

export const userLikesAlbum = async (albumId, album) => {
  const response = await request.post(`${ALBUM_API}/${albumId}/likes`, album);
  return response.data;
};

export const getLikesForUser = async (userId) => {
  const response = await request.get(`${USER_API}/${userId}/likes`);
  return response.data;
};

export const getLikesForAlbum = async (albumId) => {
  const response = await request.get(`${ALBUM_API}/${albumId}/likes`);
  return response.data;
};

export const fullTextSearch = async (text) => {
  const response = await axios.get(
    `${NAPSTER_API}/search/verbose?query=${text}&apikey=${KEY}`
  );
  return response.data;
};

export const getAlbumCover = (albumId) =>
  `${NAPSTER_IMAGE_URL}/albums/${albumId}
/images/300x300.jpg`;

export const getAlbumDetails = async (albumId) => {
  const response = await axios.get(
    `${NAPSTER_API}/albums/${albumId}?apikey=${KEY}`
  );
  return response.data;
};

export const getAlbumTracks = async (albumId) => {
  const response = await axios.get(
    `${NAPSTER_API}/albums/${albumId}/tracks?apikey=${KEY}`
  );
  return response.data;
};

export const albumTracks = async (trackId) => {
  const response = await axios.get(
    `${NAPSTER_API}/albums/${trackId}?apikey=${KEY}`
  );
  return response.data;
};
