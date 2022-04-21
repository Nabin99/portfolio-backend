import { model, Schema } from "mongoose";

const WorksModel = model(
  "Works",

  new Schema(
    {
      title: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
      },
      coverImage: {
        type: String,
      },
      projectDate: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
      },
      projectLink: {
        type: String,
        required: true,
      },
    },

    {
      timestamps: true,
    }
  )
);

export default WorksModel;
