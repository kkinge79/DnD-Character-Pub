import { Character } from "../models/character.js"


function newCharacter(req, res) {
  res.render('characters/new', {
    title: "Create Character",
  })
}



export {
  newCharacter as new,
  
}