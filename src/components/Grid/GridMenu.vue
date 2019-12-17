<template>
  <div id="GridMenu">
      <p>Presets: </p>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
  </div>
</template>

<script>
export default {
    name: "GridMenu"
}
</script>

<style scoped lang="scss">
    #GridMenu{
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: rgba(0, 0, 0, 1);
        border: 1px solid white;
        border-radius: 20px;
        > p {
            color: white;
            font-size: 2em;
        }
    }
</style>