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
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    }
  },
  {
    path: "/borrar",
    name: "borrar",
    component: BorrarView,
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    }
  },
  {
    path: "/buscar",
    name: "buscar",
    component: BuscarView,
    meta: {
      requiereAutorizacion: false,
      esPublica: true,
    }
  },
  {
    path: "/crear",
    name: "crear",
    component: CrearView,
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    }
  },
  {
    path: "/listar",
    name: "listar",
    component: ListarView,
    meta: {
      requiereAutorizacion: false,
      esPublica: true,
    }
  },
  {
    path: "/parcial",
    name: "parcial",
    component: ParcialView,
    meta: {
      requiereAutorizacion: true,
      esPublica: false,
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/*Configuracion del Guardian
To: Ruta a la que se quiere acceder
From: Ruta desde la que se accede
Next: Hacia donde se dirige la navegacion, 
*/

router.beforeEach((to,from,next)=>{
  if(to.meta.requiereAutorizacion){
    /*Le envio a una pagina de login */
    console.log("redirige a login")
  }else{
    /*Le dejo sin validaciones*/
    console.log("sin validaciones")
  }
})

export default router;
