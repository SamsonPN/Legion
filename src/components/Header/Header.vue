<template>
  <header>
      <p>Samson Nguyen</p>
      <div>
        <router-link to="/">
            <img src="../../assets/Header/grid.svg" alt="Grid"/>
            <span>  Board</span>
        </router-link> |
        <router-link to="/select">
            <img src="../../assets/Header/classes.svg" alt="Classes"/>
            <span>  Select</span>
        </router-link> |
        <router-link to="/options">
            <img src="../../assets/Header/options.svg" alt="Options"/>
            <span>  Options</span>
        </router-link>
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
            size: 2.5em;
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
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        white-space: pre;
        cursor: pointer;
        &:hover{
            opacity: 0.75;
        }
    }

    img{
        height: 50px;
        width: 50px;
        padding-top: 5px;
    }

    @media only screen and (max-width: 768px){
        span{
            display: none;
        }
    }
</style>