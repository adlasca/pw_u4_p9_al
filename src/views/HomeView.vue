<template>
  <div class="home">
    <MainView />
  </div>
  <div class="mb8">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import MainView from "./MainView.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    AboutComponent,
    MainView
  },
};
</script>
