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

          <p>{{ effect(className) }}</p>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Ranks from './ClassSelectRanks';
import characterCardMixin from '../../mixins/characterCardMixin';
import CharacterEffect from '../Characters/CharacterEffect';

export default {
    name: "Select",
    props: ['archetype', 'classList'],
    mixins: [characterCardMixin],
    methods: {
        ...mapMutations(['updateCharData']),
        checkNumbersOnly(e){
            let numericalInput = parseInt(e.key);
            if(e.key === 'Enter'){
                e.preventDefault()
            }
            if(isNaN(numericalInput)){
                alert('Enter numbers only!')
                e.preventDefault();
            }
        },
        levelChange(e){
            let {id, value} = e.target;
            let {archetype} = this;
            value = parseInt(value);
            // just call checkNumbersOnly
            if(isNaN(value)){
                alert('Please enter numbers only!');
                e.target.value = '0';
                return
            }
            let rank = this.rankCheck(value);
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
            let data = {
                field: 'level',
                value,
                archetype,
                className: id,
                coordinates
            };
            this.updateCharData(data);
        },
        effect(charName){
            let {classes, effects} = CharacterEffect;
            let effectNum = classes[charName];
            return effects[effectNum].effect;
        }
    }
}
</script>

<style scoped lang="scss">
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
</style>
