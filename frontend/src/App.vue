<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/cart">Cart</router-link>
    |
    <router-link to="/product/get-all">Product</router-link>
    |
    <router-link to="/product/60acf6a894832a6396b9e9ab">Product details</router-link>
    |
    <router-link to="/product/create">Create product</router-link>
    |
    <router-link to="/product/edit/60acf6a894832a6396b9e9ab">Edit product</router-link>
    |
    <router-link to="/back-office/product/get-all">Get all products back office</router-link>
  </div>
  <router-view/>

  <h1>TEST</h1>
</template>
<script>
export default {
  name: "App",
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
