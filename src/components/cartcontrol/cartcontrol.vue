<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object,
        default: {}
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cartAdd', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .cart-control
    font-size:0
    .cart-decrease,.cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
    .cart-decrease
      display: inline-block
    .move-enter-active,.move-leave-active
      transition: all ease .5s
      opacity 1
      transform translate3D(0,0,0) rotate(0)
    .move-enter,.move-leave-active
      opacity: 0
      transform translate3D(24px,0,0) rotate(360 deg)
    .cart-count
      display: inline-block
      vertical-align: top
      padding-top: 6px
      width: 12px
      line-height: 24px
      height: 24px
      font-size: 10px
      text-align: center
      color: rgb(147,153,159)
</style>
