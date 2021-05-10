<template>
  <view class="container">
    <view class="game" v-if="playState != 3">
      <view class="head">
        <view class="vsContainer">
          <view>
            <image :src="side == 0 ? '../../static/img/red.png' : '../../static/img/blue.png'" mode="widthFix"></image>
          </view>
          <view class="vs">
            <text>VS</text>
          </view>
          <view>
            <image :src="side == 0 ? '../../static/img/blue.png' : '../../static/img/red.png'" mode="widthFix"></image>
          </view>
        </view>
        <view class="nameInput" v-if="playState == 0">
          <input class="uni-input" placeholder="A方-姓名" :value="players.a" data-key="a" @input='nameChange' />
          <input class="uni-input" placeholder="B方-姓名" :value="players.b" data-key="b" @input='nameChange' />
        </view>
      </view>
      <view class="ground" v-if="playState == 1 || playState == 2">
        <view class="outline" v-if="side == 0">
          <view class="play side">
            <view></view>
            <view></view>
            <view></view>
            <view></view>
          </view>
          <view class="play center">
            <view class="player">
              <view class="name">
                <text>{{players.a}}</text>
                <button type="default" size="mini" data-key="a" @click="serveBall" v-if="serve == ''">发球</button>
              </view>
              <view class="icon" v-if="serve == 'a'">
                <image src="../../static/img/dance.png" mode="widthFix"></image>
              </view>
            </view>
            <view></view>
            <view></view>
            <view class="player"></view>
          </view>
          <view class="play center">
            <view class="player"></view>
            <view></view>
            <view></view>
            <view class="player">
              <view class="name">
                <text>{{players.b}}</text>
                <button type="default" size="mini" data-key="b" @click="serveBall" v-if="serve == ''">发球</button>
              </view>
              <view class="icon" v-if="serve == 'b'">
                <image src="../../static/img/dance.png" mode="widthFix"></image>
              </view>
            </view>
          </view>
          <view class="play side last">
            <view></view>
            <view></view>
            <view></view>
            <view></view>
          </view>
          <view class="changeSide" @click="changeSide">交换场地</view>
        </view>

        <view class="outline" v-else>
          <view class="play side">
            <view></view>
            <view></view>
            <view></view>
            <view></view>
          </view>
          <view class="play center">
            <view class="player">

            </view>
            <view></view>
            <view></view>
            <view class="player">
              <view class="name">
                <text>{{players.a}}</text>
                <button type="default" size="mini" data-key="a" @click="serveBall" v-if="serve == ''">发球</button>
              </view>
              <view class="icon" v-if="serve == 'a'">
                <image src="../../static/img/dance.png" mode="widthFix"></image>
              </view>
            </view>
          </view>
          <view class="play center">
            <view class="player">
              <view class="name">
                <text>{{players.b}}</text>
                <button type="default" size="mini" data-key="b" @click="serveBall" v-if="serve == ''">发球</button>
              </view>
              <view class="icon" v-if="serve == 'b'">
                <image src="../../static/img/dance.png" mode="widthFix"></image>
              </view>
            </view>
            <view></view>
            <view></view>
            <view class="player"></view>
          </view>
          <view class="play side last">
            <view></view>
            <view></view>
            <view></view>
            <view></view>
          </view>
          <view class="changeSide" @click="changeSide">交换场地</view>
        </view>


      </view>
      <view class="toss" v-if="playState == 1">
        <view class="animation">
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
        <button type="default" size="default" @click="toss">
          {{ needToss ? '挑边' : '重置' }}
        </button>
      </view>
      <view class="score" v-if="playState == 2">
        <block v-if="side == 0">
          <view class="big-score">
            <view class="score-item">{{detail.awin}}</view>
            <view class="score-item">{{detail.bwin}}</view>
          </view>
          <view class="game-score">
            <view class="score-item" @click="scoreAction('a')">{{detail.athis}}</view>
            <view class="score-action">
              <text>第{{detail.huihe}}局</text>
            </view>
            <view class="score-item" @click="scoreAction('b')">{{detail.bthis}}</view>
          </view>
        </block>
        <block v-else>
          <view class="big-score">
            <view class="score-item">{{detail.bwin}}</view>
            <view class="score-item">{{detail.awin}}</view>
          </view>
          <view class="game-score">
            <view class="score-item" @click="scoreAction('b')">{{detail.bthis}}</view>
            <view class="score-action">
              <text>第{{detail.huihe}}局</text>
            </view>
            <view class="score-item" @click="scoreAction('a')">{{detail.athis}}</view>
          </view>
        </block>
      </view>
      <view class="foot">
        <button v-if="playState == 0" type="primary" size="default" @click="saveNames">下一步</button>
        <view v-if="playState == 1" class="button-group">
          <button type="primary" size="mini" @click="toChangeName">上一步</button>
          <button type="primary" size="mini" @click="start">开始计分</button>
        </view>
        <view v-if="playState == 2" class="button-group">
          <button :disabled="detail.athis == detail.bthis" type="default" size="mini" @click="gameOver">比赛结束</button>
          <button :disabled="detail.athis == detail.bthis" type="default" size="mini" @click="nextGame">下一局</button>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="head">
        <view class="vsContainer">
          <view>
            <image src="../../static/img/red.png" mode="widthFix"></image>
          </view>
          <view class="vs">
            <text class="result">{{detail.awin}} - {{detail.bwin}}</text>
          </view>
          <view>
            <image src="../../static/img/blue.png" mode="widthFix"></image>
          </view>
        </view>
      </view>
      <view class="result">
        <text class="title">详细赛况</text>
        <view class="score">
          <view class="big">
            <text class="red">{{detail.a_total_win}}</text>
            <text>总比分</text>
            <text class="red">{{detail.b_total_win}}</text>
          </view>
          <view class="item" v-for="score in detail.scores">
            <view class="name">{{players.a}}</view>
            <view class="blue-line"></view>
            <view class="score">{{score.a}}</view>
            <view class="vs">VS</view>
            <view class="score">{{score.b}}</view>
            <view class="blue-line"></view>
            <view class="name">{{players.b}}</view>
          </view>
          <view class="foot">
            <button type="primary" size="default" @click="playNew">再来一局</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        serve: '',

        tossResult: 0,
        animationMain: null,
        animationBack: null,
        mainStart: 180,
        backStart: 0,
        needToss: true,
        tossing: false,

        side: 0
      };
    },
    computed: {
      ...mapState('game1', ['playState', 'players', 'result', 'detail']),
      ...mapGetters('game1', ['detail']),
    },
    methods: {
      ...mapMutations('game1', ['updatePlayer', 'updatePlayState', 'updateScore', 'startNext', 'playNewGame']),
      // 修改选手姓名
      nameChange: function(e) {
        this.updatePlayer({
          key: e.target.dataset.key,
          value: e.detail.value
        })
      },
      // 修改状态为待开始
      saveNames: function() {
        this.updatePlayState(1)
      },
      // 接发球
      serveBall: function(e) {
        if (this.playState == 1 && this.needToss) {
          return this.msg('请先挑边！')
        }
        var who = e.target.dataset.key // 'a'  'b' 
        this.serve = who
      },
      // 重新录入姓名
      toChangeName: function() {
        this.updatePlayState(0)
      },
      // 开始比赛
      start: function() {
        if (!this.serve) {
          return this.msg('请先设置发球人！')
        }
        this.updatePlayState(2)
      },
      //计分
      scoreAction: function(winner) {
        if (!this.serve) {
          return this.msg('请先设置接发球')
        }
        this.serve = winner
        this.updateScore(winner)
      },
      // 下一局
      nextGame: function() {
        this.serve = ''
        this.startNext()
      },
      // 再来一局
      playNew: function() {
        uni.showModal({
          title: '提示',
          content: '确认开始新的比赛吗？请先截图保存结果哦！',
          success: (sm) => {
            if (sm.confirm) {
              // 用户点击了确定 可以调用删除方法了
              this.playNewGame()
            }
          }
        })

      },
      // 挑边
      toss: function(e) {
        if (this.tossing) return false
        this.tossing = true

        if (!this.needToss) {
          this.needToss = true
          this.serve.w = ''
        } else {
          this.needToss = false
          var result = Math.random() >= 0.5 ? 0 : 1
          this.tossResult = result
          // result: 0  应该展示红色
          // result: 1  应该展示蓝色
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
      },
      // 结束
      gameOver: function() {
        this.updatePlayState(3)
      },
      // 交换场地
      changeSide: function() {
        this.side = this.side == 0 ? 1 : 0
      },
      // 消息
      msg: function(content) {
        uni.showToast({
          title: content,
          icon: 'none',
          duration: 2000
        })
      }
    },
    onReady: function() {
      this.animation_main = uni.createAnimation({
        duration: 1200,
        timingFunction: 'linear'
      })
      this.animation_back = uni.createAnimation({
        duration: 1200,
        timingFunction: 'linear'
      })
    }
  }
