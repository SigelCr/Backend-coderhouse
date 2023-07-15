// IGNORAR

/* const fs = require(`fs`);

class ManagerUsuarios {
  constructor(path) {
    this.path = path;
  }

  async consultarUsuarios() {
    try {
      if (fs.existsSync(this.path)) {
        const infoArchivo = await fs.promises.readFile(this.path, `utf-8`);
        return JSON.parse(infoArchivo);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async crearUsuario(objUsuario) {
    try {
      const usuariosPrev = await this.consultarUsuarios(); //busca todos los usuarios, arroja un arreglo, vacio o con info

      let id;
      if (!usuariosPrev.length) {
        id = 1;
      } else {
        id = usuariosPrev[usuariosPrev.length - 1].id + 1;
      }

      usuariosPrev.push({ ...objUsuario, id }); //pusheamos
      await fs.promises.writeFile(this.path, JSON.stringify(usuariosPrev)); //sobreescribe la informacion
    } catch (error) {
      return error;
    }
  }
}

const usuario1 = {
  nombre: `juan`,
  apellido: `tevez`,
  edad: `165`,
  curso: `backend`,
};
const usuario2 = {
  nombre: `pedro`,
  apellido: `caca`,
  edad: `15`,
  curso: `front`,
};

async function prueba() {
  const manager = new ManagerUsuarios(`Usuarios.json`); //el archivo donde se guarden los usuarios
  await manager.crearUsuario(usuario1); //entre () el usuario creado
  const usuarios = await manager.consultarUsuarios();
  console.log(usuarios);
}

prueba(); */
