<template>
    <div class="login">
        <h2>LOGIN</h2>
        <input v-model="user" type="text" placeholder="Usuario">
        <input v-model="password" type="password" placeholder="Contraseña">
        <button @click="login">Iniciar Sesión</button>
    </div>
</template>

<script>
import { loginFacade } from "../clients/AuthUser";

export default {
    data(){
        return{
            user: "",
            password: ""
        }
    },
    methods:{
        async login(){
            /*Obtener el token*/    
            const TOKEN = await loginFacade(this.user,this.password) ;
            if(TOKEN!==null){
                localStorage.setItem("token",TOKEN);
                localStorage.setItem("estaAutenticado",true);
                this.$router.push({name: "listar"});
            }  else{
                console.log("Error de autenticación");
            }
        }
    }
}
</script>

<style scoped>
.login{
    width:300px;
    margin:100px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}
input{
    width: 80%;
    margin-bottom: 10px;
    padding:8px;
}
button{
    width: 100%;
    padding:8px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:hover{
    background-color: #45a049;
}
</style>
