<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" @click="select(2,$event)" :class="{'active':selectTypeCopy === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':selectTypeCopy === 0}">{{desc.positive}}<span class="count">{{positiveCount.length}}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':selectTypeCopy === 1}">{{desc.negative}}<span class="count">{{negativeCount.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContentCopy}" @click="toggleContent($event)">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data() {
      return {
        selectTypeCopy: this.selectType,
        onlyContentCopy: this.onlyContent
      };
    },
    computed: {
      positiveCount() {
        return this.ratings.filter((item) => {
          return item.rateType === POSITIVE;
        });
      },
      negativeCount() {
        return this.ratings.filter((item) => {
          return item.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectTypeCopy = type;
        this.$emit('ratingtype-select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContentCopy = !this.onlyContentCopy;
        this.$emit('content-toggle', this.onlyContentCopy);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin"

  .ratingselect
    .rating-type
      padding: 18px 0
      margin:0 18px
      border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        border-radius 2px
        margin-right: 8px
        color: rgb(77,85,93)
        font-size: 12px
        line-height: 16px
        &.active
          color: #fff
        .count
          font-size: 8px
          margin-left: 2px
        &.positive
          background: rgba(0,160,220,0.2)
          &.active
            background: rgb(0,160,220)
        &.negative
          background: rgba(77,81,93,0.2)
          &.active
            background: rgb(0,160,220)


    .switch
      padding: 12px 18px
      line-height: 24px
      color: rgb(147,153,159)
      border-bottom: 1px solid rgba(7,17,27,0.1)
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        /*margin-right: 4px*/
        font-size: 24px
        vertical-align: middle
      .text
        font-size: 12px

</style>
