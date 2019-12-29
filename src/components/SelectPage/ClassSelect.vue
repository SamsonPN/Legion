<template>
  <div :id="archetype + 'Select'" class="ClassSelect">
      <p>{{archetype}}</p>
      <div v-for="(_class, key) in classList" :key="key">
          <p>{{key}}</p>
          <textarea
            :id="key"
            :value="_class.name"
            @change="ignChange"
            @keypress="isAlphaNum"
            placeholder="IGN"
            maxLength="12"
            rows="1">
          </textarea>
          <textarea
            :id="key"
            class="levelTextArea"
            placeholder="Level"
            :value="_class.level"
            @change="levelChange"
            @keypress="checkNumbersOnly"
            maxLength="3"
            rows="1">
          </textarea>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Ranks from './ClassSelectRanks';

export default {
    name: "Select",
    props: ['archetype', 'classList'],
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
        isAlphaNum(e){
            let alphnum = /\w/;
            let match = e.key.match(alphnum) ? true : false;
            if (! match) {
                alert('Letters/Numbers only!');
                e.preventDefault();
            }
            if(e.key === 'Enter'){
                e.preventDefault();
            }
        },
        ignChange(e){
            let {id, value} = e.target;
            let data = {
                field: 'name',
                value,
                archetype: this.archetype,
                className: id
            }
            this.updateCharData(data)
        },
        levelChange(e){
            let {id, value} = e.target;
            let {archetype} = this;
            value = parseInt(value);
            if(isNaN(value)){
                alert('Please enter numbers only!');
                e.target.value = '0';
                return
            }
            let rank = this.rankCheck(value);
            console.log(rank)
            let coordinates = ['A', 'B'].includes(rank) ? Ranks[rank] : Ranks[rank][archetype];
            console.log(Ranks[rank])
            console.log(coordinates)
            let data = {
                field: 'level',
                value,
                archetype,
                className: id,
                coordinates
            };
            this.updateCharData(data);
        },
        rankCheck(level){
            let rank;
            console.log(level)
            if(60 <= level && level < 100){
                rank = 'B';
            }
            else if (100 <= level && level < 140){
               rank = 'A' 
            }
            else if (140 <= level && level < 200){
                rank = 'S'
            }
            else if (200 <= level && level < 250){
                rank = 'SS'
            }
            else {
                rank = 'SSS'
            }
            return rank;
        }
    },
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
