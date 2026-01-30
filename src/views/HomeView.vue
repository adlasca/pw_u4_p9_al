<template>
  <div class="home">
    <AboutComponent />
  </div>
  <div class="mb8">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import AboutComponent from "@/components/AboutComponent.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    AboutComponent,
  },
};
</script>
