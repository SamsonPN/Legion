<template>
  <div id="GridMenu">
      <p>Presets: </p>
      <p @click="choosePreset(1)">1</p>
      <p @click="choosePreset(2)">2</p>
      <p @click="choosePreset(3)">3</p>
      <p @click="choosePreset(4)">4</p>
      <p @click="choosePreset(5)">5</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import characterCardMixin from '../../mixins/characterCardMixin';

export default {
    name: "GridMenu",
    mixins: [characterCardMixin],
    methods: {
        ...mapActions(['changePreset']),
        choosePreset(newPresetNumber){
          if(this.presetNumber !== newPresetNumber){
            this.clearGrid();
            this.resetPieceDraggability();
            this.activateRotationImgs();
            this.changePreset(newPresetNumber);
          }
        }
    },
    computed: mapGetters(['presetNumber'])
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
            &:first-of-type ~ p{
                cursor: pointer;
            }
        }
    }
</style>