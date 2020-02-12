<template>
    <div id="OptionPreset">
        <p>Download presets as JSON</p> 
        <a 
            @click="downloadJSON"
            href="" 
            ref="downloadAnchor">
            <img src="../../assets/save.svg" alt="Save">
        </a>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'OptionPreset',
    computed: mapGetters(['presets']),
    methods: {
        downloadJSON(){
            let {downloadAnchor} = this.$refs;
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.presets));
            downloadAnchor.setAttribute('href', dataStr);
            downloadAnchor.setAttribute('download', 'Presets.json')
        }
    }
}
</script>

<style scoped lang="scss">
    #OptionPreset {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: green;
        margin-top: 10px;
        cursor: pointer;
        > p {
            font-size: 1.5em;
        }
        > a {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                height: 35px;
                width: 35px;
            }
        }
    }
</style>