<template>
    <div class="compact-container fade-in">
        <div class="card border-put">
            <div class="header-section">
                <h3 class="title">Sobrescribir Registro</h3>
                <p class="subtitle">Complete todos los campos para actualizar el perfil completo.</p>
            </div>


            <div class="input-grid">
                <div class="input-group">
                    <label>ID del Estudiante</label>
                    <input type="number" v-model="id" class="main-input highlight-put" placeholder="ID a buscar" />
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
                    <input type="date" v-model="form.fechaNacimiento" class="main-input" />
                </div>
            </div>

            <div class="form-footer">
                <button @click="ejecutar" class="btn btn-put shadow-put">Actualizar Perfil Completo</button>
            </div>
        </div>
    </div>
</template>

<script>
import { actualizarFachada } from "@/clients/MatriculaClients.js";

export default {
    data: () => ({
        id: null,
        form: {
            nombre: "", apellido: "", provincia: "", genero: "", fechaNacimiento: ""
        }
    }),
    methods: {
        async ejecutar() {
            const datosActualizados = {
                nombre: this.form.nombre,
                apellido: this.form.apellido,
                fechaNacimiento: this.form.fechaNacimiento
                    ? `${this.form.fechaNacimiento}T00:00:00`
                    : null,
                provincia: this.form.provincia,
                genero: this.form.genero,
            };
            if (!this.id) return alert("Por favor, ingrese el ID");
            await actualizarFachada(this.id, datosActualizados);
            alert("¡Registro actualizado con éxito!");
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