import Vue        from 'vue'
import Vuex       from 'vuex'
import actions    from '@/js/store/actions'
import mutations  from '@/js/store/mutations'
import getters    from '@/js/store/getters'
import state      from '@/js/store/state';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
