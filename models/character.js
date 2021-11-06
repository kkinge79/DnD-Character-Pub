import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  rated: {type: Number, min: 1, max: 5, default: 5}
}, {
  timestamps: true
})

const characterSchema = new Schema ({
  name: String,
  race: String,
  class: String,
  age: Number,
  comments: [commentSchema],
  owner: {type: Schema.Types.ObjectId, ref:"Profile"},
}, {
  timestamps: true
})

const Character = mongoose.model('Character', characterSchema)

export {
  Character
}