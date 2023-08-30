import { coursesModel } from "../../db/models/courses.model.js";

class CoursesMongo {
  async findAll() {
    try {
      const courses = await coursesModel.find({});
      return courses;
    } catch (error) {
      return error;
    }
  }

  async createOne(obj) {
    try {
      const courses = await coursesModel.create(obj);
      return courses;
    } catch (error) {
      return error;
    }
  }

  async findById(id) {
    try {
      const courses = await coursesModel
        .findById(id)
        .populate("students", ["first_name", "last_name"]); //el populate sirve para ver a mas detalles los usuarios, x ej el first_name
      //si queremos solo uno, osea first_name solo, se pondria asi .populate("students","first_name") de lo contrario entre corchetes
      return courses;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      const courses = await coursesModel.updateOne({ _id: id }, { ...obj });
      return courses;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await coursesModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const coursesMongo = new CoursesMongo();
