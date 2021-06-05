<template>

  <div id='demo'>
    <Compteur v-model='resultFromChild'></Compteur>
    This is in parent component {{ resultFromChild }}
  </div>
</template>
<script>
import Compteur from "../components/Compteur.vue";

export default{
  components: {
    Compteur,
  },
  data () {
    return {
      resultFromChild: null
    }
  }
}

// parent template

</script>
