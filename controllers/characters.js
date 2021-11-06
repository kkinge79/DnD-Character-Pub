import { Character } from "../models/character.js"


function newCharacter(req, res) {
  res.render('characters/new', {
    title: "Create Character",
  })
}

function create(req, res){
  Character.create(req.body)
  .then(Char => {
    res.redirect("/")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  newCharacter as new,
  create,
}