<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/cart">Cart</router-link>
    |
    <router-link to="/product/get-all">Product</router-link>
    |
    <router-link to="/product/609fc334ca65e71ada507d10">Product details</router-link>
    |
    <router-link to="/product/create">Create product</router-link>
  </div>
  <router-view/>
</template>

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
