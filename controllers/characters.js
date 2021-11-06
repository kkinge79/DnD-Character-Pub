import { Character } from "../models/character.js"


function newCharacter(req, res) {
  res.render('characters/new', {
    title: "Create Character",
  })
}

function create(req, res){
  Character.create(req.body)
  .then(Char => {
    res.redirect("/characters")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

function index(req, res) {
  Character.find({})
  // When we have all the tacos
  .then(characters => {
    // Do something with the tacos
    res.render("characters/index", {
      title: "Profile",
      characters,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

function show(req, res) {
  Character.findById(req.params.id)
  .then(character => {
    res.render("characters/show", {
      character,
      title: "Details"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

export {
  newCharacter as new,
  create,
  index,
  show,
}