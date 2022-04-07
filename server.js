const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function writeNewNote(body, notesArray) {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info(`\nData written to ${destination}`);
    }
  });
}

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeNewNote(file, parsedData);
    }
  });
};

//ROUTES

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

const readFromFile = util.promisify(fs.readFile);

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error("Error adding note");
  }
});

app.listen(PORT, () => {
  console.log(`Love you Dad, on port ${PORT}`);
});
