<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item border-1px">
        <router-link to="/goods" class="tab-item-link">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="tab-item-link">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="tab-item-link">商家</router-link>
      </div>
    </div>
    <router-view class="content" :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  // 数据中表名状态的代码，0时表示无错误
  const ERR_OK = 0;

  import header from './components/header/header.vue';
  export default {
    components: {
      'v-header': header
    },
    created() {
      this.$http.get('/api/seller').then(response => {
        response = response.json().then(res => {
          if (res.errno === ERR_OK) {
            this.seller = res.data;
          }
        });
      });
    },
    data() {
      return {
        seller: {}
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  #app
    .tab
      display:flex
      width :100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex:1
        text-align: center
        .tab-item-link
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
        .active
          color: rgb(240, 20, 20)

</style>
