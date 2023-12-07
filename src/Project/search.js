import { fullTextSearch, getAlbumCover } from "./service";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";

function NapsterSearch() {
  const { searchTerm } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [albums, setAlbums] = useState([]);

  const search = async (searchTerm) => {
    const searchTermOrQuery = searchTerm || query;
    const response = await fullTextSearch(searchTermOrQuery);
    setResults(response);
    if (response && response.search && response.search.data) {
      setAlbums(response.search.data.albums);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setQuery(searchTerm);
      search(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div>
      <Nav></Nav>
      <h1 class="display-3">Search</h1>
      <input
        type="text"
        value={query}
        className="form-control w-75"
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="btn btn-primary w-25"
        onClick={() => navigate(`/project/search/${query}`)}
      >
        Search
      </button>

      <br />
      <br />
      <br />

      {results &&
        results.search &&
        results.search.data &&
        results.search.data.albums &&
        results.search.data.albums.length > 0 && (
          <h1 class="display-6">Albums</h1>
        )}
      <div className="table-responsive">
        <table className="table table-striped">
          <tbody>
            <tr>
              {results &&
                results.search &&
                results.search.data &&
                results.search.data.albums &&
                results.search.data.albums.length > 0 &&
                albums.map((album) => (
                  <td key={album.id}>
                    <Link to={`/project/album-details/${album.id}`}>
                      <img src={getAlbumCover(album.id)} alt={album.name} />
                      <p>{album.name}</p>
                    </Link>
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NapsterSearch;
