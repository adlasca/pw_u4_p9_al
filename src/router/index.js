import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ActualizarView from "../views/ActualizarView.vue";
import BorrarView from "../views/BorrarView.vue";
import BuscarView from "../views/BuscarView.vue";
import CrearView from "../views/CrearView.vue";
import ListarView from "../views/ListarView.vue";
import ParcialView from "../views/ParcialView.vue";

const routes = [
  {
    path: "/actualizar",
    name: "actualizar",
    component: ActualizarView,
  },
  {
    path: "/borrar",
    name: "borrar",
    component: BorrarView,
  },
  {
    path: "/buscar",
    name: "buscar",
    component: BuscarView,
  },
  {
    path: "/crear",
    name: "crear",
    component: CrearView,
  },
  {
    path: "/listar",
    name: "listar",
    component: ListarView,
  },
  {
    path: "/parcial",
    name: "parcial",
    component: ParcialView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
