const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const albumsData = [
  {
    albumId: "9",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Rock",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
  },
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade2",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0"
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0"
  }
];

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/albums/:albumId", function(req, res) {
  //console.log(req.params.albumId);
  const album = albumsData.find(function(album) {
    return album.albumId === req.params.albumId;
  });

  res.send(album);
});

app.get("/albums", function(req, res) {
  if (req.query.genre) {
    const albums = albumsData.filter(function(album) {
      return (
        album.primaryGenreName.toLowerCase() === req.query.genre.toLowerCase()
      );
    });
    //console.log(req.query.genre);
    res.send(albums);
  } else {
    res.send(albumsData);
  }
});

app.post("/albums", function(req, res) {
  albumsData.push(req.body);
  console.log(albumsData);
  res.send(200);
});

app.delete("/albums/:albumId", function(req, res) {
  const albumId = req.params.albumId;
  const albumIndex = albumsData.findIndex(function(album) {
    return album.albumId === albumId;
  });

  albumsData.splice(albumIndex, 1);
  res.send();
});

app.put("/albums/:albumId", function(req, res) {
  const albumId = req.params.albumId;
  const albumIndex = albumsData.findIndex(function(album) {
    return album.albumId === albumId;
  });

  const newAlbum = req.body;

  albumsData[albumIndex] = newAlbum;
  res.send(newAlbum);
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
