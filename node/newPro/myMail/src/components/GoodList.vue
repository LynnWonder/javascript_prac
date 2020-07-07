<template>
    <div>
      this is a good list!
      <p>
        {{$route.params.id}}
      </p>
<!--      <router-link to="/good/title">test router</router-link>-->
<!--      <button @click="jump">click me test router!</button>-->
      <router-link :to="{name:'GoodListTitle',params:{id:123}}">test router</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'GoodList',
  methods: {
    jump() {
      this.$router.push({ path: '/good/title?id=123' });
    },
  },
};
</script>

<style scoped>

</style>
