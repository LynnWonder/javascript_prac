<template>
  <div class="hello">
    <Counter :nums="num" @incre="increment" @decre="decrement"></Counter>
    <p>parent:{{num}}</p>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Counter from './Counter';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      num: 0,
    };
  },
  components: {
    Counter,
  },
  methods: {
    increment() {
      this.num += 1;
    },
    decrement() {
      this.num -= 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
