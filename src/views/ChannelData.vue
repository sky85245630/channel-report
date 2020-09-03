<template>
<v-container>
    <v-row>
        <v-col>
            <h1 class="display-1">i-Buzz 探網格式產生器</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="2">
            <v-select :items="['fb', 'ig']" label="報表種類" v-model="report_type">
                <template v-slot:item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                        <v-list-item-title :id="attrs['aria-labelledby']" v-text="item"></v-list-item-title>
                    </v-list-item>
                </template>
            </v-select>
        </v-col>
        <v-col cols="2">
            <v-text-field :rules="rules" placeholder="請輸入檔案名稱" v-model="file_name"></v-text-field>
        </v-col>
        <v-col cols="2">
            <v-menu
                v-model="report_start1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="report_start"
                    label="開始時間"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="report_start" @input="report_start1 = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="2">
            <v-menu
                v-model="report_end1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="report_end"
                    label="開始時間"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="report_end" @input="report_end1 = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="2">
            <div class="my-2">
                <v-btn depressed large @click.prevent="sendYAYA">送出</v-btn>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table v-model="selected" :headers="headers" :items="data" :single-select="false" :search="search" item-key="tkfc_name" show-select multi-sort class="elevation-1" :footer-props="{
              itemsPerPageOptions: [10,25,50,75,100]
          }"></v-data-table>
        </v-col>
    </v-row>
    <!-- 這邊放選擇的結果（ini） -->
    <v-row>
        <v-textarea name="input-7-1" filled label="OUTPUT" auto-grow :value="selected_ini"></v-textarea>
    </v-row>
    <v-row>
        <v-col>
            <v-alert type="warning" v-if="selected_num == 0 ">您並未選擇頻道</v-alert>
            <v-alert type="warning" v-if="selected_num > 1000 ">您選了超過 1000 個頻道</v-alert>
        </v-col>
    </v-row>
    <!-- 已選頻道列表 -->
    <v-row>
        <v-col>
            <div class="text-center pb-2">
                <v-btn color="normal" @click="showShortSelectedChannels=!showShortSelectedChannels">{{ showShortSelectedChannels? "關閉":"顯示"}}已選頻道</v-btn>
            </div>
            <v-card class="mx-auto" outlined v-if="showShortSelectedChannels">
                <v-card-text>
                    <v-chip class="ma-2" close @click:close="removeChannel($event, channel.tkfc_name)" v-for="(channel, index) in selected" :key="index" v-bind:class="{'pink lighten-3': channel.tw_status === false, 'indigo lighten-3': channel.tw_status === true}">{{channel.display_name}}</v-chip>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <!-- 已選頻道列表結束 -->
    <v-row>
        <v-col>
            <div>
                <a href="http://api.i-buzz-system.com/load-data/downloads/inner-tool/bangyan-sample.xlsx">PRO 範例檔案</a>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <v-file-input accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" label="PRO excel 檔案" v-model="file"></v-file-input>
        </v-col>
        <v-col cols="2">
            <div class="my-2">
                <v-btn color="primary" id="sendData" @click="sendData" :disabled="sendBtnStatus">送出</v-btn>
                <v-progress-circular class="ma-2" indeterminate color="amber" v-if="showLoadingBar"></v-progress-circular>
            </div>
        </v-col>
        <v-col cols="6">
            <div v-if="errorMessage">
                <p class="body-1">
                    <span v-html="errorMessage"></span>
                </p>
            </div>
            <div>
                <v-btn color="primary" :href="responseData" v-if="responseData">下載</v-btn>
            </div>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
// import data from "../assets/data/data.json";
import data from "../assets/data/full_ibk3_channel.json";
import industries from "@/assets/data/industry.json";
import axios from "axios";

