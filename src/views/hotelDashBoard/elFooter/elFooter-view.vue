<template>
    <el-container>
        <el-header>
            <el-card>
                <div class="horizontal left top padding10 text-main">
                    <span class="noshrink" style="margin-top:4px; margin-right: 10px;">商圈:</span>
                    <choose-list
                            class="margin-left-10"
                            :values="tradeAreas"
                            :select="tradeArea"
                            v-on:on-select-change="tradeAreasClickFunc"
                    />
                </div>
                <div class="horizontal left top padding10 text-main">
                    <span class="noshrink" style="margin-top:4px; margin-right: 10px;">星级:</span>
                    <choose-list
                            class="margin-left-10"
                            :values="hotelRates"
                            :select="hotelRate"
                            v-on:on-select-change="hotelRateClickFunc"
                    />
                </div>
            </el-card>
            <el-card>
                <div id="hotel-list" class="condition">
                    <span>
                        <span rel="nofollow" class="sort-con sel" style="cursor: progress">排序方式</span>
                    </span>
                    <span>
                        <a rel="nofollow" class="sort-con sel" @click="hotelSortWayClickFunc('commentNum')">评论数量</a>
                        <span class="line">|</span>
                    </span>
                    <span>
                        <a rel="nofollow" class="sort-con sel" @click="hotelSortWayClickFunc('commentScore')">评分</a>
                         <span class="line">|</span>
                    </span>
                    <span>
                        <a rel="nofollow" class="sort-con sel"
                           @click="hotelSortWayClickFunc('comment_health_grade')">卫生</a>
                        <span class="line">|</span>
                    </span>
                    <span>
                        <a rel="nofollow" class="sort-con sel" @click="hotelSortWayClickFunc('comment_service_grade')">服务</a>
                        <span class="line">|</span>
                    </span>
                </div>
            </el-card>
        </el-header>

        <el-container class="el-container-footer">
            <el-main>
                <div class="shop-info">
                    <!--酒店信息显示-->
                    <div class="txt" v-for="hotel in hotelList2">
                        <!--@mouseenter="enterBackChange" @mouseleave="leaveBackChange"-->
                        <div class="tit">
                            <span>{{hotel.name}}</span>
                        </div>
                        <div class="comment">
                            <span class="sml-rank-stars"></span><!--{{hotel.commentScore}}-->
                            <em class="sep">|</em>
                            <span class="hpowu"> <b>{{hotel.commentNumber}}</b> 条点评</span>
                        </div>
                        <div class="tag-addr">
                            <span class="addr">{{hotel.shop_rate}}</span>
                            <em class="sep">|</em>
                            <span class="addr">{{hotel.address| defaultAddressShow}}</span>
                        </div>
                        <div class="detail-container">
                             <span class="comment-list">
                                   <span>卫生：<b>{{hotel.comment_health_grade}}</b></span>
                                   <span>服务：<b>{{hotel.comment_service_grade}}</b></span>
                                   <span>位置：<b>{{hotel.comment_location_grade}}</b></span>
                                   <span>设施：<b>{{hotel.comment_facility_grade}}</b></span>
                              </span>
                        </div>
                    </div>
                </div>
                <div class="divide_page">  <!--分页-->
                    <page-change
                            ref="pageChangeRef"
                            :showTitle="'酒店显示'"
                            @changeFunc="pageChangeClickFunc"
                            :currentPage="paramList.currpage"
                            :pageSize="10"
                            :total="paramList.totalcount">
                    </page-change>
                </div>
            </el-main>
            <el-aside style="width: 400px;">
                <!--标题-->
                <el-row>
                    <el-col>
                        <el-row type="flex" align="middle" class="elBgd"
                                :style="{'padding': contentHeight * 0.05 + 'px'}">
                            <el-col :lg='14' :xl="14" class="elTitle threeTip"><!--酒店排行榜--></el-col>
                        </el-row>
                        <!--内容-->
                        <el-row>
                            <el-col>
                                <el-radio-group @change="defaultShowFunc" v-model="defaultChoose"
                                                style="margin-bottom: 30px;">
                                    <el-radio-button label="top" :border="false">好评榜</el-radio-button>
                                    <el-radio-button label="bottom" :border="false">差评榜</el-radio-button>
                                </el-radio-group>
                            </el-col>
                        </el-row>

                        <el-row class="elRBgd" v-if="defaultChoose == 'top'" style="">
                            <el-col :lg='24' :xl="24">
                                <el-row class="elBorderTitle">
                                    <el-col :lg="10" :xl="10" :offset="4">酒店</el-col>
                                    <el-col :lg="5" :xl="5">评分</el-col>
                                    <el-col :lg="5" :xl="5">评论数</el-col>
                                </el-row>
                            </el-col>
                            <el-col class="elRowContent" :lg='24' :xl="24"
                                    :style="{'max-height': '800px'}">
                                <el-row class="elBorder" v-for="(item,index) in hotelgood" :key="index">
                                    <el-col :lg="4" :xl="4"><span class="elBefore"> {{index + 1 }}</span></el-col>
                                    <el-col class="item-name click-cursor" :lg="10" :xl="10" :title="item._id"
                                            @click.native="toViewHotelDetail(item)">
                                        {{item._id}}
                                    </el-col>
                                    <el-col :lg="5" :xl="5">{{item.commentScore}}</el-col>
                                    <el-col :lg="5" :xl="5">{{item.commentNumber}}</el-col>
                                </el-row>
                            </el-col>
                        </el-row>

                        <el-row class="elRBgd" v-else>
                            <el-col :lg='24' :xl="24">
                                <el-row class="elBorderTitle">
                                    <el-col :lg="10" :xl="10" :offset="4">酒店1</el-col>
                                    <el-col :lg="5" :xl="5">评分2</el-col>
                                    <el-col :lg="5" :xl="5">评论数3</el-col>
                                </el-row>
                            </el-col>
                            <el-col class="elRowContent" :lg='24' :xl="24"
                                    :style="{'max-height': '800px'}">
                                <el-row class="elBorder" v-for="(item,index) in hotelbad" :key="index">
                                    <el-col :lg="4" :xl="4"><span class="elBefore"> {{index + 1 }}</span></el-col>
                                    <el-col class="item-name click-cursor" :lg="10" :xl="10" :title="item._id"
                                            @click.native="toViewHotelDetail(item)">
                                        {{item._id}}
                                    </el-col>
                                    <el-col :lg="5" :xl="5">{{item.commentScore}}</el-col>
                                    <el-col :lg="5" :xl="5">{{item.commentNumber}}</el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-aside>
        </el-container>
        <el-footer class="commentAnalyze">
            <el-card>
                <hotel-comment-sentiment></hotel-comment-sentiment>
            </el-card>
        </el-footer>
    </el-container>
