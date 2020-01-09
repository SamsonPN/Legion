<template>
  <header>
      <p>Samson Nguyen</p>
      <div>
        <router-link to="/">Board</router-link> |
        <!-- <p>{{" "}}|{{" "}}</p> -->
        <router-link to="/select">Select</router-link> |
        <!-- <p>{{" "}}|{{" "}}</p> -->
        <router-link to="/options">Options</router-link>
      </div>
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
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 1);
        padding: 0px 5px;
        font: {
            size: 3em;
            weight: 200;
        }
        > p {
            flex: 1;
            pointer-events: none;
        }
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            color: white;
        }
    }

    a, p{
        text-decoration: none;
        color: white;
        white-space: pre;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
</style>