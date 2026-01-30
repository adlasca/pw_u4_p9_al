<template>
  <div class="botones">
    <h1>Funciones</h1>
    <button @click="actualizar()">Actualizar</button>
    <button @click="actualizarParcial()">Actualizar Parcial</button>
    <button @click="borrar()">Borrar</button>
    <button @click="guardar()">Guardar</button>
    <input type="text" v-model="id" placeholder="ID Estudiante" />
    <button @click="consultarPorId()">Consultar Por ID</button>
    <button @click="consultarTodo()">Consultar Todo</button>

    <!-- Mostrar resultados -->
    <h2>Resultado:</h2>
    <pre>{{ resultado }}</pre>
  </div>
</template>

<script>
import {
  consultarTodosFachada,
  consultarPorIdFachada,
  guardarFachada,
  actualizarFachada,
  actualizarPorIdFachada,
  borrarFachada,
} from "@/clients/MatriculaClients.js";

export default {
  data() {
    return {
      id: null,
      nombre: "",
      apellido: "",
      fechaNacimiento: null,
      provincia: "",
      genero: "",
      resultado: null, 
    };
  },
  methods: {
    async actualizar() {
      this.resultado = await actualizarFachada(this.id, {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento,
        provincia: this.provincia,
        genero: this.genero,
      });
    },
    async actualizarParcial() {
      this.resultado = await actualizarPorIdFachada(this.id, {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento,
        provincia: this.provincia,
        genero: this.genero,
      });
    },
    async borrar() {
      this.resultado = await borrarFachada(this.id);
    },
    async guardar() {
      this.resultado = await guardarFachada({
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento,
        provincia: this.provincia,
        genero: this.genero,
      });
    },
    async consultarPorId() {
      this.resultado = await consultarPorIdFachada(this.id);
    },
    async consultarTodo() {
      this.resultado = await consultarTodosFachada();
    },
  },
};
</script>

<style></style>
