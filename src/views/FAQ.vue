<template>
    <div id="FAQ">
        <div>
            <p>Getting started:</p>
            <ol>
                <li>Go to the Classes page, fill out your character information, and save.</li>
                <li>Press on the <strong><i>Save Characters</i></strong> button and head over to the grid.</li>
                <li>In the grid page, you can drag and drop pieces onto the board as you would normally in the game.</li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    name: "FAQ"
}
</script>

<style scoped lang="scss">
    #FAQ {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        > div:first-of-type {
            padding: 0px 10px;
            > p {
                font-size: 3em;
                color: red;
            }
        }
    }

    ol {
        padding: 0 7.5px;
        font-size: 1.25em;
        list-style: {
            position: inside;
            type: upper-roman;
        }
    }
</style>