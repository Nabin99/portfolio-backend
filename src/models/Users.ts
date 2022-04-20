import { model, Schema } from "mongoose";

const UserModel = model(
  "users",
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
        lowercase: true,
        unique: true,
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
    }
  )
);

export default UserModel;
