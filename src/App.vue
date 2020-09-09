<template>
<v-app>

    <v-content>
        <router-view></router-view>
    </v-content>
    <!-- footer -->
    <customFooter></customFooter>
</v-app>
</template>

<script>
import customFooter from "@/components/customFooter";
// import navItems from "@/components/navItems";
// import updateBtn from "@/components/updateButton";
import store from "./store";
import Axios from "axios";

export default {
    name: "App",

    components: {
        customFooter,
        // navItems,
        // updateBtn
    },

    data: () => ({
        drawer: false,
        if_logged: false,
        user: ''
    }),
    mounted: function () {

    },
    created() {
        this.login();
    },
    beforeUpdate: function () {

        this.user = store.getters.getFullName
        if (this.user === '') {
            this.if_logged = false
        } else {
            this.if_logged = true
        }
    },
    methods: {
        login: function () {
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
                username: 'tanwang',
                password: 'xGnFZ2'
            };
            Axios
                .post(
                    "https://api.i-buzz-system.com/basic/login",
                    body,
                    config
                )
                .then(response => {
                    console.log(response)
                    console.log(response)
                    console.log(response)
                    user_id = response.data.user_id
                    user_secret = response.data.user_secret
                    full_name = response.data.full_name
                    console.log(user_id, user_secret, full_name)
                    store.dispatch('handle_username', full_name)
                    // store.commit('SET_USER', full_name)

                    // console.log(user_id)
                    // console.log(user_secret)
                    // console.log(full_name)

                    Axios
                        .post(
                            "https://api.i-buzz-system.com/basic/token_with_refresh", {
                                "user_id": user_id,
                                "user_secret": user_secret
                            },
                            config
                        )
                        .then(response => {
                            access_token = response.data.access_token
                            refresh_token = response.data.refresh_token
                            store.dispatch('handle_login', access_token)
                            store.dispatch('handle_refresh', refresh_token)
                            // this.$router.replace('/channelManagement')
                            // console.log(access_token)

                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        logOut: function () {
            store.dispatch('handle_username', '')
            store.dispatch('handle_login', '')
            store.dispatch('handle_refresh', '')
            this.$router.replace('/login')
        },
        redirectToLogin: function () {
            // this.$router.replace('/login')
        },

    }
};
</script>
