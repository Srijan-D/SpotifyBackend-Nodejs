import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "e8acbd5e26d4445681fb69ea7112c35c",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setResults([]);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      console.log(res);
    });
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        value={search}
        placeholder="Artists,songs,etc..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my2" style={{ overflowY: "auto" }}>
        Songs
      </div>
      <div className="">Bottom</div>
    </Container>
  );
}
