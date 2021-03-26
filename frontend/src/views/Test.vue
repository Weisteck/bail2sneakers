<template>
  <h1>{{ titre }}</h1>

  <div v-for="chiffre in nombres" v-bind:key="chiffre">
    <p>{{ chiffre }}</p>
  </div>

  <div v-if="count === 1 ">count = 1</div>
  <div v-else> else</div>

  {{ count }}
  <button @click="getStore">Store</button>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      titre: 'Mon application',
      nombres: [1, 2, 3],
      count: 0
    }
  },
  methods: {
    increment() {
      this.count += 2
    },

    getStore() {
      this.$store.dispatch('maFonction')
          .then(res => {
            console.log(res)
          }).catch(err => {
        console.error(err)
      })
    }
  },
  beforeMount() {
    this.increment()
  }
}
</script>
