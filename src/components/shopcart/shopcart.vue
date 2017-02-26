<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleList">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay" :class="{highlight:enough}">{{payDesc}}</div>
      </div>
    </div>
    <transition name="ball" v-for="ball in balls">
      <div class="ball" v-show="ball.show"></div>
    </transition>
    <transition name="slideup">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <div class="title">购物车</div>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" id="shopcart-list-bottom-hook">
          <ul>
            <li v-for="food in selectFoods" class="food">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol
                  :food="food"
                ></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  export default {
    props: {
      deliveryPrice: {
        typpe: Number,
        default: 0
      },
      minPrice: {
        typpe: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `还差￥${this.minPrice} 起送`;
        } else if (this.totalPrice < this.minPrice) {
          const diff = this.minPrice - this.totalPrice;
          return `还差￥${diff} 起送`;
        } else {
          return '去结算';
        }
      },
      enough() {
        if (this.totalPrice === 0 || this.totalPrice < this.minPrice) {
          return false;
        }
        return true;
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        const el = document.getElementById('shopcart-list-bottom-hook');
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(el, {
                probeType: 3,
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        console.log(el);
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}`);
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin"
.shopcart
  position: fixed
  bottom: 0
  left: 0
  z-index :50
  height 48px
  width 100%
  .content
    display: flex
    background: #141d27
    font-size: 0
    position: relative
    z-index :20
    .content-left
      flex 1
      .logo-wrapper
        display: inline-block
        position relative
        top: -10px
        margin: 0 12px
        padding: 6px
        height: 56px
        width: 56px
        box-sizing border-box
        vertical-align: top
        border-radius 50%
        background: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius 50%
          background: #2b343c
          text-align: center
          &.highlight
            background: rgb(0, 160, 220)
            .icon-shopping_cart
              color: #ffffff
          .icon-shopping_cart
            line-height: 44px
            font-size: 24px
            color: #80858a
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          width: 24px
          line-height: 16px
          text-align: center
          border-radius 16px
          font-size: 9px
          font-weight: 700
          background: rgb(240,20,20)
          box-shadow 0 4px 8px 0 rgba(240,20,20,0.4)
          color: #ffffff
      .price
        display: inline-block
        font-weight: bold
        line-height: 24px
        margin-top: 12px
        box-sizing border-box
        padding-right 12px
        border-right:1px solid rgba(255,255,255,0.1)
        font-size: 16px
        color: rgba(255,255,255,0.4)
        &.highlight
          color: #ffffff
      .desc
        display: inline-block
        vertical-align: top
        line-height: 24px
        margin: 12px 0 0 12px
        color: rgba(255,255,255,0.4)
        font-size: 10px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        color: rgba(255,255,255,0.4)
        font-weight: 700
        background: #2b333b
        font-size: 12px
        &.highlight
          background: #00b43c
          color: #fff
    .ball
      position fixed;
      left: 32px
      bottom: 32px
      z-index:100
      width: 16px
      height: 16px
      border-radius 50%
      background: rgb(0,160,220)
    .ball-enter-active,.ball-leave-active
      transition: all ease .5s
      opacity 1
      transform translate3D(0,0,0) rotate(0)
    .ball-enter,.ball-leave-active
      opacity: 0
      transform translate3D(24px,0,0) rotate(360 deg)

  .shopcart-list
    font-size: 12px
    position: absolute
    left 0
    top 0
    z-index: 10
    width :100%
    transform translate3d(0,-100%,0)
    transition all ease 0.5s
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7,17,27,0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0,160,220)
    .list-content
      padding: 0 18px
      max-height 233px
      background: #fff
      overflow: hidden
      .food
        position: relative
        padding: 12px 0
        box-sizing border-box
        border-1px(rgba(7,17,27,0.1))
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right: 0
          bottom: 6px
  .slideup-enter-active,.slideup-leave-active
    transition all ease-out .35s
  .slideup-enter-active,.slideup-leave-active
    transform translate3d(0,0,0)


  .list-mask
    z-index: 9
    position: fixed
    top 0
    left:0
    width 100%
    height 100%
    background: rgba(7, 17, 27, 0.6)
    -webkit-backdrop-filter blur(10px)
    backdrop-filter blur(10px)
  .fade-enter-active,.fade-leave-active
    transition: all ease .5s
    opacity 1
  .fade-enter,.fade-leave-active
    opacity: 0

</style>
