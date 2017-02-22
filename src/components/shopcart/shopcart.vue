<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{highlight:totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{hightlight:enough}">￥{{minPrice}}元起送</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
          return `另需配送费￥${this.deliveryPrice}`;
        } else if (this.totalPrice < this.minPrice) {
          const diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}`;
        } else {
          return '去结算';
        }
      },
      enough() {
        if (this.totalPrice === 0 || this.totalPrice < this.minPrice) {
          return false;
        }
        return true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
</style>
