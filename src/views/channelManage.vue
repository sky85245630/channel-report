<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-select :items="countries" label="Standard"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="channels"
          :single-select="false"
          :search="search"
          item-key="_id.$oid"
          show-select
          multi-sort
          class="elevation-1"
          :footer-props="{
              itemsPerPageOptions: [10,25,50,75,100]
          }"
        ></v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="my-2">
          <v-btn>下一頁</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Axios from "axios";
import store from "@/store";
import channels from "@/assets/data/channelManage.json";
export default {
  name: "channel_management",
  data: () => ({
    channels: null,
    countries:['台灣', '香港', '泰國', '越南', '印尼', '菲律賓', '新加坡'],
    selected: null,
    search: "",
    page: 1,
    headers: [
      {
        text: "id",
        align: "start",
        sortable: false,
        value: "_id.$oid",
        filterable: false
      },
      { text: "網站名稱", value: "website" },
      { text: "頻道名稱", value: "name" },
      { text: "中文名稱", value: "display_name" },
      { text: "型式", value: "type" },
      { text: "url", value: "channel_url" },
      { text: "國家", value: "country" },
      { text: "類型", value: "media_type" }
    ]
  }),
  beforeMount: function() {
    // this.channels = this.getChannelData();
    this.channels = channels;
  },
  methods: {
    getChannelData: function() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + store.getters.getToken
        }
      };
      Axios.get(
        // "http://api.i-buzz-system.com/basic/channels?country=TW&limit=100&with_inustry=true",
        "https://api.i-buzz-system.com/basic/channels?country=TW",
        config
      )
        .then(response => {
          this.channels = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>