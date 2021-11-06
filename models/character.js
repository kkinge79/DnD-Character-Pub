import mongoose from 'mongoose'

const Schema = mongoose.Schema

const characterSchema = new Schema ({
  name: String,
  race: String,
  class: String,
  age: Number,
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
})

const Character = mongoose.model('Character', characterSchema)

export {
  Character
}