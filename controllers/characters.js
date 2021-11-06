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
  .then(characters => {
    res.render("characters/show", {
      characters,
      title: "Details"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

function deleteCharacter(req, res) {
  Character.findByIdAndDelete(req.params.id)
  .then(character => {
    if(character.owner.equals(req.user.profile._id)) {
      character.delete()
      .then(() => {
        res.redirect("/characters")
      })
    } else {
      throw new Error ("Unauthorized user")
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

function edit(req, res) {
  Character.findByIdAndUpdate(req.params.id)
  .then(character => {
    res.render("characters/edit", {
      title: "Edit character",
      character,
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
  deleteCharacter as delete,
  edit,
  
}