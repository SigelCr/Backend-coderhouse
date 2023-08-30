import { studentsModel } from "../../db/models/students.model.js";

class StudentsMongo {
  async aggregationMet() {
    try {
      const response = await studentsModel.aggregate([
        //que queres que busque stage x stage en este caso la calificaion mayor a 5
        //todos los stage se basan del primero
        { $match: { calificacion: { $gt: 5 } } },
        {
          $group: {
            _id: "$gender", //agrupo por id del genero
            gender_count: { $count: {} }, //conteo de cuantas personas con ese genero hay
            promedio_calificacion: { $avg: `$calificacion` },
          },
        },
        { $sort: { gender_count: -1 } }, // el -1 es de mayor a menor
        { $match: { gender_count: { $gte: 4 } } },
        //{ $count: "total_students_more_than_5" }, //cantidad totaol de los estudiando con calificacion a 5, con el motodo $count
      ]);

      return response;
    } catch (error) {
      return error;
    }
  }
}

export const studentsMongo = new StudentsMongo();
