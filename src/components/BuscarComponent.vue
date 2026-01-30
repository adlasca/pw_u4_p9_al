<template>
  <div class="card">
    <div class="input-group">
      <label>ID del Estudiante</label>
      <input 
        type="number" 
        v-model="id" 
        class="main-input highlight" 
        placeholder="Ingrese ID para buscar"
        @keyup.enter="buscar"
      />
    </div>
    
    <div class="actions-grid" style="margin-top: 15px;">
      <button @click="buscar" class="btn btn-secondary">Buscar por ID</button>
    
    </div>

    <div v-if="estudiante" class="table-container" style="margin-top: 20px;">
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
          <tr> <td><strong>{{ estudiante.id }}</strong></td>
            <td>{{ estudiante.nombre }} {{ estudiante.apellido }}</td>
            <td>{{ estudiante.provincia }}</td>
            <td>
              <span :class="['tag', estudiante.genero]">{{ estudiante.genero }}</span>
            </td>
            <td>{{ formatearFechaTabla(estudiante.fechaNacimiento) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { consultarPorIdFachada, borrarFachada } from "@/clients/MatriculaClients.js";

export default {
  name: 'EstudianteGestion',
  data: () => ({ 
    id: null, 
    estudiante: null 
  }),
  methods: {
    async buscar() {
      if (!this.id) return alert("Por favor, ingrese un ID");
      
      try {
        const res = await consultarPorIdFachada(this.id);
        if (res) {
          this.estudiante = res;
        } else {
          this.estudiante = null;
          alert("Estudiante no encontrado");
        }
      } catch (error) {
        console.error(error);
        alert("Error al buscar el estudiante");
      }
    },
    formatearFechaTabla(fecha) {
      if (!fecha) return "-";
      return fecha.split("T")[0];
    },
    limpiar() {
      this.id = null;
      this.estudiante = null;
    }
  }
}
</script>
<style scoped>
/* Contenedores */
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
}

.header-section { margin-bottom: 1.5rem; }
.title { color: #1e293b; font-size: 1.25rem; margin: 0; }
.subtitle { color: #64748b; font-size: 0.875rem; }

/* Inputs Modernos */
.main-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
}

/* Botones con Estilo */
.actions-grid {
  display: flex;
  gap: 10px;
}

.btn {
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-secondary { background: #64748b; color: white; }


/* Tabla Estilizada */
.table-container {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.styled-table th {
  background: #f8fafc;
  color: #475569;
  padding: 1rem;
  text-align: left;
}

.styled-table td {
  padding: 1rem;
  border-top: 1px solid #f1f5f9;
}

.id-badge {
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
  color: #1e293b;
  font-family: monospace;
}

.tag {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

</style>