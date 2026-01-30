<template>
    <div class="form-container fade-in">
        <div class="card">
            <header class="header-section">
                <h3 class="title">Registro de Estudiante</h3>
                <p class="subtitle">Ingrese los datos personales para la matrícula</p>
            </header>

            <form @submit.prevent="ejecutarGuardar" novalidate>
                <div class="input-grid">
                    <div class="input-group">
                        <label for="nombre">Nombre</label>
                        <input id="nombre" type="text" v-model.trim="form.nombre" class="main-input"
                            placeholder="Ej: Juan" required />
                    </div>

                    <div class="input-group">
                        <label for="apellido">Apellido</label>
                        <input id="apellido" type="text" v-model.trim="form.apellido" class="main-input"
                            placeholder="Ej: Pérez" required />
                    </div>

                    <div class="input-group">
                        <label for="fecha">Fecha de Nacimiento</label>
                        <input id="fecha" type="date" v-model="form.fechaNacimiento" class="main-input" required />
                    </div>

                    <div class="input-group">
                        <label for="provincia">Provincia</label>
                        <input id="provincia" type="text" v-model.trim="form.provincia" class="main-input"
                            placeholder="Ej: Pichincha" required />
                    </div>

                    <div class="input-group">
                        <label for="genero">Género</label>
                        <select id="genero" v-model="form.genero" class="main-input select-custom" required>
                            <option value="" disabled>Seleccione uno...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="O">Otro</option>
                        </select>
                    </div>
                </div>

                <div class="form-footer">
                    <button type="button" @click="limpiar" class="btn btn-outline" :disabled="loading">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-success" :disabled="loading">
                        <span v-if="!loading">Registrar Estudiante</span>
                        <span v-else class="loader"></span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { guardarFachada } from "@/clients/MatriculaClients.js";

export default {
    data: () => ({
        loading: false,
        form: {
            nombre: "",
            apellido: "",
            fechaNacimiento: "",
            provincia: "",
            genero: ""
        }
    }),
    methods: {
        validarFormulario() {
            // Estándar de validación básica antes de enviar
            return Object.values(this.form).every(val => val !== "");
        },
        async ejecutarGuardar() {
            if (!this.validarFormulario()) {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }

            this.loading = true;
            try {
                const objeto = {
                    ...this.form,
                    fechaNacimiento: `${this.form.fechaNacimiento}T00:00:00`
                };
                await guardarFachada(objeto);
                alert("¡Registro exitoso!");
                this.limpiar();
            } catch (e) {
                alert("Error de conexión con el servidor.");
            } finally {
                this.loading = false;
            }
        },
        limpiar() {
            this.form = { nombre: "", apellido: "", fechaNacimiento: "", provincia: "", genero: "" };
        }
    }
}
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.card {
    background: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;
}

.header-section {
    margin-bottom: 2rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 1rem;
}

.title {
    color: #1e293b;
    font-size: 1.5rem;
    font-weight: 700;
}

.subtitle {
    color: #64748b;
    font-size: 0.9rem;
}

.input-grid {
    display: flex;
    flex-direction: column;
    text-align: left    ;
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

/* Estándar de Focus: Indicador visual claro */
.main-input:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
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
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-success {
    background: #10b981;
    color: white;
}

.btn-success:hover:not(:disabled) {
    background: #059669;
}

.btn-outline {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    color: #64748b;
}

.btn-outline:hover:not(:disabled) {
    background: #f1f5f9;
}

.loader {
    width: 18px;
    height: 18px;
    border: 2px solid #ffffff66;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    display: inline-block;
}
</style>