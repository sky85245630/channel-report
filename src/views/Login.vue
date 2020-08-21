<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>使用者登入</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="帳號"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="密碼"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">登入</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Axios from "axios";
import store from '../store'
export default {
  name: "login",
  data: () => ({
    username: "",
    password: ""
  }),
  updated: function(){
    // console.log(store.getters.getFullName)
    // console.log(store.getters.getToken)
  },
  methods: {
    login: function() {
      let user_id = null
      let user_secret = null
      let full_name = null
      let access_token = null
      let refresh_token = null
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
      let body = {
        username: this.username,
        password: this.password
      };
      Axios
        .post(
            "https://api.i-buzz-system.com/basic/login",
            body,
            config
        )
        .then(response => {

            user_id = response.data.user_id
            user_secret = response.data.user_secret
            full_name = response.data.full_name

            store.dispatch('handle_username', full_name)
            // store.commit('SET_USER', full_name)
            
            // console.log(user_id)
            // console.log(user_secret)
            // console.log(full_name)

            Axios
                .post(
                    "https://api.i-buzz-system.com/basic/token_with_refresh",
                    {"user_id":user_id, "user_secret":user_secret},
                    config
                )
                .then(response => {
                    access_token = response.data.access_token
                    refresh_token = response.data.refresh_token
                    store.dispatch('handle_login', access_token)
                    store.dispatch('handle_refresh', refresh_token)
                    this.$router.replace('/pro-generator')
                    // console.log(access_token)

                })
                .catch(error =>{
                    console.log(error)
                })
        })
        .catch(error => {
            console.log(error)
        })
    }
  }
};
</script>