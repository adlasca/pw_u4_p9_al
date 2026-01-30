/* eslint-disable prettier/prettier */
import axios from "axios";

const consultarTodos = async() => {
  const data = axios
    .get("http://localhost:8081/matricula/api/v1.0/estudiantes")
    .then((r) => r.data);

    console.log(data);
  return data;
};

const consultarPorId = async(id) => {
  const data = axios
    .get(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`)
    .then((r) => r.data);
  return data;
};

const guardar = async(body) => {
  /*const objeto = {
    nombre: "Goku",
    apellido: "Son",
  }*/

  const data = axios
    .post(`http://localhost:8081/matricula/api/v1.0/estudiantes`, body)
    .then((r) => r.data);
  return data;
};

const actualizar = async(id, body) => {
  const data = axios
    .put(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body)
    .then((r) => r.data);
  return data;
};

const actualizarPorId = async(id, body) => {
  const data = axios
    .patch(`http://localhost:8081/matricula/api/v1.0/estudiantes/${id}`, body)
    .then((r) => r.data);
  return data;
};

const borrar = async(id) => {
  axios
    .delete(`localhost:8081/matricula/api/v1.0/estudiantes/${id}`)
    .then((r) => r.data);
}

export const consultarTodosFachada = async() => {
  return await consultarTodos();
};

export const consultarPorIdFachada = async(id) => {
  return await consultarPorId(id);
};

export const guardarFachada = async(body) => {
  return await guardar(body);
};

export const actualizarFachada = async(id, body) => {
  return await actualizar(id,body);
};

export const actualizarPorIdFachada = async(id, body) => {
  return await actualizarPorId(id,body);
};

export const borrarFachada = async(id) => {
  await borrar(id);
}

