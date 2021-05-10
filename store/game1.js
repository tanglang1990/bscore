export default {
  // 开启命名空间
  namespaced: true,
  state: () => ({
    playState: uni.getStorageSync('playState1') || 0,
    players: uni.getStorageSync('players1') || {
      "a": "",
      "b": ""
    },
    result: uni.getStorageSync('result1') || [{
      "isover": false,
      "scores": []
    }]
  }),
  // 方法
  mutations: {
    // 修改姓名
    updatePlayer(state, update) {
      state.players[update.key] = update.value
      this.commit('game1/savePlayerToStorage')
    },
    savePlayerToStorage(state) {
      uni.setStorageSync('players1', state.players)
    },
    // 修改状态
    updatePlayState(state, newState) {
      if (newState == 1) {
        for (var nameKey in state.players) {
          if (!state.players[nameKey]) {
            state.players[nameKey] = nameKey.toUpperCase()
          }
        }
        this.commit('game1/savePlayerToStorage')
      }
      if (newState == 3) {
        var last_game = state.result[state.result.length - 1]
        last_game.isover = true
        this.commit('game1/savePlayResultToStorage')
      }
      state.playState = newState
      this.commit('game1/savePlayStateToStorage')
    },
    savePlayStateToStorage(state) {
      uni.setStorageSync('playState1', state.playState)
    },
    savePlayResultToStorage(state) {
      uni.setStorageSync('result1', state.result)
    },
    // 记录比分
    updateScore(state, winner) {
      var last_game = state.result[state.result.length - 1]
      if (!last_game.isover) {
        last_game.scores.push(winner)
      } else {
        state.result.push({
          isover: false,
          scores: [winner]
        })
      }
      this.commit('game1/savePlayResultToStorage')
    },
    // 开始下一局
    startNext(state) {
      var last_game = state.result[state.result.length - 1]
      last_game.isover = true
      state.result.push({
        isover: false,
        scores: []
      })
      this.commit('game1/savePlayResultToStorage')
    },
    // 重新玩
    playNewGame(state) {
      state.playState = 0
      state.players = {
        "a": "",
        "b": "",
      }
      state.result = [{
        "isover": false,
        "scores": []
      }]
      uni.clearStorageSync()
      
    }
  },

  getters: {
    // 比分详情
    detail(state) {
      var result = {
        huihe: 1,
        awin: 0,
        bwin: 0,
        a_total_win: 0,
        b_total_win: 0,
        athis: 0,
        bthis: 0,
        scores: []
      }
      if (!state.result.length) return result
      state.result.forEach((game) => {
        console.log(game)
        var acount = 0
        var bcount = 0
        game.scores.forEach((item) => {
          if (item == 'a') {
            acount++
          } else {
            bcount++
          }
        })
        if (game.isover) {
          result.huihe += 1
          if (acount > bcount) {
            result.awin++
          } else {
            result.bwin++
          }
          result.a_total_win += acount
          result.b_total_win += bcount
          result.scores.push({
            a: acount,
            b: bcount
          })
        }
      })
      var last_game = state.result[state.result.length - 1]
      if (!last_game.isover) {
        last_game.scores.forEach((item) => {
          if (item == 'a') {
            result.athis++
          } else {
            result.bthis++
          }
        })
      }
      return result
    }
  }
}
