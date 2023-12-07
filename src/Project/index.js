import { Routes, Route } from "react-router-dom";
import Home from "./home";
import NapsterSearch from "./search";
import AlbumDetails from "./album-details";
import Signin from "./Users/signin";
import Signup from "./Users/signup";
import Account from "./Users/account";
import UserTable from "./Users/table";

function Project() {
  return (
    <div className="container-fluid">
      <h1 class="display-1">Album Alliance</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup" element={<Account />} />
        <Route path="/search" element={<NapsterSearch />} />
        <Route path="/search/:searchTerm" element={<NapsterSearch />} />
        <Route path="/album-details/:albumId" element={<AlbumDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/admin/users" element={<UserTable />} />
      </Routes>
    </div>
  );
}
export default Project;
