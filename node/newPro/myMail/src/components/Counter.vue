<template>
  <div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <div>{{nums}}</div>
    <div :style="{color:'red'}">this is transfer from parents:{{nums}}</div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      // num: 0,
    };
  },
  props: {
    nums: Number,
  },
  methods: {
    increment() {
      // this.num += 1;
      this.$emit('incre');
    },
    decrement() {
      // this.num -= 1;
      this.$emit('decre');
    },

  },
};
</script>

<style scoped>

</style>
