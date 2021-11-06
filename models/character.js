import mongoose from 'mongoose'

const Schema = mongoose.Schema

const characterSchema = new Schema ({
  name: String,
  race: String,
  class: String,
})

const Character = mongoose.model('Character', characterSchema)

export {
  Character
}