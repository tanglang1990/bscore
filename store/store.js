import Vue from 'vue'
import Vuex from 'vuex'
import moduleGame from '@/store/game.js'
import moduleGame1 from '@/store/game1.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    'game': moduleGame,
    'game1': moduleGame1
  }
})

export default store
