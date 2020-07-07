<template>
    <div>
      this is a inline router.
      <div>
        <p>{{$route.params}}</p>
        <p>{{$route.query}}</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Title',
};
</script>

<style scoped>

</style>
