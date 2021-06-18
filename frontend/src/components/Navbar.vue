<template>
  <header class="border-b">
    <div id="nav" class="container flex flex-col flex-wrap p-5  md:items-center md:flex-row">
      <nav>
        <ul class="flex flex-wrap items-center justify-center text-base ">
          <li class="mr-5 text-sm font-semibold hover:text-gray-800">
            <router-link to="/">Home</router-link>
          </li>
          <li class="mr-5 text-sm font-semibold hover:text-gray-800">
            <router-link to="/cart">Cart</router-link>
          </li>
          <li class="mr-5 text-sm font-semibold hover:text-gray-800">
            <router-link to="/product/get-all">Product</router-link>
          </li>
          <li class="mr-5 text-sm font-semibold hover:text-gray-800">
            <router-link to="/product/609fc334ca65e71ada507d10">Product details</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>