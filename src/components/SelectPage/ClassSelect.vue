<template>
  <div :id="archetype + 'Select'" class="ClassSelect">
      <p>{{archetype}}</p>
      <div v-for="(_class, key) in classList" :key="key">
          <p>{{key}}</p>
          <textarea
            :class="key"
            :value="_class.name"
            @change="ignChange"
            @keypress="preventEnter"
            placeholder="IGN"
            maxLength="12"
            rows="1">
          </textarea>
          <textarea
            :class="key"
            placeholder="Level"
            :value="_class.level"
            @change="levelChange"
            @keypress="preventEnter"
            maxLength="3"
            rows="1">
          </textarea>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Select",
    props: ['archetype', 'classList'],
    methods: {
        ...mapActions(['updateCharData']),
        ignChange(e){
            let {value, className} = e.target;
            let data = {
                field: 'name',
                value,
                archetype: this.archetype,
                className
            }
            this.updateCharData(data)
        },
        levelChange(e){
            let {value, className} = e.target;
            let data = {
                field: 'level',
                value,
                archetype: this.archetype,
                className
            };
            this.updateCharData(data);
        },
        preventEnter(e){
            if(e.key === 'Enter'){
                e.preventDefault()
            }
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