</script>

<style lang="less">
  page {
    background-color: rgb(244, 244, 244);
  }

  view {
    box-sizing: border-box;
  }

  .container {
    margin-bottom: 100 px;

    .head {

      .vsContainer {
        padding: 30rpx;
        display: flex;
        justify-content: space-around;

        .vs {
          display: flex;
          align-items: center;
          font-size: 25px;
          font-weight: 700;

          .result {
            color: red;
          }
        }

        image {
          width: 90px;
        }
      }

      .nameInput {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        input {
          background-color: #fff;
          width: 300rpx;
          height: 40px;
          margin: 20rpx;
          padding-left: 15rpx;
        }
      }
    }

    .ground {
      margin-top: 20rpx;
      background-color: rgb(36, 153, 108);
      height: 450rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .outline {
        position: relative;
        height: 420rpx;
        width: 720rpx;
        border: 2px solid #fff;

        .changeSide {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          color: #fff;
          background-color: rgb(26, 173, 25);
          border-radius: 50%;
          height: 150rpx;
          width: 150rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
        }

        .play {
          display: flex;
          justify-content: space-between;

          &>view:nth-child(1) {
            flex: 3;
            border-right: 2px solid #fff;
          }

          &>view:nth-child(2) {
            flex: 1
          }

          &>view:nth-child(3) {
            flex: 1
          }

          &>view:nth-child(4) {
            flex: 3;
            border-left: 2px solid #fff;
          }
        }

        .side {
          height: 49rpx;
          border: 1px solid #fff;
          border-top: 0px;
        }

        .center {
          height: 160rpx;
          border: 1px solid #fff;
        }

        .player {
          display: flex;
          justify-content: space-around;
          font-size: 18px;

          .name {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            text {
              font-weight: 700;
            }
          }

          .icon {
            display: flex;
            flex-direction: column;
            justify-content: center;

            image {
              width: 50rpx;
            }
          }
        }
      }
    }

    .toss {
      padding: 10rpx;

      .animation {
        -webkit-perspective: 1500; //子元素获得透视效果
        -moz-perspective: 1500;
        width: 200rpx;
        height: 200rpx;
        margin: 15rpx auto;

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
          background-color: rgb(244, 244, 244);
        }
      }
    }

    .score {
      .big-score {
        display: flex;
        justify-content: space-around;

        .score-item {
          margin-top: 30rpx;
          width: 120rpx;
          height: 120rpx;
          border: 1px solid black;
          font-size: 25px;
          font-weight: 400;
          line-height: 120rpx;
          text-align: center;
        }
      }

      .game-score {
        display: flex;
        justify-content: space-around;

        .score-item {
          margin-top: 30rpx;
          width: 200rpx;
          height: 200rpx;
          border: 1px solid black;
          font-size: 25px;
          font-weight: 400;
          line-height: 200rpx;
          text-align: center;
        }

        .score-action {
          display: flex;
          align-items: center;
          font-size: 25px;
          font-weight: 700;
        }
      }
    }

    .foot {
      border-top: 1px solid #ccc;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 750rpx;
      height: 50 px;
      padding: 10rpx;

      .button-group {
        display: flex;
        justify-content: space-between;
      }
    }

    .result {
      padding: 20rpx;

      .title {
        font-size: 16px;
        font-weight: 700;
        line-height: 40px;
      }

      .score {
        border-top: 2px solid rgb(234, 234, 234);

        .big {
          height: 40px;
          text-align: center;
          line-height: 40px;
          margin: 20px 0;
          font-size: 22px;
          font-weight: 700;
          color: rgb(80, 80, 80);

          text {
            margin: 0 30rpx;
          }

          .red {
            color: red;
          }
        }

        .item {
          display: flex;
          justify-content: space-around;
          height: 100rpx;
          margin: 15rpx 0;
          align-items: center;

          .name {
            color: rgb(80, 80, 80);
            font-size: 18px;
          }

          .blue-line {
            width: 50px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgb(77, 190, 240);
            border-left: none;
          }

          .score {
            color: red;
            font-size: 20px;
            font-weight: 700;
          }

          .vs {
            font-style: italic;
            color: #acacac;
          }
        }
      }
    }
  }
</style>
