<template>
  <div :id="archetype.archetype + 'Select'">
      <p>{{archetype.archetype}}</p>
      <div v-for="item in archetype.classes" :key="item.class">
          {{item.class}}
      </div>
  </div>
</template>

<script>
export default {
    name: "Select",
    props: ['archetype'],
    mounted(){
        console.log(this.archetype.archetype);
    }
}
</script>

<style scoped lang="scss">

</style>
