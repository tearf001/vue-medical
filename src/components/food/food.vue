<template>
  <transition name="slide-left">
    <div v-show="showFlag" class="food" id="food-detail-hook">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="seller-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count || food.count ===0" @click.stop.prevent="addFirst">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <div class="title">商品信息</div>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1>商品评价</h1>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(document.getElementById('food-detail-hook'), {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      }
    },
    components: {
      cartcontrol,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .slide-left-enter-active,.slide-left-leave-active
    transition all ease-out .5s
  .slide-left-enter,.slide-left-leave-active
    transition all ease-out .5s
    transform translate3d(100%,0,0)
  .food
    position: fixed
    left 0
    top: 0
    bottom: 48px
    z-index 30
    width: 100%
    background: #ffffff
    .img-header
      position: relative
      width 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left:0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 18px
          font-size: 20px
          color: #ffffff

    .content
      padding: 18px
      position: relative
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size:0
        height: 10px
        .seller-count,.rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .seller-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
    .cartcontrol-wrapper
      position: absolute
      right 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index 10
      line-height: 24px
      height: 24px
      padding: 0 12px
      box-sizing border-box
      font-size: 10px
      border-radius 12px
      color: #ffffff
      background: rgb(0,160,220)
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 16px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77,85,93)

</style>
