const { Schema } = require("mongoose");
const shortId = require("./types/short-id");

const UserSchema = new Schema(
  {
    shortId,
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordReset: {
      type: Boolean,
      default: false,
    },
    // passwordReset 추가
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
