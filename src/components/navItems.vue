<template>
  <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">

    <v-list-item v-for="item in navList" :key="item.name">
      <v-list-item-title>
        <router-link :to="item.link">
          <span class="title">{{item.name}}</span>
        </router-link>
      </v-list-item-title>
    </v-list-item>

  </v-list-item-group>
</template>
<script>
export default {
  name: "navItems",
  props: [],
  data: () => ({
    group:null,
    navList:[
      {
        'link':'/pro-generator',
        'name':'i-Buzz 探網格式產生器'
      },
      {
        'link':'/reset-channel-pro',
        'name':'PRO 頻道排序重整器'
      },
      {
        'link':'/channelManagement',
        'name':'頻道管理（施工中）'
      }
    ]
  })
};
</script>