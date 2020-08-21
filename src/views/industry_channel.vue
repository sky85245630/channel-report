<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="my-2">
          <v-btn color="primary">新增</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="data" :search="search">
          <template v-slot:item.management="{ item }">
            <!-- <v-simple-checkbox v-model="item.glutenfree" disabled></v-simple-checkbox> -->
            <v-btn color="primary" v-bind="item">修改</v-btn>
            <v-btn>匯出</v-btn>
            <v-btn color="error">刪除</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import industry_channel_data from "@/assets/data/industry_channel.json";
export default {
  name: "industryChannel",
  data: () => ({
    search: "",
    headers: [
      {
        text: "代碼",
        align: "start",
        sortable: false,
        value: "_id.$oid"
      },
      { text: "產業名稱", value: "name" },
      { text: "頻道數", value: "urls" },
      { text: "修改時間", value: "updated_at.$date" },
      { text: "管理", value: "management" }
    ],
    data: industry_channel_data,
  })
};
</script>