<template>
  <view class="container">
    <view class="iconContainer">
      <image src="../../static/img/ymq.png" mode="widthFix"></image>
    </view>
    <view class="btnContainer">
      <navigator class="navBtn left" url="../play1/play1">单打</navigator>
      <navigator class="navBtn right" url="../play/play">双打</navigator>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="less">
  .container {
    .iconContainer {
      margin: 150rpx 0;
      display: flex;
      justify-content: center;

      image {
        width: 400rpx;
      }
    }

    .btnContainer {
      display: flex;
      justify-content: space-around;

      .navBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300rpx;
        height: 300rpx;
        font-size: 18px;
        color: #fff;
        border-radius: 10rpx;
      }

      .left {
        background-color: rgb(105, 192, 58);
      }

      .right {
        background-color: rgb(65, 157, 255);
      }
    }
  }
</style>
