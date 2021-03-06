import { model, Schema } from "mongoose";

const UserModel = model(
  "User",

  new Schema(
    {
      name: {
        type: String,
        required: true,
        uppercase: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

      },
      contact: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,

        required: true,
      },
      role: {
        type: String,
        required: true,

      },
    },

    {
      timestamps: true,
      validateBeforeSave: true,
    }
  )
);

export default UserModel;
