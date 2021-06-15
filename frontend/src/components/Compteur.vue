<template>
  <div>
    Valeur: {{ val }}
    <button @click="inc">Inc</button>
    <button @click="dec">Dec</button>
  </div>
</template>

<script>
export default {
  name: "Compteur",
  props: ["num"],
  data() {
    return {
      val: this.num,
    };
  },
  methods: {
    inc() {
      this.$emit('new-val', this.val += 1);
    },

    dec() {
      this.$emit("new-val", this.val -= 1);
    },
  },
};
</script>
