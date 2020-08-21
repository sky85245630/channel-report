<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app bottom temporary>
      <v-list nav>
        <!-- 左側導覽列上方 -->
        <template v-if="if_logged === true">
          <v-list-item two-line>
            <!-- 使用者 avatar -->
            <v-list-item-avatar>
              <v-avatar color="red">
                <span class="white--text headline">{{ user[0] }}</span>
              </v-avatar>
            </v-list-item-avatar>
            <!-- avatar 旁邊的字 -->
            <v-list-item-content>
              <v-list-item-title>{{user}}</v-list-item-title>
              <v-btn small color="primary" @click="logOut">登出</v-btn>
              <!-- <v-list-item-subtitle><span @click="logOut">登出</span> </v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>
          <!-- 沒登入時使用的元件 -->
        </template>
        <template v-if="if_logged === false">
          <v-list-item two-line>
            <!-- <v-btn large color="primary" href="./login">登入</v-btn> -->
            <v-btn large color="primary" @click="redirectToLogin">登入</v-btn>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <!-- 選單 -->
        <navItems></navItems>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="iBuzz Logo"
          class="shrink mr-2"
          contain
          src="./assets/ibuzz_logo.jpeg"
          transition="scale-transition"
          width="50"
        />
      </div>
      <v-toolbar-title class="headline">i-Buzz 探網格式產生器</v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- 查看更新內容鈕 -->
      <updateBtn></updateBtn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- footer -->
    <customFooter></customFooter>
  </v-app>
</template>

<script>
import customFooter from "@/components/customFooter";
import navItems from "@/components/navItems";
import updateBtn from "@/components/updateButton";
import store from "./store";

export default {
  name: "App",

  components: {
    customFooter,
    navItems,
    updateBtn
  },

  data: () => ({
    drawer: false,
    if_logged: false,
    user: ''
  }),
  mounted: function(){
    
  },
  beforeUpdate: function() {
    this.user = store.getters.getFullName
    if (this.user === '') {
      this.if_logged=false
    }else{
      this.if_logged = true
    }
    if (this.user === '' || this.user === 'John Doe'){
      this.$router.replace('/login')
    }
  },
  methods:{
    logOut: function(){
      store.dispatch('handle_username', '')
      store.dispatch('handle_login', '')
      store.dispatch('handle_refresh', '')
      this.$router.replace('/login')
    },
    redirectToLogin: function(){
      this.$router.replace('/login')
    }
  }
};
</script>
