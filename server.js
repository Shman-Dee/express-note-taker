const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function writeNewNote(body, notesArray) {
  const note = body.note;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
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

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();

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
