const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));

app .use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Love you Dad, on port ${PORT}`)
});