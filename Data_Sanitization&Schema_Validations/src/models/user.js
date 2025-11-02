const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName : {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
     minLength: 4,
     maxLength: 50,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  }, 
  gender: {
    type: String,
    validate (value){
      if(!["male", "female", "others"].includes(value)){
        throw new Error("Gender data is not valid")
      }
    }
  },
  photoUrl : {
    type: String,
    default: "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
  },
  about: {
    type: String,
    default: "This is a default about of the user!",
     minLength: 10,
     maxLength: 100,
  },
  skills: {
    type: [String],
  },
}, {
  timestamps: true
})

const User = mongoose.model("User",userSchema)

module.exports = User
// or module.exports = mongoose.model("User", userSchema)