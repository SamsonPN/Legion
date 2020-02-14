<template>
  <div id="GridPresets">
      <p>Presets: </p>
      <p
        v-for="(preset) in presets"
        :key="preset"
        @click="choosePreset(preset)"
        :clicked="isCurrentPreset(preset)">
            {{preset + 1}}
      </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import characterCardMixin from '../../mixins/characterCardMixin';
import gridMixin from '../../mixins/gridMixin';

export default {
    name: "GridPresets",
    mixins: [characterCardMixin, gridMixin],
    data(){
        return {
            presets: [...new Array(5)].map((x, i) => i)
        }
    },
    computed: mapGetters(['presetNumber']),
    methods: {
        ...mapActions(['changePreset']),
        isCurrentPreset(preset){
            return this.presetNumber === preset;
        },
        choosePreset(newPresetNumber, e){
            if( !this.isCurrentPreset(newPresetNumber) ){
                this.deactivateCurrentCard(this);
                this.changePreset(newPresetNumber);
                this.resetGridArchetypes();
                this.unhighlightCard(this);
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../mixins.scss';

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
                cursor: url('../../assets/ms-cursor.png'), auto;
                color: yellow;
                text-shadow: 0 0 10px yellow;
            }
        }
    }

    @include for-desktop-large-only {
        #GridPresets {
            border-radius: 30px;
            > p {
                font-size: 3em;
            }
        }
    }

    @media only screen and (max-width: 31.250em) {
        p:first-of-type {
            display: none;
        }
    }
</style>