
<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <h1>Sistema de Matrícula</h1>
        <div class="status-badge">Panel de Control</div>
      </header>

      <nav class="tabs-menu">
        <button 
          v-for="tab in pestañas" 
          :key="tab.id"
          :class="['tab-btn', { active: pestañaActiva === tab.id }]"
          @click="pestañaActiva = tab.id"
        >
          {{ tab.nombre }}
        </button>
      </nav>

      <transition name="fade" mode="out-in">
        <div :key="pestañaActiva" class="tab-content">
          <EstudianteLista v-if="pestañaActiva === 'listar'" />
          <EstudianteCrear v-if="pestañaActiva === 'crear'" />
          <EstudianteGestion v-if="pestañaActiva === 'buscar'" />
          <BorrarComponent v-if="pestañaActiva === 'borrar'" />
          <EstudianteActualizar v-if="pestañaActiva === 'actualizar'" />
          <ParcialComponent v-if="pestañaActiva === 'parcial'" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import EstudianteLista from '../components/ListarComponent.vue';
import EstudianteCrear from '../components/CrearComponent.vue';
import EstudianteGestion from '../components/BuscarComponent.vue';
import EstudianteActualizar from '../components/ActualizarComponent.vue';
import ParcialComponent from '@/components/ParcialComponent.vue';
import BorrarComponent from '@/components/BorrarComponent.vue';

export default {
  components: { 
    EstudianteLista, 
    EstudianteCrear, 
    EstudianteGestion, 
    EstudianteActualizar ,
    ParcialComponent,
    BorrarComponent
  },
  data() {
    return {
      pestañaActiva: 'listar',
      pestañas: [
        { id: 'listar', nombre: 'Ver Todos' },
        { id: 'crear', nombre: 'Registrar' },
        { id: 'buscar', nombre: 'Buscar' },
        { id: 'actualizar', nombre: 'Modificar' },
        { id: 'parcial', nombre: 'Edición Rápida' },
        { id: 'borrar', nombre: 'Eliminar' }
      ]
    };
  }
}
</script>

<style scoped>
/* Estilos para las Pestañas */
.tabs-menu {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 10px;
  overflow-x: auto;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: #718096;
  border-radius: 8px;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-btn:hover {
  background: #f7fafc;
  color: #2d3748;
}

.tab-btn.active {
  background: #ebf8ff;
  color: #3182ce;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Animación de transición */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.tab-content {
  margin-top: 10px;
}
</style>