<template>
  <div :id="archetype + 'Select'" class="ClassSelect">
      <p>{{archetype}}</p>
      <div v-for="(_class, className) in classList" :key="className">
          <p>{{className}}</p>

          <textarea
            :id="className"
            class="levelTextArea"
            placeholder="Level"
            :value="_class.level"
            @change="levelChange"
            @keypress="checkNumbersOnly"
            maxLength="3"
            rows="1">
          </textarea>

          <p>{{ computeEffect(className, _class.level) }}</p>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Ranks from './ClassSelectRanks';
import characterCardMixin from '../../mixins/characterCardMixin';
import CharacterEffect from '../Characters/CharacterEffect';

export default {
    name: "Select",
    props: ['archetype', 'classList'],
    mixins: [characterCardMixin],
    methods: {
        ...mapActions(['updateLevels']),
        checkNumbersOnly(e, level){
            let {key} = e;
            let numericalInput = parseInt(key);
            if(key === 'Enter' || isNaN(numericalInput)){
                e.preventDefault();
            }
        },
        computeCoordinates(level, id){
            let {archetype} = this;
            let rank = this.rankCheck(level);
            let coordinates;
            if(rank === 'SSS' && (id === "Xenon" || id === "Enhanced Lab Piece")){
                coordinates = Ranks[rank][id];
            }
            else if(rank === 'SS' && id === "Enhanced Lab Piece"){
                coordinates = Ranks[rank][id];
            }
            else {
                coordinates = ['A', 'B'].includes(rank) ? Ranks[rank] : Ranks[rank][archetype];
            }
            return coordinates;
        },
        levelChange(e){
            let {id, value} = e.target;
            let level = parseInt(value);
            let {archetype} = this;
            if(value === ''){
                e.target.value = '';
                return;
            }
            else if(isNaN(level)){
                alert('Please enter numbers only!');
                e.target.value = '';
                return;
            }
            else if (level < 60 || level > 275){
                alert('Character is either ineligible for legion or above level cap!');
                e.target.value = '';
                return;
            }
            let coordinates = this.computeCoordinates(level, id);
            let data = {
                archetype,
                className: id,
                level,
                coordinates
            };
            this.updateLevels(data)
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../../mixins.scss';

    .ClassSelect {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        > p {
            width: 100%;
            border-bottom: 3px solid white;
            font-size: 3em;
        }
         > div {
             width: 100%;
             display: flex;
             justify-content: space-around;
             align-items: baseline;
             margin-top: 10px;
             font-size: 1.75em;
             > p, > textarea {
                 text-align: center;
                 width: 27.5%;
             }
         }
    }

    textarea {
        outline: none;
        resize: none;
        border: {
            color: inherit;
            width: 1.25px;
        }
        font-size: 1em;
        text-align: center;
        color: inherit;
        background-color: rgba(0, 0, 0, 0.75);
        &::placeholder {
            color: inherit;
        }
    }

    @include for-tablet-small-only {
        .ClassSelect {
            > div {
                flex-direction: column;
                align-items: center;
                margin-bottom: 5px;
                > p {
                    width: 100%;
                    order: 1;
                }
                > textarea {
                    width: 75%;
                    order: 2;
                }
            }
        }
    }
</style>
