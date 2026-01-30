<template>
  <div class="card">
    <div class="input-group">
      <label>ID del Estudiante</label>
      <input 
        type="number" 
        v-model="id" 
        class="main-input highlight" 
        placeholder="Ingrese ID para eliminar"
        @keyup.enter="buscar"
      />
    </div>
    
    <div class="actions-grid" style="margin-top: 15px;">
      <button @click="eliminar" class="btn btn-danger" :disabled="!id">Eliminar Registro</button>
    </div>
    <h1>{{ mensaje }}</h1>
  </div>
</template>

<script>
import {  borrarFachada } from "@/clients/MatriculaClients.js";

export default {
  name: 'EstudianteGestion',
  data: () => ({ 
    id: null, 
    estudiante: null ,
    mensaje: ''
  }),
  methods: {
    async eliminar() {
      if (!this.id) return alert("Ingrese un ID para eliminar");
      
      if (confirm(`¿Está seguro de eliminar al estudiante con ID ${this.id}?`)) {
        try {
          await borrarFachada(this.id);
          this.mensaje="Registro eliminado exitosamente";
          this.limpiar();
        } catch (error) {
          alert("No se pudo eliminar el registro");
        }
      }
    },
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

/* Inputs  */
.main-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}


/* Botones con Estilo */
.actions-grid {
  display: flex;
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
.btn-danger { background: #ef4444; color: white; }


</style>