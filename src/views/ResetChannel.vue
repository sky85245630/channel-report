<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="display-1">PRO 頻道排序重整器</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1 class="headline">使用說明</h1>
        <p class="body-1">每個頻道之間的空白行數請勿超過一行，否則程式解析會出錯。<br />若發現解析結果怪怪的，請優先檢查是否有兩行空白</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea label="頻道資料" auto-grow v-model="channel_data"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea label="重整頻道資料" auto-grow :value="reset_data"></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ResetChannel",
  data: () => ({
    channel_data: "",
    website_count: null,
  }),
  computed: {
    reset_data: function() {
      if (this.channel_data) {
        // 要輸出的修正格式
        var fixed_data = ""
        var parsed_ini_data = []
        var raw_data = this.channel_data

        // Delete last two newline characters if exist
        var lastNewLine = /\n\n$/;
        raw_data = raw_data.replace(lastNewLine, '');

        var temp_data = raw_data.split('\n\n')        
        // temp_data[0] is count.網站
        // temp_data[1:] is every channel

        var ini = require("ini");

        for (var n=0; n<temp_data.length; n++){
          var config = ini.decode(temp_data[n])
          parsed_ini_data.push(config)
        }
        parsed_ini_data.shift();
        var channel_count = parsed_ini_data.length

        fixed_data = fixed_data.concat("count.網站=" + channel_count + "\n\n");
        
        // console.log(Object.keys(parsed_ini_data[1]))
        for (var m=0; m<parsed_ini_data.length; m++){
          let channel_name = Object.values(parsed_ini_data[m])[0]
          fixed_data = fixed_data.concat(
            "網站_" + m + "=" + channel_name + "\n"
          )
          fixed_data = fixed_data.concat(
          channel_name + "_名稱=" + parsed_ini_data[m][channel_name+'_名稱'] + "\n"
          )
          fixed_data = fixed_data.concat(
          channel_name + "_網站=" + parsed_ini_data[m][channel_name+'_網站'] + "\n"
          )
          fixed_data = fixed_data.concat(
          channel_name + "_型式=" + parsed_ini_data[m][channel_name+'_型式'] + "\n"
          )
          fixed_data = fixed_data.concat(
          channel_name + "_圖檔=" + parsed_ini_data[m][channel_name+'_圖檔'] + "\n"
          )
          fixed_data = fixed_data.concat(
          channel_name + "_頻道=" + parsed_ini_data[m][channel_name+'_頻道'] + "\n\n"
          )
            
        }
        return fixed_data;
      } else {
        return "";
      }
    }
  }
};
</script>

