const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "agent"],
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("password change");
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.CheckPassword = async function (userPassword) {
  const ismatch = await bcrypt.compare(userPassword, this.password);
  return ismatch;
};

// generating the jwt token
UserSchema.methods.CreateJWT = function ({ expires, id = null }) {
  return jwt.sign(
    { userId: this._id, role: this.role, hash: id },
    process.env.JWT_SECRET,
    {
      expiresIn: expires,
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
