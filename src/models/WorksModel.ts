import { model, Schema } from "mongoose";

const WorksModel = model(
  "Works",

  new Schema(
    {
      title: {
        type: String,
        required: true,
        uppercase: true,
      },
      coverImage: {
        type: ImageData,
      },
      projectDate: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
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
