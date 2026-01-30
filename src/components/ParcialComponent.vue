<template>
    <div class="compact-container fade-in">
        <div class="card border-patch">
            <div class="header-section">
                <h3 class="title">Edición Parcial</h3>
                <p class="subtitle">Modifique solo los campos necesarios.</p>
            </div>



            <div class="input-grid">
                <div class="input-group">
                    <label>ID del Estudiante</label>
                    <input type="number" v-model="id" class="main-input highlight-patch" placeholder="ID a editar" />
                </div>
                <div class="input-group">
                    <label>Nombre</label>
                    <input type="text" v-model="form.nombre" class="main-input" />
                </div>
                <div class="input-group">
                    <label>Apellido</label>
                    <input type="text" v-model="form.apellido" class="main-input" />
                </div>
                <div class="input-group">
                    <label>Provincia</label>
                    <input type="text" v-model="form.provincia" class="main-input" />
                </div>
                <div class="input-group">
                    <label>Género</label>
                    <select v-model="form.genero" class="main-input">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
                <div>
                    <label>Fecha de Nacimiento</label>
                    <input type="date" v-model="form.fechanacimiento" class="main-input" />
                </div>
            </div>

            <div class="form-footer">
                <button @click="ejecutar" class="btn btn-patch shadow-patch">Guardar Cambios Parciales</button>
            </div>
        </div>
    </div>
</template>

<script>
import { actualizarPorIdFachada } from "@/clients/MatriculaClients.js";

export default {
    data: () => ({
        id: null,
        form: { nombre: "", apellido: "", provincia: "", genero: "M", fechanacimiento: "" }
    }),
    methods: {
        async ejecutar() {
            if (!this.id) return alert("ID requerido");
            const datosParaEnviar = {};
            if (this.form.nombre) datosParaEnviar.nombre = this.form.nombre;
            if (this.form.provincia) datosParaEnviar.provincia = this.form.provincia;
            if (this.form.apellido) datosParaEnviar.apellido = this.form.apellido;
            if (this.form.genero) datosParaEnviar.genero = this.form.genero;
            if (this.form.fechanacimiento) datosParaEnviar.fechanacimiento = this.form.fechanacimiento ? `${this.fechaNacimiento}T00:00:00`
                : null;

            await actualizarPorIdFachada(this.id, datosParaEnviar);
            alert("¡Campos actualizados!");
        }
    }
}
</script>


<style scoped>
.title {
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 700;
}

.subtitle {
    color: #64748b;
    font-size: 0.9rem;
}

.header-section {
    margin-bottom: 2rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 1rem;
}

.compact-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
}

.card {
    background: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
}

.input-grid {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 1.25rem;
    justify-content: center;
    width: 75%;
    margin: 0 auto;
}

.input-group label {
    font-weight: 600;
    color: #334155;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    position: initial;
}

.main-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    background: #ffffff;
    font-size: 1rem;
    color: #1e293b;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-footer {
    margin-top: 2.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background-color: rgb(46, 111, 155);
}
</style>