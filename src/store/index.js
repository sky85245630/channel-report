import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    access_token:null,
    refresh_token:null,
    user_name:''
}

const mutations = {
    SET_TOKEN(state, data){
        state.access_token = data
    },
    SET_REFRESH_TOKEN(state, data){
        state.refresh_token = data
    },
    SET_USER(state, data){
        state.user_name = data
    }
}

const actions = {
    handle_username(context, username){
        setTimeout(()=>{
            context.commit('SET_USER', username)
        },1)
    },
    handle_refresh(context, token){
        setTimeout(()=>{
            context.commit('SET_REFRESH_TOKEN', token)
        },1)
    },
    handle_login (context, token){
        setTimeout(()=>{
            context.commit('SET_TOKEN', token)
        },1)
        
    },
}


const getters = {
    getToken(state){
        return state.access_token
    },
    getFullName(state){
        return state.user_name
    }
}

export default new Vuex.Store({
    state, 
    mutations,
    actions,
    getters
})