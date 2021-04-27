<template>
  <div class="container mx-auto">
    <h1 class="text-2xl mb-5">Create a new basket</h1>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
            Ville
          </label>
          <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-city" type="text" placeholder="Albuquerque">
        </div>
        <div class="md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
            Code postal
          </label>
          <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-zip" type="text" placeholder="90210">
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
            Ville
          </label>
          <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="address" type="text" placeholder="Albuquerque">
        </div>
        <div class="md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
            Code postal
          </label>
          <input
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="country" type="text" placeholder="90210">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateBasket',
  data() {
    return {}
  },
  methods: {}
}
</script>
