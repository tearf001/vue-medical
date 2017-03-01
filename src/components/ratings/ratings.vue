<template>
  <div class="ratings" id="ratings-hook">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :select-type = "selectType"
        :only-content = "onlyContent"
        :desc = "desc"
        :ratings= "ratings"
        v-on:ratingtype-select="ratingTypeSelect"
        v-on:content-toggle="contentToggle"
      ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" height="28" width="28" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | rormatDate }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment';
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import BScroll from 'better-scroll';
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.$http.get('/api/ratings').then(response => {
        response = response.json().then(res => {
          if (res.errno === ERR_OK) {
            this.ratings = res.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(document.getElementById('ratings-hook'), {
                click: true
              });
            });
          }
        });
      });
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    methods: {
      ratingTypeSelect(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      contentToggle(value) {
        this.onlyContent = value;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    filters: {
      rormatDate(time) {
        return moment(time).format('YYYY-MM-DD h:mm:ss');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    .ratings-content
      .overview
        display: flex
        padding: 18px 0
        .overview-left
          flex 0 0 137px
          width 137px
          border-right: 1px solid rgba(7,17,27,0.1)
          text-align: center
          padding-bottom: 6px
          padding-top: 6px
          @media only screen and (max-width:320px)
            flex 0 0 120px
            width: 120px
          .score
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
            margin-bottom: 6px
          .title
            margin-bottom: 8px
            line-height: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .rank
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
        .overview-right
          flex 1
          padding: 6px 0 6px 24px
          @media only screen and (max-width:320px)
            padding: 6px 0 6px 6px
          .score-wrapper
            line-height: 18px
            margin-bottom: 8px
            font-size 0
            .title
              font-size: 12px
              color: rgb(7, 17, 27)
              vertical-align: top
              line-height: 18px
            .star
              display: inline-block
              vertical-align: top
              margin:0 12px
            .score
              display: inline-block
              vertical-align: top
              font-size: 12px
              color: rgb(255,153,0)
          .delivery-wrapper
            font-size: 0
            .title
              font-size: 12px
              color: rgb(7, 17, 27)
              line-height: 18px
            .delivery
              font-size: 12px
              color: rgb(147, 153, 159)
              margin-left: 12px

      .rating-wrapper
        padding: 0 18px
        .rating-item
          display: flex
          padding: 18px 0
          border-1px(rgba(7,17,27,0.1))
          .avatar
            flex 0 0 28px
            width: 28px
            margin-right: 12px
            img
              border-radius 50%
          .content
            flex 1
            position: relative
            .name
              font-size: 10px
              line-height: 12px
              color: rgb(7,17,27)
              margin-bottom: 4px
            .star-wrapper
              margin-bottom: 6px
              font-size:0
              .star
                display: inline-block
                vertical-align: top
                margin-right: 6px
              .delivery
                display: inline-block
                vertical-align: top
                font-size: 10px
                line-height: 12px
                color: rgb(147,153,159)
            .text
              font-size: 12px
              color: rgb(7,17,27)
              line-height: 18px
              margin-bottom: 8px
            .recommend
              line-height: 16px
              color: rgb(147,153,159)
              font-size: 0
              .icon-thumb_up,.item
                display: inline-block
                margin: 0 8px 4px 0
                font-size: 9px
              .icon-thumb_up
                color: rgb(0, 160, 220)
              .item
                border: 1px solid rgba(7,17,27,0.1)
                padding: 0 6px
                border-radius 1px
            .time
              position: absolute
              top: 0
              right: 0
              font-size: 10px
              line-height: 12px
              color: rgb(147,153,159)
</style>
