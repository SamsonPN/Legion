<template>
    <div id="ClassSelectBar">
        <div>  
            <span>Auto Fill Levels: </span>
            <p @click="fillLevels">60</p> |
            <p @click="fillLevels">100</p> |
            <p @click="fillLevels">140</p> |
            <p @click="fillLevels">200</p> |
            <p @click="fillLevels">250</p>
        </div>
        <button @click="saveCharData" >Save Characters</button>
    </div>
</template>

<script>
export default {
    name: "ClassSelectBar",
    methods: {
        saveCharData(){
            let SaveChars = window.confirm('Save character data?')
            if(SaveChars){
                alert('Character information saved! Please allow some time for it to save properly!')
            }
        },
        fillLevels(e){
            alert(e.target.textContent)
        }
    }
}
</script>

<style scoped lang="scss">
    #ClassSelectBar {
        height: auto;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0px 5px;
        color: white;
        background: none;
        font: {
            size: 2em;
            weight: 200;
        }
        > div {
            display: flex;
            align-items: center;
            flex: 2;
            white-space: pre;
            > p{
                cursor: pointer;
                &:hover {
                    color: gold;
                }
            }
        }
        > button {
            outline: none;
            border-radius: 20px;
            background-color: #444466;
            color: white;
            font-size: 0.75em;
            cursor: pointer;
            flex: 0.5;
                &:hover {
                    opacity: 0.75;
                }
        }
    }
</style>