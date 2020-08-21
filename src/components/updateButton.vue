<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">更新內容</v-btn>
    </template>
    <!-- 更新內容 -->
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>更新內容</v-card-title>

      <v-card-text>
        <span v-html="update_items"></span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">知道了</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "updateBtn",
  data: () => ({
    dialog: false,
    update_items:
      "\
      2020-06-19\t新增登入介面<br />\
      2020-06-19\t改使用 MongoDB 頻道資料<br />\
      2020-05-28\t新增篩選已選取頻道功能<br />\
      2020-05-28\t修復左側選單消失問題<br />\
      2020-05-28\t重新命名頁面標題<br />\
      2020-05-28\t修復過濾器無效問題<br />\
      2020-05-27\t重新排序頻道功能完成<br />\
      2020-05-27\t刪除count.網站頻道<br />\
      2020-05-27\t修復無法顯示重新送出狀態<br />\
      2020-05-27\t新增狀態過濾選項<br />\
      2020-05-27\t手動更新頻道列表<br />\
      2020-05-22\t增加讀取圈提示資料存取中<br />\
      2020-05-21\t修正送出鈕行為<br />\
      2020-05-20\t增加左側導覽列<br />\
      2020-05-19\t新增 PRO 範例檔案<br />\
      2020-05-18\t呼叫轉檔ＡＰＩ並於頁面提供下載<br />\
      2020-05-15\t更新頻道數字計算錯誤<br /> \
      2020-05-14\t新增網站以及型式過濾器<br /> \
      "
  })
};
</script>