<template>
  <header>
      <div>
        <router-link to="/home">
            <img src="../../assets/Header/grid.svg" alt="Grid"/>
            <span>  Board  </span>
        </router-link> 
        <router-link to="/select">
            <img src="../../assets/Header/classes.svg" alt="Classes"/>
            <span>  Classes  </span>
        </router-link> 
        <router-link to="/options">
            <img src="../../assets/Header/options.svg" alt="Options"/>
            <span>  Options  </span>
        </router-link> 
        <router-link to="/faq">
            <img src="../../assets/Header/FAQ.svg" alt="Options"/>
            <span>  FAQ  </span>
        </router-link> 
        <a href="http://localhost:3000/auth/logout">
            <img src="../../assets/Header/logout.svg" alt="Logout">
            <span>  Logout  </span>
        </a>
      </div>
  </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped lang="scss">
    @import '../../mixins.scss';

    header {
        height: auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: rgba(0, 0, 0, 1);
        padding: 0px 5px;
        font: {
            size: 2.5em;
            weight: 200;
        }
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            color: white;
        }
    }

    a, p {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        white-space: pre;
        cursor: url('../../assets/ms-click.gif'), auto;
        &:hover{
            opacity: 0.75;
        }
        &:last-of-type {
            color: red;
        }
    }

    img {
        height: 50px;
        width: 50px;
    }

    @include for-desktop-small-only {
        span{
            display: none;
        }
    }

    @include for-tablet-small-2-only {
        p {
            display: none;
        }
        a {
            justify-content: center;
            flex: 1;
        }
    }
</style>