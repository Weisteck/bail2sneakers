<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/cart">Cart</router-link>
    |
    <router-link to="/product/get-all">Product</router-link>
    |
    <router-link to="/product/609fc334ca65e71ada507d10">Product details</router-link>
  </div>
  <router-view/>

  <div>
    Moyenne des valeurs : {{ (num1 + num2) / 2 }}

    <Compteur :num="num1" v-on:new-val="updateNumOne" />
    <Compteur :num="num2" v-on:new-val="updateNumTwo" />

  </div>
</template>
<script>
import Compteur from "./components/Compteur.vue";

export default {
  name: "App",
  components: {
    Compteur,
  },
  data() {
    return {
      num1: 0,
      num2: 0
    };
  },
  methods: {
    updateNumOne(num) {
      this.num1 = num;
    },

    updateNumTwo(num) {
      this.num2 = num
    }
  },

};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
