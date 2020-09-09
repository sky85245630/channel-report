<template>
<v-container>
    <v-row>
        <v-col>
            <h1 class="display-1">fb/ig數據報表</h1>
        </v-col>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-col class="col" style="text-align:right">
            <v-dialog v-model="create_channel" persistent max-width="500px">

                <v-card>
                    <v-card-title>
                        <span class="headline">新增頻道</span>
                    </v-card-title>
                    <v-card-text>
                        <font color="red">目前可以新增的頻道來源為：FB(miao，無回文資料)，IG，YT，若需要有回文資料之頻道，請聯繫I-buzz知識組莊莊！</font>
                    </v-card-text>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="createChannelName" label="頻道名稱*" :rules="rules" hint="這欄一定要填寫喔!" required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="createChannelId" label="頻道ID*" :rules="rules" hint="這欄一定要填寫喔!" required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="createChannelUrl" label="頻道網址*" :rules="rules" hint="這欄一定要填寫喔!" required></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-dialog v-model="urlTemplate" persistent max-width="500px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="error" dark v-bind="attrs" v-on="on">新增網址規範</v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">網址輸入格式範例</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <div>
                                                    <span style="color:red">
                                                        FB:https://www.facebook.com/222395256624/ FB網址 + FB_ID
                                                        IG:https://www.instagram.com/kyontw/ IG網址 + IG_ID
                                                        YT:https://www.youtube.com/CV15fCD47fcee6d7/ YT網址 + YT_ID
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="headline">查詢ID工具</span>
                                                </div>
                                                <div>
                                                    <span style="color:black">
                                                        查詢FB_ID : https://commentpicker/find-facebook-id.php
                                                    </span>
                                                </div>
                                                <div>
                                                    <span style="color:black">
                                                        查詢IG_ID : https://commentpicker/instagram-user-id.php
                                                    </span>
                                                </div>
                                                <div>
                                                    <span style="color:black">
                                                        查詢YT_ID : https://commentpicker/youtube-channel-id.php
                                                    </span>
                                                </div>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="urlTemplate = false">關閉</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                                <v-col cols="8" sm="6">
                                    <v-select v-model="createChannelCountry" :items="this.countries" label="國家代碼*" required></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="createChannelWebsite" :items="['facebook','instagram','youtube']" label="頻道網站*" required></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="create_channel = false">關閉</v-btn>
                        <v-btn color="blue darken-1" text @click="channelCreate">送出</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="2">
            <v-select :items="countries" label="依國別篩選" v-model="country"></v-select>
        </v-col>
        <v-col cols="2">
            <v-select :items="types" label="依資料來源篩選" v-model="web_type"></v-select>
        </v-col>
        <v-col cols="2">
            <v-select :items="media_types" label="依頻道類型篩選" v-model="media_type"></v-select>
        </v-col>
        <v-col class="col mt-3">
            <v-dialog v-model="downloadAllChannel" persistent max-width="400px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="blue darken-1" text v-bind="attrs" v-on="on">
                        <v-icon dark>folder_open</v-icon>一鍵匯出頻道清單
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">一鍵匯出頻道清單</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="downloadAllCountry" :items="this.countries" label="國家代碼*" required></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select v-model="downloadAllType" :items="this.types" label="資料來源類型" required></v-select>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>國家代碼為必填欄位喔~ </small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="downloadAllChannel = false">關閉</v-btn>
                        <v-btn color="primary" text @click="allDownload">下載</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="channelSearchWebsite" v-on:keyup.enter="searchChannelData" append-icon="search" placeholder="搜尋網站名稱(例如:Facebook)" single-line hide-details :height="33"></v-text-field>
        </v-col>
        <v-col cols="2">
            <v-text-field v-model="channelSearchName" v-on:keyup.enter="searchChannelData" append-icon="search" placeholder="搜尋頻道名稱(例如:八卦版)" single-line hide-details :height="33"></v-text-field>
        </v-col>
    </v-row>
    <!-- 選擇頻道列表 -->
    <v-row>
        <v-col>
            <div class="text-center pb-2">
                <v-btn color="primary" @click="showSelectedChannels=!showSelectedChannels">
                    <v-icon dark left>mdi-checkbox-marked-circle</v-icon>{{ showSelectedChannels? "關閉":"顯示"}}已選擇頻道清單
                </v-btn>
            </div>
            <v-card class="mx-auto" outlined v-if="showSelectedChannels">
                <v-card-text>
                    <v-chip class="ma-2" close @click:close="removeChannel($event, channel.name)" v-for="(channel, index) in selected" :key="index">{{channel.name}}
                    </v-chip>
                </v-card-text>
                <v-btn color="blue darken-1" text @click.prevent="channels_download">
                    <v-icon dark>folder_open</v-icon>匯出已選擇頻道
                </v-btn>
            </v-card>
        </v-col>
    </v-row>
    <!-- table data -->

    <!--選擇種類~與送出~要離職了開心~-->
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
            <v-menu v-model="report_start1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="report_start" label="開始時間" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="report_start" @input="report_start1 = false"></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="2">
            <v-menu v-model="report_end1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="report_end" label="結束時間" prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
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
    <!--end選擇種類~與送出~要離職了開心~-->

    <v-row>
        <v-col>
            <v-data-table v-model="selected" :headers="headers" :items="channels" :single-select="false" :search="search" item-key="_id" show-select multi-sort class="elevation-1" :footer-props="{
              itemsPerPageOptions: [50,100]
          }"></v-data-table>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-pagination v-model="page" :length=this.page_length :total-visible="10"></v-pagination>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import Axios from "axios";
