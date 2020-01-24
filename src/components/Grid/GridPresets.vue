<template>
  <div id="GridPresets">
      <p>Presets: </p>
      <p @click="choosePreset(1, $event)" clicked="true">1</p>
      <p @click="choosePreset(2, $event)" clicked="false">2</p>
      <p @click="choosePreset(3, $event)" clicked="false">3</p>
      <p @click="choosePreset(4, $event)" clicked="false">4</p>
      <p @click="choosePreset(5, $event)" clicked="false">5</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import characterCardMixin from '../../mixins/characterCardMixin';
import gridMixin from '../../mixins/gridMixin';

export default {
    name: "GridPresets",
    mixins: [characterCardMixin, gridMixin],
    methods: {
        ...mapActions(['changePreset']),
        choosePreset(newPresetNumber, e){
            let {target} = e;
            if(this.presetNumber !== newPresetNumber){
                this.clearGrid();
                this.resetPieceDraggability();
                this.activateRotationImgs();
                this.changePreset(newPresetNumber);
                this.removePresetHighlight();
                this.resetGridArchetypes();
                e.target.setAttribute('clicked', true);
            }
        },
        removePresetHighlight(){
            let presets = [...document.getElementById('GridPresets').children].slice(1);
            presets.forEach(preset => {
                preset.setAttribute('clicked', false);
            })
        }
    },
    computed: mapGetters(['presetNumber'])
}
</script>

<style scoped lang="scss">
    #GridPresets{
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
            &[clicked="true"], &:first-of-type ~ p:hover{
                cursor: pointer;
                color: yellow;
                text-shadow: 0 0 10px yellow;
            }
        }
    }

    @media only screen and (max-width: 500px) {
        p:first-of-type {
            display: none;
        }
    }
</style>