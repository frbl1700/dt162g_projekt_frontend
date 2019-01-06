import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'image-app',
    storage: localStorage
});

Vue.use(Vuex);

export default new Vuex.Store ({
    strict: true,

    plugins: [vuexPersist.plugin],

    state: {
        userId: '',
        isSignedIn: false
    },

    mutations: {
        setUser(state, userId) {
            state.userId = userId;
            state.isSignedIn = true;

            //console.log('sparade state', userId);
        },
        unsetUser(state) {
            state.userId = '';
            state.isSignedIn = false;
        }
    },

    actions: {
        setUser({commit}, userId) {
            commit('setUser', userId);
        },
        unsetUser({commit}) {
            commit('unsetUser');
        }
    }
});