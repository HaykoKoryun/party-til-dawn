<template>
  <div id="drink" @dblclick="use" :style="componentStyle">
    <div class="icon" :style="iconStyle">
    </div>
    <p class="title">
      {{ drink.name }}
    </p>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import EventBus from 'solutions/event-bus'
  import store from 'store'

  export default
  { 
    name: 'Drink',
    props: {
      drink: {
        type: Object,
        default: () => {return {}}
      }
    },
    methods:
    { use()
      { const instance = this;
        instance.$store.commit('useDrink', instance.drink);
      }
    },
    computed: {
      iconStyle() {
        return `background-image: url("/assets/drinks-icons/${this.drink.image}.png")`;
      },
      componentStyle() {
        return `
          opacity: ${store.state.drink === null ? '1' : '0.6'};
          cursor: ${store.state.drink === null ? 'pointer' : 'not-allowed'};
        `;
      }
    }
  }
</script>
<style scoped>
  #drink
  {
    width: 180px;
    height: 150px;
    box-sizing: border-box;
    margin: 6px 12px;
    border-radius: 2px;
    transition: all 0.25s;
  }

  #drink:hover
  {
    transform: scale(1.1);
  }

  #drink .icon
  {
    width: 144px;
    height: 140px;
    background-size: cover;
  }

  .title
  {
    color: #fff;
    font-size: 12px;
  }

  .title::selection {
    background: #000;
  }
</style>