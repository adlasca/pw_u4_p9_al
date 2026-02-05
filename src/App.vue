<template>
  <nav class="navbar">
    <div class="brand"> Sistema Matriculación</div>
    <div class="pestanas">
      <router-link to="/listar">Listar</router-link>
      <router-link to="/actualizar">Actualizar</router-link>
      <router-link to="/borrar">Borrar</router-link>
      <router-link to="/buscar">Buscar</router-link>
      <router-link to="/crear">Crear</router-link>
      <router-link to="/parcial">Parcial</router-link>
    </div>
  </nav>
  <main class="content">
    <router-view />
  </main>
</template>

<script>
import { loginFacade } from "./clients/AuthUser";

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      user: "goten",
      password: "1234"
    };
  },
  async mounted() {
    console.log("mounted");
    localStorage.setItem("token", await loginFacade(this.user, this.password));
    console.log("Token: ", localStorage.getItem("token"));
  },
  unmounted() {
    console.log("unmounted");
    localStorage.removeItem("token");
    console.log("Token: ", localStorage.getItem("token"));
  },

};
</script>

<style>
body {
  margin: 0;
  background-color: #f8fafc;
}

#app {
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #1a202c;
}

.navbar {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2d3748;
  letter-spacing: -0.5px;
}

.pestanas {
  display: flex;
  gap: 8px;
  background: #f1f5f9;
  padding: 6px;
  border-radius: 12px;
  overflow-x: auto;
  max-width: 100%;
}

.pestanas a {
  padding: 10px 18px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  color: #64748b;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.pestanas a:hover {
  background-color: #e2e8f0;
  color: #1e293b;
}

.pestanas a.router-link-exact-active {
  background-color: #ffffff;
  color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}
</style>