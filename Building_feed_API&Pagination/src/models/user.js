const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    firstName: {
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
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email address is not valid" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error ("Please enter a strong password:" + value)
        }
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum : {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`
      }
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL:" + value);
        }
      },
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
  },
  {
    timestamps: true,
  }
);

userSchema.index({firstName: 1, lastName: 1})
// userSchema.index({gender: 1})


userSchema.methods.getJWT = async function() {
  const user = this
  const token = await jwt.sign({_id: user._id}, "DEV@TINDER$619", {
    expiresIn: "1d"
  })
  return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this
  passwordHash = user.password
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid 
}

// const User = mongoose.model("User", userSchema);
// module.exports = User;  or
 module.exports = mongoose.model("User", userSchema)
