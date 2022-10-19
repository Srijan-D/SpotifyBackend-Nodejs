const express = require("express");
const SpotifWebAPI = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
//for CORS policy
app.use(bodyParser.json());
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifWebAPI({
    redirectUri: "http://localhost:3000",
    clientId: "clientId",
    clientSecret: "clientSecret",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
    })
    .catch(() => {
      res.status(400);
    });
});
app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifWebAPI({
    redirectUri: "http://localhost:3000",
    clientId: "e8acbd5e26d4445681fb69ea7112c35c",
    clientSecret: "cabf3a9d6a4e4ba79d4b0bb1caa802c1",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

app.listen(3001);