import store from "@/store";
export default {
    name: "channel_management",
    data: () => ({
        //新增ㄉ東西
        is_selectedQQ: [],
        report_start: '',
        report_start1: false,
        report_end: '',
        report_end1: false,
        file_name: '',
        report_type: '',
        //新增ㄉ東西

        channels: null,
        country: "",
        web_type: "",
        countries: [
            "TW (台灣)",
            "FR (法國)",
            "HK (香港)",
            "ID (印尼)",
            "JP (日本)",
            "KR (韓國)",
            "MO (澳門)",
            "MY (馬來西亞)",
            "PH (菲律賓)",
            "RU (俄羅斯)",
            "SG (新加坡)",
            "TH (泰國)",
            "VN (越南)"
        ],
        // types: ["facebook_miao", "instagram_miao", "morefb", "tanwang", "tanwang_hk", "tanwang_sea", "youtube"],
        types: ["instagram_miao", "morefb"],
        media_types: ["article", "blog", "forum", "news", "sns", "video", "wiki"],
        selected: null,
        search: "",
        loadbar: false,
        channelSearchName: "",
        channelSearchWebsite: "",
        downloadAllChannel: false,
        media_type: "",
        showSelectedChannels: false,
        downloadAllCountry: "",
        downloadAllType: "",
        page: 1,
        userSelectChannel: "",
        page_length: 6,
        create_channel: false,
        createChannelName: "",
        createChannelUrl: "",
        createChannelId: "",
        createChannelCountry: "",
        createChannelWebsite: "",
        urlTemplate: false,
        overlay: false,
        headers: [{
                align: "start",
                sortable: false,
                value: "_id.$oid",
                filterable: false
            },
            {
                text: "資料庫ID",
                value: "_id"
            },
            {
                text: "網站名稱(website)",
                value: "website"
            },
            {
                text: "頻道名稱(Tkfc_name)",
                value: "meta.tkfc_name"
            },
            {
                text: "中文名稱(Display_name)",
                value: "display_name"
            },
            {
                text: "資料來源(type)",
                value: "type"
            },
            {
                text: "國家",
                value: "country"
            },
            {
                text: "類型",
                value: "media_type"
            },
            {
                text: "url",
                value: "channel_url"
            },
            {
                text: "頻道新增時間",
                value: "created_at"
            }
        ],
        rules: [
            value => !!value || '這欄一定要填寫喔!'
        ]
    }),
    // created() {
    //     this.login()
    // },
    beforeMount: function () {
        this.channels = this.getChannelData();
    },
    watch: {
        country: function () {
            this.channels = this.getChannelData();
        },
        web_type: function () {
            this.channels = this.getChannelData();
        },
        page: function () {
            this.channels = this.getChannelData();
        },
        media_type: function () {
            this.channels = this.getChannelData();
        }
    },
    methods: {

        sendYAYA: function () {
            if (this.report_type == "") {
                alert('請選擇報表種類')
            }
            if (this.file_name == "") {
                alert('請輸入檔案名稱')
            }
            if (this.report_start == "") {
                alert('請選擇開始時間')
            }
            if (this.report_end == "") {
                alert('請選擇結束時間')
            }
            if (this.report_end < this.report_start) {
                alert('開始時間不得大於結束時間')
            }
            if (this.selected == "") {
                alert('請選擇頻道')
            }

            this.is_selectedQQ = []

            // this.is_selectedQQ = this.selected
            for (let i = 0; i < this.selected.length; i++) {
                this.is_selectedQQ.push(this.selected[i].name)

            }
            console.log(this.is_selectedQQ)
            console.log({
                report_type: this.report_type,
                file_name: this.file_name,
                report_start: this.report_start,
                report_end: this.report_end,
                channel_name_list: this.is_selectedQQ
            })

            Axios
                .post(
                    "http://18.141.228.127/get_data_report", {
                        report_type: this.report_type,
                        file_name: this.file_name,
                        report_start: this.report_start,
                        report_end: this.report_end,
                        channel_name_list: this.is_selectedQQ
                    }

                )
                .then(response => {
                    console.log(response.data);
                    window.location.href = response.data.result
                    // this.responseData = response.data.link;
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response.data.error_msg)
                    alert(error.response.data.error_msg)
                    // this.errorMessage = error.response.data.msg;
                });
        },
        // login: function () {
        //     let user_id = null
        //     let user_secret = null
        //     let full_name = null
        //     let access_token = null
        //     let refresh_token = null
        //     let config = {
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*"
        //         }
        //     };
        //     let body = {
        //         username: 'tanwang',
        //         password: 'xGnFZ2'
        //     };
        //     Axios
        //         .post(
        //             "https://api.i-buzz-system.com/basic/login",
        //             body,
        //             config
        //         )
        //         .then(response => {
        //             console.log(response)
        //             console.log(response)
        //             console.log(response)
        //             user_id = response.data.user_id
        //             user_secret = response.data.user_secret
        //             full_name = response.data.full_name
        //             console.log(user_id, user_secret, full_name)
        //             store.dispatch('handle_username', full_name)
        //             // store.commit('SET_USER', full_name)

        //             // console.log(user_id)
        //             // console.log(user_secret)
        //             // console.log(full_name)

        //             Axios
        //                 .post(
        //                     "https://api.i-buzz-system.com/basic/token_with_refresh", {
        //                         "user_id": user_id,
        //                         "user_secret": user_secret
        //                     },
        //                     config
        //                 )
        //                 .then(response => {
        //                     access_token = response.data.access_token
        //                     refresh_token = response.data.refresh_token
        //                     store.dispatch('handle_login', access_token)
        //                     store.dispatch('handle_refresh', refresh_token)
        //                     this.$router.replace('/channelManagement')
        //                     // console.log(access_token)

        //                 })
        //                 .catch(error => {
        //                     console.log(error)
        //                 })
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // },
        // 取得頻道列表
        getChannelData: function () {
            // this.overlay = true
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + store.getters.getToken
                }
            };
            Axios.get(
                    "https://api.i-buzz-system.com/basic/get-channels?country=" + this.country[0] + this.country[1] + "&web_type=" + this.web_type + "&page=" + this.page + "&media_type=" + this.media_type,
                    config
                )
                .then(response => {
                    this.channels = response.data.data;
                    this.page_length = parseInt(response.data.total_count / 100);
                    // this.overlay = false;
                })
                .catch(error => {
                    // window.location.href = "/"

                    console.log(error);
                });
        },
        // 搜尋頻道
        searchChannelData: function () {
            this.overlay = true
            if (this.channelSearchName == "" & this.channelSearchWebsite == "") {
                this.channels = this.getChannelData();
            } else {
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: "Bearer " + store.getters.getToken
                    }
                };
                Axios.get(
                        "https://api.i-buzz-system.com/basic/channelmanage/channel?name=" + this.channelSearchName + "&website=" + this.channelSearchWebsite + "&page=" + this.page,
                        config
                    )
                    .then(response => {
                        this.channels = response.data.data;
                        this.page_length = parseInt(response.data.total_count / 100);
                        this.overlay = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            this.channelSearchName = "";
            this.channelSearchWebsite = "";
        },
        // 移除所選頻道
        removeChannel: function ($event, channel) {
            var changed_channels = [];
            for (var c = 0; c < this.selected.length; c++) {
                if (channel !== this.selected[c].name) {
                    changed_channels.push(this.selected[c]);
                }
            }
            this.selected = changed_channels;
        },
        // 頁碼加減
        linkGen(pageNum) {
            return pageNum === 1 ? '?' : `?page=${pageNum}`
        },
        // 下載頻道清單檔案
        channels_download: function () {
            for (var c = 0; c < this.selected.length; c++) {
                this.userSelectChannel = this.userSelectChannel + this.selected[c]._id + ",";
            }
            let body = {
                "channel_list": this.userSelectChannel
            }
            Axios.post(
                "https://api.i-buzz-system.com/basic/channelmanage/download-channel-file",
                body, {
                    responseType: 'blob'
                }
            ).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', '頻道列表.xlsx');
                document.body.appendChild(link);
                link.click();
            });
            this.userSelectChannel = "";
        },
        allDownload: function () {
            if (this.downloadAllCountry == "") {
                alert("國家不能為空喔!")
            } else if (this.downloadAllType == "") {
                window.location.href = "http://api.i-buzz-system.com/aie-api/downloads/ibuzz-channels/" + this.downloadAllCountry[0] + this.downloadAllCountry[1] + ".xlsx"
            } else {
                window.location.href = "http://api.i-buzz-system.com/aie-api/downloads/ibuzz-channels/" + this.downloadAllCountry[0] + this.downloadAllCountry[1] + "_" + this.downloadAllType + ".xlsx"
            }
        },
        // 新增頻道
        channelCreate: function () {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + store.getters.getToken
                }
            };
            Axios.post(
                    "https://api.i-buzz-system.com/basic/channelmanage/create-channel", {
                        "channel_name": this.createChannelName,
                        "channel_url": this.createChannelUrl,
                        "account_id": this.createChannelId,
                        "country": this.createChannelCountry[0] + this.createChannelCountry[1],
                        "website": this.createChannelWebsite
                    },
                    config
                )
                .then(response => {
                    alert(response.data.msg)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>

<style>
.theme--light.v-card.v-card--outlined {
    text-align: center;
}
</style>
