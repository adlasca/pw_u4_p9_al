import axios from "axios";
import {login} from "./AuthUser";

const TOKEN= await login();
const URL = "http://localhost:8081/matricula/api/v1.0/estudiantes";

const consultarTodos = async() => {
  const data = axios
    .get(URL, {headers:{Authorization:`Bearer ${TOKEN}`}})
    .then((r) => r.data);
  return data;
};

const consultarPorId = async(id) => {
  const data = axios
    .get(`${URL}/${id}`, {headers:{Authorization:`Bearer ${TOKEN}`}})
    .then((r) => r.data);
  return data;
};

const guardar = async(body) => {
  /*const objeto = {
    nombre: "Goku",
    apellido: "Son",
  }*/
  const data = axios
    .post(URL, body, {headers:{Authorization:`Bearer ${TOKEN}`}})
    .then((r) => r.data);
  return data;
};

const actualizar = async(id, body) => {
  const data = axios
    .put(`${URL}/${id}`, body, {headers:{Authorization:`Bearer ${TOKEN}`}})
    .then((r) => r.data);
  return data;
};

const actualizarPorId = async(id, body) => {
  const data = axios
    .patch(`${URL}/${id}`, body, {headers:{Authorization:`Bearer ${TOKEN}`}})
    .then((r) => r.data);
  return data;
};

const borrar = async(id) => {
  axios
    .delete(`${URL}/${id}`, {headers:{Authorization:`Bearer ${TOKEN}`}})
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

