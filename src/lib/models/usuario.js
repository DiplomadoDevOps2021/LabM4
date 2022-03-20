const pgp = require('./../db/pgp.js');
const db = require('./../db/connection.js');


class Usuario {

  constructor(data) {
    this.attributes = {};
    if (data) {
      this.loadData(data);
    }
  }

  loadData(data) {
    this.attributes.id = data.id;
    this.attributes.nombre = data.nombre;
    this.attributes.password = data.password;
    this.attributes.email = data.email;
    this.attributes.fnacimiento = data.fnacimiento;
    this.attributes.telefono = data.telefono;

    return this;
  }

  static create(nombre, email, passwd, fnacimiento, telefono) {
    const query = "INSERT INTO usuarios(nombre, email, passwd, fnacimiento, telefono) VALUES ($1, $2, $3, $4, $5)";
    const values = [
      nombre, email, passwd, fnacimiento, telefono
    ];

    return db
      .none(query, values)
      .then(() => {
        return true
      }).catch((e)=> {
        console.log(e)
        return null
      });
  }

  static read() {
    const query = `SELECT * FROM usuarios`;
    return db
      .any(query)
      .then((data) => {
        const usuarios = [];
        for (let o of data) {
          const usuario = new Usuario(o);
          usuarios.push(usuario);
        }
        return usuarios;
      }).catch((e) => {
        return null
      })
  }

  static update(id, nombre, email, passwd, fnacimiento) {
    const query = "UPDATE usuarios SET nombre = $2, email= $3, passwd = $4, fnacimiento =$5 WHERE id = $1";
    const values = [
      id, nombre, email, passwd, fnacimiento
    ];

    return db
      .none(query, values)
      .then((data) => {
        return true;
      }).catch((e) => {
        return null
      });
  }

  static delete(id) {
    const query = "DELETE FROM usuarios WHERE id=$1)";
    const values = [
      id
    ];

    return db
      .none(query, values)
      .then(() => {
        return true
      }).catch((e) => {
        return null
      });
  }


}

module.exports =  Usuario;