</template>
<script>
    import {debounce} from '@/utils'
    import {getSameTradeRateCount, getSameTradeHotelList, getTradeHotelRankList} from "@/api/dataView";
    import {getToken} from '@/utils/auth'
    import chooseList from '../components/chooseBar/chooseList'
    import {tradeAreas, hotelRates, hotelList2} from './tradeArea'
    import PageChange from '../components/divide-page/PageChange'
    import hotelCommentSentiment from "../components/semanticModule/hotelCommentSentiment"

    //展示的排行数据条数
    const maxDataNum = 10;
    export default {
        name: 'elFooterView',
        props: {
            contentHeight: {
                type: Number,
                default: 0
            },
        },
        components: {
            chooseList,
            PageChange,
            hotelCommentSentiment
        },
        data() {
            return {
                /**/
                hotelRates: [],
                tradeAreas: tradeAreas,
                tradeArea: "全部",
                // 商圈 default
                hotelRate: "全部",
                // 酒店等级 default
                //酒店排行列表
                hotelList2: hotelList2,
                // 酒店列表
                hotelgood: [],
                hotelbad: [],
                // 酒店排行榜
                //图表id
                defaultChoose: 'top',
                hotelrateCount: ["全部", "五星级", "四星级", "豪华型", "高档型", "三星级", "舒适型", "经济型", "客栈民宿"],

                paramList: {
                    'tradearea': '全部',
                    "hotelrate": "全部",
                    "sortWay": "commentNum",
                    "pageSize": 10,
                    "totalcount": 1171,
                    'currpage': 1
                },
                // 表示 当前商圈 等级的酒店总数
            }
        },
        computed: {},
        methods: {
            tradeAreasClickFunc(value, hotelcount) {
                this.tradeArea = value;
                this.hotelRate = '全部';
                this.paramList.tradearea = value;
                this.hotelRate = '全部';
                this.paramList.totalcount = hotelcount;
                this.paramList.currpage = 1;
                this.paramList.sortWay = 'commentNum';
                this.$refs.pageChangeRef.currPageShow = 1; //

                this.loadHotelRateFunc(hotelcount);
                this.loadHotelListFunc();
                this.loadRankListFunc();

            },
            hotelRateClickFunc(value, hotelcount) {
                this.hotelRate = value;
                this.paramList.totalcount = hotelcount;
                this.paramList.currpage = 1;
                this.paramList.sortWay = 'commentNum';
                this.$refs.pageChangeRef.currPageShow = 1; //
                this.loadHotelListFunc();
                this.loadRankListFunc();
            },
            hotelSortWayClickFunc(value) {
                this.paramList.currpage = 1;
                this.paramList.sortWay = value;
                this.$refs.pageChangeRef.currPageShow = 1; //
                this.loadHotelListFunc();
            },

            pageChangeClickFunc(title, val) {
                this.paramList.currpage = val;
                this.loadHotelListFunc();
            },


            loadHotelRateFunc: function (hotelcount) {
                getSameTradeRateCount(this.paramList).then(res => {
                    if (res.code === 0 && res.data) {
                        this.hotelRates = res.data.hotelrates;
                        this.hotelRates.splice(0, 0, {
                            '_id': '全部',
                            'countNum': hotelcount
                        })
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            loadHotelListFunc: function () {
                getSameTradeHotelList(this.paramList).then(res => {
                    if (res.code === 0 && res.data) {
                        this.hotelList2 = res.data.hotellist;
                        this.autoAddHotelInfo();
                    } else {
                        this.$message.error(res.message);
                    }
                });

                // this.autoAddHotelInfo();
            },
            loadRankListFunc: function () {
                getTradeHotelRankList(this.paramList).then(res => {
                    if (res.code === 0 && res.data) {
                        console.log(res.data, '输出data');
                        console.log(res.data.hotelrank, '输出hotelrank')
                        this.hotelgood = res.data.hotelrank.goodList;
                        this.hotelbad = res.data.hotelrank.badList;
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },

            getCommentGrade: function (val) {
                var backPos = 15;
                if (4.8 <= val && val <= 5) {
                    backPos += 0;
                } else if (4.3 < val && val <= 4.8) {
                    backPos += 17;
                } else if (3.8 < val && val <= 4.3) {
                    backPos += 34;
                } else if (3.3 < val && val <= 3.8) {
                    backPos += 51;
                } else if (2.5 < val && val <= 3.3) {
                    backPos += 68;
                } else if (1.6 < val && val <= 2.5) {
                    backPos += 85;
                } else if (0.7 < val && val <= 1.6) {
                    backPos += 102;
                } else {
                    backPos += 119;
                }
                return -backPos;
            },

            autoAddHotelInfo: function () {
                var rankStars = document.getElementsByClassName('sml-rank-stars');
                for (var i = 0; i < rankStars.length; i++) {
                    console.log(this.hotelList2[i].commentScore, this.hotelList2[i].name, '输出评分');
                    var backPos = this.getCommentGrade(this.hotelList2[i].commentScore);
                    console.log(backPos, '输出图片的位置');
                    rankStars[i].style.backgroundPosition = '0px ' + (backPos) + 'px';
                    rankStars[i].innerHTML = ''
                }
            },

            defaultShowFunc: function (label) {
                this.defaultChoose = label;
            },


        },
        filters: {
            defaultAddressShow: function (address) {
                return address.length > 12 ? address.substr(0, 12) : address;
            }
        },
        watch: {},
        created() {

        },
        mounted() {
            //this.getHotelRankFun();
            this.autoAddHotelInfo();
        }
    }
</script>
<style scoped lang="less">
    @url: "../../../assets/screenImage/";
    @media (max-width: 1400px) {
        .el-container {
            .el-aside {
                .elTitle {
                    font-size: 15px !important;
                }

                .threeTip::after {
                    font-size: 6px !important;
                    bottom: -100% !important;
                }
            }
        }
    }

    .el-container {
        width: 100%;

        .el-header {
            margin-bottom: 10px;
            min-height: 240px;
        }

        .el-container-footer {
            margin-top: 10px;
        }

        .el-main {

        }

        .el-main .shop-info {
            max-height: 500px;
            overflow: scroll;
        }

        .el-aside {
            /* padding-top: 20px;*/

            margin-top: 20px;

            .elImage {
                float: left;
            }

            &-elCenterImage {
                width: 10%;
                margin-top: 1%
            }

            .elFontSize {
                float: right;
                width: 60%;
                text-align: right;
                color: #006FFF;
            }

            .elTitle {
                padding: 0 10px;
            }

            .threeTip {
                position: relative;
                &::after {
                    color: #006FFF;
                    content: '（近三个月综合数据统计）';
                    display: inline-block;
                    position: absolute;
                    font-size: 8px;
                    left: 0;
                    bottom: -100%;
                }
            }

            .elLink {
                float: right;
            }

            /*.elBgd .elTitle {
                font-size: 20px;
                margin: 0px auto;
            }
*/
            .elLBgd {

                .elBorder {
                    .elBR:last-child {
                        border-radius: 0 0 8% 19%;
                    }

                    .click-cursor {
                        cursor: pointer;
                    }

                    div {
                        border: 1px solid #0E367F;
                        width: 32.4%;
                        padding: 0.6% 0;
                        margin: 0.1% 0.1%;
                    }
                }

            }

            .elRBgd {
                .elBorderTitle {
                    background: #f5f5ff;
                    padding: 10px;
                    overflow: hidden;
                    font-size: 14px;
                    lineHeight: 28px;
                    color: #333333;
                    webkit-box-shadow: 1px 1px 1px #409EFF;
                    moz-box-shadow: 1px 1px 1px #409EFF;
                    box-shadow: 1px 1px 1px #409EFF;
                }
                .elBorder {
                    margin: 0.5% 0px;
                    .elBefore {
                        display: inline-block;
                        padding: 2% 10%;
                        border-radius: 50%;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        background: white;
                        color: black;
                    }

                    .item-name {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        background: white;
                        border: 1px solid #0E367F;
                    }

                    .click-cursor {
                        cursor: pointer;
                    }

                    div {
                        padding: 0.5% 0;
                    }
                }
            }

            .elLBgd, .elRBgd {
                text-align: center;
                background-size: 100% 100%;

                .elRowContent {
                    overflow: auto;
                }

                .elRowContent .elBorder {
                    background: #f5f5ff;
                    padding: 10px;
                    overflow: hidden;
                    font-size: 14px;
                    lineHeight: 28px;
                    color: #333333;
                    webkit-box-shadow: 1px 1px 1px #409EFF;
                    moz-box-shadow: 1px 1px 1px #409EFF;
                    box-shadow: 1px 1px 1px #409EFF;
                }

            }
        }

        .commentAnalyze {
            margin-top: 10px;
        }
    }


</style>
<style scoped>

    .condition {
        line-height: 44px;
        /*// border-bottom: 1px solid #e9e9e9;*/
        margin-top: -1px;
        position: relative;
        zoom: 1;
    }

    .condition a, .condition span {
        color: black;
    }

    .condition .sort-con {
        display: inline-block;
        margin: 0 10px;
        text-align: center;
    }

    .txt {
        padding: 8px 15px 13px 30px;
        background-color: #fff9f7;
        position: relative;
        min-height: 88px;
        margin: 5px;
        -webkit-border-top-right-radius: 10px;
        border-top-right-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
        border-top-bottom-radius: 10px;
    }

    /*.tit {
    border: 1px solid red;
    }*/

    .tit span {
        display: inline-block;
        padding: 5px 10px 5px 0px;
        margin: 10px 0px;
        font-size: 16px;
        color: black;
    }

    .comment span {
        color: #999;
    }

    .comment span b {
        color: black;
    }

    .comment-list {
        position: absolute;
        line-height: 30px;
        right: 25px;
        top: 70px;
        color: #999;
    }

    .sml-rank-stars {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        width: 66px;
        height: 12px;
        vertical-align: -1px;
        background-image: url('{@url}remarkgrade.png');
        background-repeat: no-repeat;
        background-position: 0px -100px;
        -webkit-background-size: 86px auto;
        -moz-background-size: 86px auto;
        background-size: 86px auto;
        margin-right: 10px;
    }


    .tag-addr {
        line-height: 24px;
        color: #999;
    }

    .tag-addr .sep, .comment .sep {
        color: #999;
    }


</style>