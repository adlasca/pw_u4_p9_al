<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <h1>Gestión de Estudiantes</h1>
        <div class="status-badge">Conectado al Servidor</div>
      </header>

      <div class="input-grid">
        <div class="input-group">
          <label>ID Estudiante</label>
          <input
            type="number"
            v-model="id"
            class="main-input highlight"
            placeholder="ID para buscar/borrar"
          />
        </div>
        <div class="input-group">
          <label>Fecha de Nacimiento</label>
          <input type="date" v-model="fechaNacimiento" class="main-input" />
        </div>
        <div class="input-group">
          <label>Nombre</label>
          <input
            type="text"
            v-model="nombre"
            class="main-input"
            placeholder="Nombre del estudiante"
          />
        </div>
        <div class="input-group">
          <label>Apellido</label>
          <input
            type="text"
            v-model="apellido"
            class="main-input"
            placeholder="Apellido del estudiante"
          />
        </div>
        <div class="input-group">
          <label>Provincia</label>
          <input
            type="text"
            v-model="provincia"
            class="main-input"
            placeholder="Ej: Pichincha"
          />
        </div>
        <div class="input-group">
          <label>Género</label>
          <select v-model="genero" class="main-input">
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>
      </div>

      <div class="actions-wrapper">
        <div class="actions-grid">
          <button @click="consultarTodo" class="btn btn-info">
            Listar Todo
          </button>
          <button @click="consultarPorId" class="btn btn-secondary">
            Buscar ID
          </button>
          <button @click="guardar" class="btn btn-success">Guardar</button>
          <button @click="actualizar" class="btn btn-primary">
            Actualizar
          </button>
          <button @click="actualizarParcial" class="btn btn-primary">
            Actualizar Parcial
          </button>
          <button @click="borrar" class="btn btn-danger">Eliminar</button>
        </div>
        <button @click="limpiarFormulario" class="btn btn-outline">
          Limpiar Formulario
        </button>
      </div>

      <div v-if="listaResultados.length > 0" class="table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th>Provincia</th>
              <th>Género</th>
              <th>Fecha Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in listaResultados" :key="item.id">
              <td>
                <strong>{{ item.id }}</strong>
              </td>
              <td>{{ item.nombre}} {{ item.apellido }}</td>
              <td>{{ item.provincia }}</td>
              <td>
                <span :class="['tag', item.genero]">{{ item.genero }}</span>
              </td>
              <td>{{ formatearFechaTabla(item.fechaNacimiento) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-state">
        <p>{{ resultadoMensaje || "No hay datos para mostrar" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  consultarTodosFachada,
  consultarPorIdFachada,
  guardarFachada,
  actualizarFachada,
  borrarFachada,
  actualizarPorIdFachada,
} from "@/clients/MatriculaClients.js";

export default {
  data() {
    return {
      id: null,
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      provincia: "",
      genero: "M",
      listaResultados: [],
      resultadoMensaje: "",
    };
  },
  methods: {
    prepararObjeto() {
      return {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento
          ? `${this.fechaNacimiento}T00:00:00`
          : null,
        provincia: this.provincia,
        genero: this.genero,
      };
    },

    limpiarFormulario() {
      this.id = null;
      this.nombre = "";
      this.apellido = "";
      this.fechaNacimiento = "";
      this.provincia = "";
      this.genero = "M";
      this.resultadoMensaje = "Formulario reseteado";
    },

    async consultarTodo() {
      try {
        const res = await consultarTodosFachada();
        this.listaResultados = Array.isArray(res) ? res : [res];
      } catch (e) {
        this.resultadoMensaje = "Error al conectar con el servidor.";
      }
    },
    async actualizarParcial() {
      if (!this.id) {
        alert("Debes ingresar el ID del estudiante que deseas actualizar");
        return;
      }

      // Preparamos los datos SIN el ID dentro del objeto,
      // ya que el ID suele ir como parámetro de ruta en la fachada
      const datosActualizados = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento
          ? `${this.fechaNacimiento}T00:00:00`
          : null,
        provincia: this.provincia,
        genero: this.genero,
      };

      try {
        // La fachada suele recibir: (id, objetoConDatos)
        await actualizarPorIdFachada(this.id, datosActualizados);
        this.resultadoMensaje = "¡Actualizado con éxito!";
        //this.consultarTodo(); // Refrescar la tabla
      } catch (error) {
        console.error("Error al actualizar:", error.response?.data);
        this.resultadoMensaje =
          "Error 400: No se pudo actualizar. Revisa la consola.";
      }
    },

    async consultarPorId() {
      if (!this.id) return alert("Por favor, ingrese un ID");
      const res = await consultarPorIdFachada(this.id);
      this.listaResultados = res ? [res] : [];
      if (!res) this.resultadoMensaje = "Estudiante no encontrado.";
    },

    async guardar() {
      try {
        await guardarFachada(this.prepararObjeto());
        this.resultadoMensaje = "Estudiante registrado con éxito.";
        this.consultarTodo();
      } catch (e) {
        this.resultadoMensaje = "Error 400: Datos inválidos.";
      }
    },

    async actualizar() {
      console.log("Iniciando actualización para ID:", this.id);

      if (!this.id) {
        alert(
          "Por favor, escribe el ID del estudiante para poder actualizarlo.",
        );
        return;
      }

      // Construcción manual del objeto para asegurar el formato
      const objetoActualizar = {
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento
          ? `${this.fechaNacimiento}T00:00:00`
          : null,
        provincia: this.provincia,
        genero: this.genero,
      };

      try {
        this.resultadoMensaje = "Enviando actualización...";

        // IMPORTANTE: Verifica que los parámetros coincidan con tu fachada (id, objeto)
        const response = await actualizarFachada(this.id, objetoActualizar);

        console.log("Respuesta del servidor:", response);
        this.resultadoMensaje = "¡Actualización exitosa!";

        // Refrescamos la lista para ver los cambios
        //await this.consultarTodo();
      } catch (error) {
        console.error("Error capturado:", error);
        this.resultadoMensaje =
          "Error: " + (error.response?.data?.message || "Servidor no responde");
        alert("Hubo un error al actualizar. Revisa la consola (F12)");
      }
    },

    async borrar() {
      if (!this.id) return alert("Ingrese el ID a eliminar");
      if (confirm("¿Está seguro de eliminar este registro?")) {
        await borrarFachada(this.id);
        this.consultarTodo();
      }
    },

    formatearFechaTabla(fecha) {
      if (!fecha) return "-";
      return fecha.split("T")[0];
    },
  },
};
</script>

<style scoped>
/* Estilos generales */
.container {
  padding: 40px 20px;
  background: #f0f4f8;
  min-height: 100vh;
  font-family: "Segoe UI", system-ui, sans-serif;
}
.card {
  background: white;
  max-width: 950px;
  margin: auto;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 25px;
  padding-bottom: 15px;
}
.card-header h1 {
  font-size: 1.5rem;
  color: #1a202c;
  margin: 0;
}
.status-badge {
  background: #e6fffa;
  color: #2c7a7b;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

/* Formulario */
.input-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 25px;
}
.input-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 6px;
}
.main-input {
  width: 100%;
  padding: 11px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;
}
.main-input:focus {
  border-color: #4299e1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}
.highlight {
  border-left: 4px solid #4299e1;
  background: #f7fafc;
}

/* Botones y Acciones */
.actions-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 35px;
}
.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
}
.btn {
  border: none;
  padding: 12px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: transform 0.1s;
}
.btn:active {
  transform: scale(0.98);
}
.btn-success {
  background: #38a169;
}
.btn-primary {
  background: #3182ce;
}
.btn-danger {
  background: #e53e3e;
}
.btn-info {
  background: #805ad5;
}
.btn-secondary {
  background: #718096;
}
.btn-outline {
  background: transparent;
  border: 1.5px solid #cbd5e0;
  color: #4a5568;
}
.btn-outline:hover {
  background: #f7fafc;
}

/* Tabla */
.table-container {
  border: 1px solid #edf2f7;
  border-radius: 12px;
  overflow: hidden;
}
.styled-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
.styled-table thead {
  background: #f8fafc;
}
.styled-table th {
  padding: 15px;
  text-align: left;
  font-size: 13px;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.styled-table td {
  padding: 15px;
  border-top: 1px solid #edf2f7;
  font-size: 14px;
  color: #2d3748;
}
.tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}
.M {
  background: #ebf8ff;
  color: #2b6cb0;
}
.F {
  background: #fff5f7;
  color: #9b2c2c;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #a0aec0;
  background: #f9fafb;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
}

@media (max-width: 600px) {
  .input-grid {
    grid-template-columns: 1fr;
  }
}
</style>
