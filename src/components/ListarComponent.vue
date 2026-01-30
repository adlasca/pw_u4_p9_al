<template>
  <div class="card fade-in">
    <div class="table-header">
      <div class="header-info">
        <h3 class="title">Registros del Sistema</h3>
      </div>
      <button @click="consultar" class="btn btn-info shadow-sm" :disabled="loading">
        <span v-if="!loading">Actualizar Lista</span>
        <span v-else class="loader"></span>
      </button>
    </div>

    <div v-if="lista.length > 0" class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Ubicación</th>
            <th>Género</th>
            <th>Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lista" :key="item.id" class="table-row">
            <td>{{ item.id }}</td>
            <td>
              <strong>{{ item.nombre }} {{ item.apellido }}</strong>
            </td>
            <td>
              {{ item.provincia }}
            </td>
            <td>
              {{ item.genero }}
            </td>
            <td class="date-cell">{{ formatearFecha(item.fechaNacimiento) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-state">
      <h4>No hay datos disponibles</h4>
      <p>Presione el botón de actualizar o registre un nuevo estudiante.</p>
    </div>
  </div>
</template>

<script>
import { consultarTodosFachada } from "@/clients/MatriculaClients.js";

export default {
  data: () => ({
    lista: [],
    loading: false
  }),
  methods: {
    async consultar() {
      this.loading = true;
      try {
        const res = await consultarTodosFachada();
        this.lista = Array.isArray(res) ? res : [res];
      } catch (e) {
        console.error("Error al listar", e);
      } finally {
        this.loading = false;
      }
    },
    formatearFecha(fecha) {
      return fecha ? fecha.split("T")[0] : "-";
    }
  },
  mounted() {
    this.consultar();
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.title {
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0;
}

.subtitle {
  font-size: 0.875rem;
  color: #64748b;
}

/* Tabla  */
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.styled-table th {
  background: #f8fafc;
  padding: 1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.05em;
}

.table-row {
  transition: background 0.2s;
}

.table-row:hover {
  background: #f1f5f9;
}

.styled-table td {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}


.tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
}

.M {
  background: #eff6ff;
  color: #1d4ed8;
}

.F {
  background: #fdf2f8;
  color: #be185d;
}

.btn-info {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

/* Estado Vacío */
.empty-state {
  padding: 4rem;
  text-align: center;
  color: #94a3b8;
}
</style>