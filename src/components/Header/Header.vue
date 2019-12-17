<template>
  <header>
      <router-link to="/">Board</router-link>
      <p>{{" "}}|{{" "}}</p>
      <router-link to="/select">Select</router-link>
  </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 1);
    }

    a, p{
        text-decoration: none;
        font: {
            size: 3em;
            weight: 200;
        }
        color: white;
        white-space: pre;
    }
</style>