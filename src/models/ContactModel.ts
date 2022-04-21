import { model, Schema } from "mongoose";

const ContactModel = model(
  "Contact",

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
      },
      message: {
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

export default ContactModel;
