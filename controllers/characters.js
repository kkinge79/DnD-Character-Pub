import { Character } from "../models/character.js"
import { Profile } from "../models/profile.js"


function newCharacter(req, res) {
  res.render('characters/new', {
    title: "Create Character",
    owner: req.user.profile._id,
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

function create(req, res){
  req.body.owner = req.user.profile._id
  Character.create(req.body)
  .then(Char => {
    console.log("!!!!", req.body)
    Profile.updateOne({_id:Char.owner}, {
      $push:{characters: Char}
    })
    res.redirect("/characters")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/characters")
  })
}

function index(req, res) {
  Character.find({owner: req.user.profile._id})
  .then(characters => {
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
  .populate("owner")
  .populate("comments.owner")
  .then(characters => {
    let total = 0
    characters.comments.forEach(function(comment) {
      total += comment.rated
    })
    let averageCommentScore = ( total / characters.comments.length).toFixed(1)
    console.log(characters)
    res.render("characters/show", {
      characters,
      title: "Details",
      averageCommentScore,
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
  Character.findById(req.params.id)
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

function update(req, res) {
  Character.findById(req.params.id)
  .then(character => {
      if (character.owner.equals(req.user.profile._id)) {
      character.updateOne(req.body, {new: true})
      .then(() => {
        res.redirect(`/characters/${character._id}`)
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

function createComment(req, res) {
  req.body.owner = req.user.profile._id
  Character.findById(req.params.id)
  .then(character => {
    character.comments.push(req.body)
    character.save()
    res.redirect(`/characters/${character._id}`)
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
  update,
  createComment,

}