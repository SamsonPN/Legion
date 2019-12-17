<template>
  <div id="GridBtnsWrapper">
        <button id="GridApplyBtn">&#x2714;Apply</button>
        <button id="GridAssignBtn">Assign Units</button>
  </div>
</template>

<script>
export default {
    name: "GridButtons"
}
</script>

<style scoped lang="scss">
    #GridBtnsWrapper {
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1;
    }

    button {
        outline: none;
        height: 100%;
        width: 48%;
        border: 1px solid white;
        border-radius: 20px;
        color: white;
        font-size: 1.25em;
        cursor: pointer;
        &:first-of-type {
            background-color: rgb(68,68,102);
        }
        &:last-of-type {
            background-color: rgb(34, 136, 170);
        }
        &:hover{
            color: black;
        }
    }
</style>