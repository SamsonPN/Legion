<template>
    <div id="Grid">
    <table>
        <tbody>
            <GridRow 
            v-for="(row, index) in rows" 
            :key="index"
            :row="index"
            />
        </tbody>
    </table>
    </div>
</template>

<script>
import GridRow from './GridRow';
export default {
    name: "Grid",
    components: {
        GridRow
    },
    data() {
        return {
            rows: [...new Array(20)].map((x, i) => i)
        }
    }
}
</script>

<style scoped lang="scss">
    #Grid {
        min-height: 80vh;
        height: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba( 255, 255, 255, 0.3);
        border-radius: 20px;
    }

    table{
        border: 1px solid black;
        border-collapse: collapse;
        background-color: #333333;
        background-color: rgba(21, 21, 21, 1);
        box-shadow: 10px 20px 10px 10px rgba(10, 10, 19, 0.8);
        opacity: 0.95;

    }
</style>