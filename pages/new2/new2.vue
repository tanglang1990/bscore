<template>
  <view>
    <view class="animation">
     测试页面
      <view class="box front" :animation="animationMain" @click='rotateFn' data-id="1">
        <image src="../../static/img/red.png" mode="widthFix"></image>
      </view>
      <view class="box back" :animation="animationBack" @click='rotateFn' data-id="2">
        <image src="../../static/img/blue.png" mode="widthFix"></image>
      </view>
      <view class="box logo" @click='rotateFn' data-id="2" v-if="needToss">
        <image src="../../static/img/ymq.png" mode="widthFix"></image>
      </view>
    </view>
    <view class="toss">
      <button type="primary" size="default" @click="toss">
        {{ needToss ? '挑边' : '重置' }}
      </button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        animationMain: null,
        animationBack: null,
        mainStart: 180,
        backStart: 0,
        tossResult: 0,
        needToss: true,
        tossing: false
      };
    },
    methods: {
      toss(e) {
        if(this.tossing) return false
        this.tossing = true
        
        if (!this.needToss) {
          this.needToss = true
        } else {
          this.needToss = false
          var result =  Math.random() >= 0.5 ? 0 : 1
          console.log('0红色，1蓝色 结果是' + result)
          this.tossResult = result
          
          // result: 0  应该展示红色
          // result: 1  应该展示蓝色
          this.animation_main = uni.createAnimation({
            duration: 1200,
            timingFunction: 'linear'
          })
          this.animation_back = uni.createAnimation({
            duration: 1200,
            timingFunction: 'linear'
          })
          // 点击正面
          this.mainStart += 1260
          this.backStart += 1260
          if (this.tossResult == 0 && (this.mainStart / 180) % 2 == 1) {
            this.mainStart += 180
            this.backStart += 180
          }

          this.animation_main.rotateY(this.mainStart).step()
          this.animation_back.rotateY(this.backStart).step()
          this.animationMain = this.animation_main.export()
          this.animationBack = this.animation_back.export()
        }
        
        this.tossing = false
      }
    }

  }
</script>

<style lang="less">
  .animation {
    -webkit-perspective: 1500; //子元素获得透视效果
    -moz-perspective: 1500;
    width: 200rpx;
    height: 200rpx;
    margin: 10rpx auto;

    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 200rpx;
      height: 200rpx;
      transition: all 1s;
      backface-visibility: hidden;
      border-radius: 10px;

      image {
        width: 200rpx;
      }
    }

    .front {}

    .back {
      transform: rotateY(-150deg);
    }

    .logo {
      z-index: 999;
      background-color: rgb(255, 255, 255);
    }
  }

  .toss {
    padding: 10rpx;
  }
</style>