export default {
    name: "ChannelData",

    data: () => ({
        // date: new Date().toISOString().substr(0, 10),
        is_selectedQQ:[],
        report_start:'',
        report_start1:false,
        report_end:'',
        report_end1:false,
        file_name:'',
        report_type: '',
        data: data,
        data_bk: data,
        selected: [],
        selected_num: 0,
        selected_channel_sum: 0,
        unique_website: [],
        filtered_website: [],
        unique_type: [],
        filtered_type: [],
        unique_industry: industries,
        filtered_industry: [],
        search: "",
        search_website: "",
        file: null,
        responseData: null,
        errorMessage: null,
        showLoadingBar: false,
        sendBtnStatus: false,
        filterStatusNo: false,
        showShortSelectedChannels: false,
        headers: [{
                text: "頻道英文",
                align: "start",
                sortable: false,
                value: "tkfc_name",
                filterable: false
            },
            {
                text: "頻道中文名",
                value: "display_name"
            },
            {
                text: "網站",
                value: "website",
                filterable: false
            },
            //   { text: "url", value: "url" },
            {
                text: "型式",
                value: "tw_type"
            },
            // { text: "圖檔路徑", value: "img_path", filterable: false },
            {
                text: "狀態",
                value: "tw_status",
                filterable: false
            },
            {
                text: "備註",
                value: "note",
                filterable: false
            }
            // { text: "頻道數", value: "channel_count", filterable: false }
        ]
    }),
    updated: function () {
        if (!this.file) {
            this.sendBtnStatus = true;
        } else {
            this.sendBtnStatus = false;
        }
        if (this.responseData || this.errorMessage) {
            this.showLoadingBar = false;
        }
        this.selected_num = this.selected.length;
        // console.log(this.filterStatusNo)
        // console.log(this.data[4].status)
    },
    beforeUpdate: function () {
        // 計算選擇的數量
        this.selected_channel_sum = 0;
        for (var n = 0; n < this.selected.length; n++) {
            this.selected_channel_sum += this.selected[n].tw_channel_number;
        }
        // 過濾實作
        // this.data = this.data_bk;
        var query_target = {
            "type": this.filtered_type.length,
            "website": this.filtered_website.length,
            "industry": this.filtered_industry.length
        };
        // console.log("query_target:"+query_target)
        // console.log("type:"+typeof this.filtered_type)
        // console.log("website:"+typeof this.filtered_website)
        // console.log("industry:"+typeof this.filtered_industry)

        if (this.filtered_type.length > 0 || this.filtered_website.length > 0 || this.filtered_industry.length > 0) {
            var new_data = []

            for (var x = 0; x < this.data_bk.length; x++) {
                var evaluate = [];
                // filter type
                if (query_target['type'] > 0) {
                    if (this.filtered_type.includes(this.data_bk[x].tw_type)) {
                        evaluate.push(true)
                    } else {
                        evaluate.push(false)
                    }
                } else {
                    evaluate.push(true)
                }
                // filter website
                if (query_target['website'] > 0) {
                    if (this.filtered_website.includes(this.data_bk[x].website)) {
                        evaluate.push(true)
                    } else {
                        evaluate.push(false)
                    }
                } else {
                    evaluate.push(true)
                }
                // filter industry
                if (query_target['industry'] > 0) {
                    if (this.data_bk[x].industry.includes(this.filtered_industry)) {
                        evaluate.push(true)
                    } else {
                        evaluate.push(false)
                    }
                } else {
                    evaluate.push(true)
                }
                // remove status no
                if (this.filterStatusNo) {
                    if (this.data_bk[x].tw_status === true) {
                        evaluate.push(true)
                    } else {
                        evaluate.push(false)
                    }
                } else {
                    evaluate.push(true)
                }
                // end of removing no

                if (evaluate.every(v => v === true)) {
                    // console.log(this.data_bk[x])
                    new_data.push(this.data_bk[x]);
                }
            }
            this.data = new_data
        } else {
            this.data = this.data_bk;
        }
        // 過濾實作結束

        if (this.file == null) {
            this.responseData = null;
            this.errorMessage = null;
        }
    },
    mounted: function () {
        for (var n = 0; n < this.data.length; n++) {
            if (this.unique_website.includes(this.data[n].website)) {
                continue;
            } else {
                this.unique_website.push(this.data[n].website);
            }
            if (this.unique_type.includes(this.data[n].tw_type)) {
                continue;
            } else {
                this.unique_type.push(this.data[n].tw_type);
            }
        }
    },
    computed: {
        selected_ini: function () {
            var result = "";
            // result = result.concat(
            //   "count.網站頻道=" + this.selected_channel_sum + "\n\n"
            // );
            result = result.concat("count.網站=" + this.selected_num + "\n\n");
            for (var n = 0; n < this.selected.length; n++) {
                result = result.concat(
                    "網站_" + n + "=" + this.selected[n].tkfc_name + "\n"
                );
                result = result.concat(
                    this.selected[n].tkfc_name +
                    "_名稱=" +
                    this.selected[n].display_name +
                    "\n"
                );
                result = result.concat(
                    this.selected[n].tkfc_name +
                    "_網站=" +
                    this.selected[n].website +
                    "\n"
                );
                result = result.concat(
                    this.selected[n].tkfc_name +
                    "_型式=" +
                    this.selected[n].tw_type +
                    "\n"
                );
                result = result.concat(
                    this.selected[n].tkfc_name +
                    "_圖檔=" +
                    this.selected[n].picture +
                    "\n"
                );
                result = result.concat(
                    this.selected[n].tkfc_name +
                    "_頻道=" +
                    this.selected[n].tw_channel_number +
                    "\n\n"
                );
            }
            return result;
        }
    },
    methods: {
        sendYAYA:function(){
            if(this.report_type==""){
                alert('請選擇報表種類')
            }
            if(this.file_name==""){
                alert('請輸入檔案名稱')
            }
            if(this.report_start==""){
                alert('請選擇開始時間')
            }
            if(this.report_end==""){
                alert('請選擇結束時間')
            }
            if(this.report_end<this.report_start){
                alert('開始時間不得大於結束時間')
            }
            if(this.selected==""){
                alert('請選擇頻道')
            }

            // this.is_selectedQQ = this.selected
            for(let i =0;i<this.selected.length;i++){
                this.is_selectedQQ=[]
                this.is_selectedQQ.push(this.selected[i].name)

            }
                console.log(this.is_selectedQQ)
                console.log({report_type:this.report_type,file_name:this.file_name,report_start:this.report_start,report_end:this.report_end,channel_name_list:this.is_selectedQQ})

            axios
                .post(
                    "http://18.141.228.127/get_data_report",
                    {report_type:this.report_type,file_name:this.file_name,report_start:this.report_start,report_end:this.report_end,channel_name_list:this.is_selectedQQ}
                    
                )
                .then(response => {
                    console.log(response);
                    // this.responseData = response.data.link;
                })
                .catch(error => {
                    console.log(error);
                    // console.log(error.response.data.msg)
                    // this.errorMessage = error.response.data.msg;
                });
        },
        sendData: function () {
            this.showLoadingBar = true;
            var postforms = new FormData();
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
                }
            };
            postforms.append("excelpro", this.file, this.file.name);
            postforms.append("channel", this.selected_ini);
            axios
                .post(
                    "https://wom.i-buzz-system.com/api/pro-generator",
                    postforms,
                    config
                )
                .then(response => {
                    // console.log(response);
                    this.responseData = response.data.link;
                })
                .catch(error => {
                    console.log(error);
                    // console.log(error.response.data.msg)
                    this.errorMessage = error.response.data.msg;
                });
        },
        removeChannel: function ($event, channel) {
            var changed_channels = [];
            for (var c = 0; c < this.selected.length; c++) {
                if (channel !== this.selected[c].tkfc_name) {
                    changed_channels.push(this.selected[c]);
                }
            }
            this.selected = changed_channels;
        }
    }
};
</script>
