<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div>
          <v-btn class="ma-2" tile color="primary" @click.stop="edit_dialog = true">新增</v-btn>
          <v-btn class="ma-2" tile>
            <v-icon left>mdi-pencil</v-icon>編輯
          </v-btn>
          <v-btn class="ma-2" tile color="error">刪除</v-btn>
        </div>
        <!-- 編輯內容 -->
        <v-dialog v-model="edit_dialog" max-width="500">
          <v-card>
            <v-card-title class="headline">新增</v-card-title>
            <v-card-text>
              <p class="title text--primary">屬性名稱</p>
              <v-text-field label="新增" placeholder="子標籤" outlined v-model="new_child_tag"></v-text-field>
              <v-select :items="parent_tags" label="選擇" solo v-model="selected_parent_tag"></v-select>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="edit_dialog = false; saveChildTag()">儲存</v-btn>

              <v-btn color="grey" text @click="edit_dialog = false">取消</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" v-for="tag in tags" :key="tag.parent_tag">
        <v-card outlined>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="h6 font-weight-black">{{tag.parent_tag}}（{{tag.child_tags.length}}）</v-list-item-title>
              <v-list-item-subtitle
                class="subtitle-1"
                v-for="child_tag in tag.child_tags"
                :key="child_tag"
              >{{child_tag}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Tags from "@/assets/data/tag.json"
export default {
  name: "Tag",

  data: () => ({
    edit_dialog: false,
    new_child_tag: '',
    selected_parent_tag: null,
    tags: Tags
  }),
  computed: {
      parent_tags: function() {
          var result = []
          for (var n=0; n<this.tags.length; n++) {
              result.push(this.tags[n].parent_tag)
          }
          return result
      }
  },
  methods: {
      saveChildTag: function () {
          for (var m=0; m<this.tags.length; m++) {
              if (this.selected_parent_tag == this.tags[m].parent_tag) {
                  this.tags[m].child_tags.push(this.new_child_tag)
              }
          }
          this.new_child_tag = ''
      }
  }
};
</script>