import Vue from 'vue'
import VueRouter from 'vue-router'
import ProGenerator from '@/views/ChannelData.vue'
import Tag from '@/views/Tag.vue'
import ResetChannel from '@/views/ResetChannel'
import industryChannel from '@/views/industry_channel'
import login from '@/views/Login'
import channelManagement from '@/views/channelManage'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'landing page',
      path: '/',
      component: login
    },
    {
      name: 'reset-channel-pro',
      path: '/reset-channel-pro',
      component: ResetChannel
    },
    {
      name: 'pro-generator',
      path: '/pro-generator',
      component: ProGenerator
    },
    {
      name: 'tag',
      path: '/tag',
      component: Tag
    },
    {
      name: 'industryChannel',
      path: '/industryChannel',
      component: industryChannel
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name:'channelManagement',
      path:'/channelManagement',
      component: channelManagement
    },
  ]
})