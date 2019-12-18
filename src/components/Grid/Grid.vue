<template>
    <table>
        <tbody>
            <GridRow 
            v-for="(row, index) in rows" 
            :key="index"
            :row="index"
            />
        </tbody>
    </table>
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
    table{
        border: 1px solid black;
        border-collapse: collapse;
        background-color: #333333;
        background-color: rgba(21, 21, 21, 1);
        opacity: 0.95;
        margin-top: 3px;
    }
</style>