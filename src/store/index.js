import Vue from "vue";
import Vuex from "vuex";

import auth from './modules/auth'
import question from './modules/question'
import level from './modules/level'
import resource from './modules/resource'
import answer from './modules/answer'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    question,
    level,
    resource,
    answer
  },
});
