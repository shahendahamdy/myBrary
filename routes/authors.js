const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//let locals = { errorMessage: `something went wrong` };
//all authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find({ searchOptions });
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
  //res.render("authors/index");
});

//new auther route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create author route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "ERROR creating authoor .....",
    });
  }
  /*
  author.save((err, newAuthor) => {
    if (err) {
      res.render("authors/new", {
        author: author,
        errorMessage: "ERROR creating authoor .....",
      });
    } else {
      res.redirect("authors");
    }
  });*/
  //res.send(req.body.name);
});
module.exports = router;
