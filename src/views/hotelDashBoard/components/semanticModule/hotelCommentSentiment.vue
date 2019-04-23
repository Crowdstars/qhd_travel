<template>
    <div
            class="sl-loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-row>
            <el-col :offset="1" :span="2">
                <el-row>
                    <el-badge :value="priceValue" class="item" type="primary">
                        <el-button size="small" class="btnType" @click="typeChangeBtn('性价比', 1)">性价比</el-button>
                    </el-badge>
                </el-row>
                <el-row>
                    <el-badge :value="serveValue" class="item" type="warning">
                        <el-button size="small" class="btnType" @click="typeChangeBtn('服务', 1)">服务</el-button>
                    </el-badge>
                </el-row>
                <el-row>
                    <el-badge :value="locationValue" class="item">
                        <el-button size="small" class="btnType" @click="typeChangeBtn('位置', 1)">位置</el-button>
                    </el-badge>
                </el-row>
            </el-col>
            <el-col :offset="1" :span="20">
                <el-tabs type="border-card" @tab-click="tabClickCommentClass">
                    <el-tab-pane label="好评">
                        <comment-analyze v-if="showGood1" :getComment="getComment"></comment-analyze>
                    </el-tab-pane>
                    <el-tab-pane label="差评">
                        <comment-analyze v-if="showGood2" :getComment="getComment"></comment-analyze>
                    </el-tab-pane>
                </el-tabs>
                <div class="divide_page">  <!--分页-->
                    <page-change
                            ref="pageChangeRef"
                            :showTitle="paramList.tagname"
                            @changeFunc="typeChangeBtn"
                            :currentPage="paramList.currpage"
                            :pageSize="6"
                            :total="totalValue">
                    </page-change>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import commentAnalyze from "../../components/semanticModule/qdhHotelCommentAnalyze"
    import PageChange from '../../components/divide-page/PageChange'
    import {hotelComTagSum, hotelComFeatureWord} from "@/api/dataView";

    export default {
        name: 'app',
        components: {
            commentAnalyze,
            PageChange
        },
        data() {
            return {
                loading: false,
                showTitle: '性价比',
                showCommentArray: null,
                myColors: ['#409EFF', '#E6A23C', '#F56C6C', '#174E26', 'crimson'],
                showGood1: true,
                showGood2: false,
                getComment: [],
                priceMax: 0,
                priceValue: 0,
                facilityValue: 0,
                healthValue: 0,
                locationValue: 0,
                serveValue: 0,
                totalValue: 0,
                allInfoComType: 0,
                modifyCommentStore: [],
                defaultWords: [],
                featureWordArray: [
                    ["早餐品种", "性价比", "价格", "早餐", "餐饮", "钱", "体验", "元"],
                    /*  ["卫生", "地毯", "空气", "味道", "烟灰", "灰尘", "烟味", "蚊虫", "虫子", "小强", "霉味", "头发", "恶心"],*/
                    ["前台", "老板", "服务", "态度"],
                    ["地理位置", "位置", "离市区", "购物", "交通", "湖景", "风景", "夜景", "海景", "出行",
                        "离码头", "离商业街", "离景点", "环境", "路程"],
                    /*   ["设备", "设施", "隔音", "噪音", "空调", "阳台", "通风", "卫生间", "硬件"]*/
                ],
                proportionClass: [],  // 用于存储每个评论的 差评 或者 好评的个数
                paramList: {
                    currpage: 1,
                    tagname: '',
                    commentclass: 1 // 1 表示 好评 0 表示 差评
                },
            }
        },
        mounted() {
            this.getComTagSum();
        },
        methods: {
            tabClickCommentClass: function (tab, event) {
                if (tab.label == '好评') {
                    this.paramList.commentclass = 1;
                    this.showGood1 = true;
                    this.showGood2 = false;
                } else {
                    this.paramList.commentclass = 0;
                    this.showGood1 = false;
                    this.showGood2 = true;
                }
                this.changeCommentClass();
                this.typeChangeBtn(this.paramList.tagname, 1)
            },
            changeCommentClass: function () {
                var totalMax = 0;
                if (this.paramList.tagname == '性价比') {
                    totalMax = 0;
                } else if (this.paramList.tagname == '服务') {
                    totalMax = 1;
                } else if (this.paramList.tagname == '位置') {
                    totalMax = 2;
                }
                this.totalValue = this.proportionClass[totalMax][this.paramList.commentclass];
            },
            storeClassTagNum: function (infodata) {
                for (var i = 0; i < infodata.length; i++) {
                    if (infodata[i].name == '性价比') {
                        this.proportionClass[0] = infodata[i].count;
                    } else if (infodata[i].name == '服务') {
                        this.proportionClass[1] = infodata[i].count;
                    } else if (infodata[i].name == '位置') {
                        this.proportionClass[2] = infodata[i].count;
                    }
                }
            },
            getComTagSum: async function () {
                hotelComTagSum(this.paramList).then(res => {
                    if (res.code === 0 && res.data) {
                        this.storeClassTagNum(res.data.infoList)
                        this.priceValue = this.proportionClass[0][0] + this.proportionClass[0][1];
                        this.serveValue = this.proportionClass[1][0] + this.proportionClass[1][1];
                        this.locationValue = this.proportionClass[2][0] + this.proportionClass[2][1];
                    }else {
                        this.$message.error(res.message);
                    }
                    this.typeChangeBtn('性价比', 1);
                    this.totalValue = this.proportionClass[0][1];
                });
            },
            typeChangeBtn: async function (choiceType, val) {
                this.loading = true;
                var getIndexNum = 0;
                this.$refs.pageChangeRef.currPageShow = parseInt(val); // 改变其值
                if (choiceType == '性价比') {
                    getIndexNum = 0;
                } else if (choiceType == '服务') {
                    getIndexNum = 1;
                } else if (choiceType == '位置') {
                    getIndexNum = 2;
                }
                this.paramList.tagname = choiceType;
                this.paramList.currpage = val;
                this.changeCommentClass();
                hotelComFeatureWord(this.paramList).then(res => {
                    if (res.code === 0 && res.data && res.data.list) {
                        this.getComment = res.data.list;
                        this.getComment = this.detailInfoFeature(choiceType, getIndexNum);
                    }else {
                        this.$message.error(res.message);
                    }
                });
            },

            getArrayFromComment: function (comment_content) {
                var comment_array = comment_content.split(/[，。？！'；.,、\s]/);
                return comment_array;
            },
            detailInfoFeature: function (choiceType, getIndexNum) {
                this.modifyCommentStore = [];
                for (var startNum = 0; startNum < this.getComment.length; startNum++) {
                    var refreshCommentStr = ''
                    var arrayComment = this.getArrayFromComment(this.getComment[startNum]['comment']);
                    for (var i = 0; i < arrayComment.length; i++) {
                        for (var j = 0; j < this.featureWordArray[getIndexNum].length; j++) {
                            if (arrayComment[i].indexOf(this.featureWordArray[getIndexNum][j]) >= 0) {
                                arrayComment[i] = '&nbsp&nbsp&nbsp<span style="color:' + this.myColors[getIndexNum] + '; font-weight: 900;">' + arrayComment[i] + '</span>';
                                break;
                            }
                        }
                    }
                    for (var i = 0; i < arrayComment.length; i++) {
                        refreshCommentStr += arrayComment[i];
                    }
                    this.modifyCommentStore.push({
                        commentContent: refreshCommentStr,
                        commentState: this.getComment[startNum]['commentstate']
                    });
                }
                return this.modifyCommentStore;
            }
        },

    }
</script>
<style lang="scss" scoped>

    .item {
        width: 100%;
        min-height: 45px;
    }

    .item:nth-child(1) {
        margin-top: 50px;
    }

    .btnType {
        width: 100%;
        min-height: 42px;
        background: white;
        font-weight: 900;
    }

    .newClass {

    }

    .divide_page {
        min-height: 50px;
        min-width: 200px;
        text-align: center;
        margin: 20px auto 0px;
    }

    .goodOrBad {
        border: 1px solid red;
        min-height: 500px;
        margin: auto 0px;
    }

</style>
