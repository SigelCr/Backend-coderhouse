//coleccion
import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  students: [
    //es un arreglo de object ID de la coleccon users
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export const coursesModel = mongoose.model("Courses", coursesSchema);
