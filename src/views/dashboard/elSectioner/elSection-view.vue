<template>
    <el-row :gutter="10" class="elContainerSection">
        <el-col :lg="7" :xl="7" class="elContent">
            <!--标题-->
            <el-row type="flex" justify="space-around" align="middle" class="elBgd"
                    :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='3' :xl="3">
                    <img class="elImage" :width="contentHeight * 0.15 + 'px'"
                         src="../../../assets/screenImage/icon_scenicspot_list.png">
                </el-col>
                <el-col :lg='14' :xl="14" class="elTitle threeTip">景区 排行榜</el-col>
                <el-col :lg='8' :xl="8" class="elFontSize"><a :href="scenicSpotDetailUrl" target="_blank">查看详情</a>
                </el-col>
            </el-row>
            <!--内容-->
            <el-row class="elCtBgd"
                    :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='24' :xl="24">
                    <el-row>
                        <el-col :lg='10' :xl="10">景区</el-col>
                        <el-col :lg='4' :xl="4" style="text-align: center">评分</el-col>
                        <el-col :lg='10' :xl="10" style="text-align: right">评论数</el-col>
                    </el-row>
                </el-col>
                <el-col :lg='24' :xl="24">
                    <el-row class="elCtBgdTd" :style="{'max-height': centerChartHeight * 0.8 +'px'}">
                        <el-col :lg='24' :xl="24" class="elFor" v-for="(item,index) in scenicList" :key="index">
                            <el-row class="elProgress">
                                <el-col class="item-name" :lg="4" :xl="4">{{item._id}}</el-col>
                                <el-col :lg='10' :xl="10">
                                    <el-col :lg='16' :xl="18">
                                        <el-progress :text-inside="true" :stroke-width="6"
                                                     :percentage="item.commentScorePercent"
                                                     status="success"></el-progress>
                                    </el-col>
                                    <el-col class="percent-label" :lg="8" :xl="6">{{item.commentScore}}</el-col>
                                </el-col>
                                <el-col :lg='10' :xl="10" style="text-align: right">
                                    <el-col :lg='16' :xl="18">
                                        <el-progress :text-inside="true" :stroke-width="6"
                                                     :percentage="item.commentNumberPercent"
                                                     status="success"></el-progress>
                                    </el-col>
                                    <el-col class="percent-label" :lg="8" :xl="6">{{item.commentNumber}}</el-col>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
        <!--echarts图-->
        <el-col :lg="10" :xl="10" class="elContent">
            <!--标题-->
            <el-row type="flex" justify="start" align="middle" class="elBgd" ref="chartTitleHeight"
                    :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='2' :xl="2">
                    <img class="elImage" :width="contentHeight * 0.15 + 'px'"
                         src="../../../assets/screenImage/barIcon.png">
                </el-col>
                <el-col :lg='14' :xl="14" class="elTitle">景点评论数变化图</el-col>
            </el-row>
            <!--内容-->
            <el-row class="elCtBgd" :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='24' :xl="24">
                    <bar-charts :id="scenicSpotFeverId" :height="centerChartHeight*0.9 + 'px'"></bar-charts>
                </el-col>
            </el-row>
        </el-col>
        <el-col :lg="7" :xl="7" class="elContent">
            <!--标题-->
            <el-row type="flex" justify="space-around" align="middle" class="elBgd"
                    :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='3' :xl="3">
                    <img class="elImage" :width="contentHeight * 0.15 + 'px'"
                         src="../../../assets/screenImage/icon_restaurant_list.png">
                </el-col>
                <el-col :lg='14' :xl="14" class="elTitle threeTip">餐饮 排行榜</el-col>
                <el-col :lg='8' :xl="8" class="elFontSize">
                    <!-- <a :href="foodDetailUrl" target="_blank">查看详情</a> -->
                    <router-link to="/restaurant" :class="{'router-link-active':$route.name === 'Restaurant'}">
                        查看详情
                    </router-link>
                </el-col>
            </el-row>
            <!--内容-->
            <el-row class="elCtBgd"
                    :style="{'padding': contentHeight * 0.05 + 'px','max-height': centerChartHeight +'px'}">
                <el-col :lg='24' :xl="24">
                    <el-row>
                        <el-col :lg='10' :xl="10">店名</el-col>
                        <el-col :lg='4' :xl="4" style="text-align: center">评分</el-col>
                        <el-col :lg='10' :xl="10" style="text-align: right">评论数</el-col>
                    </el-row>
                </el-col>
                <el-col :lg='24' :xl="24">
                    <el-row class="elCtBgdTd" :style="{'max-height': centerChartHeight * 0.8 +'px'}">
                        <el-col :lg='24' :xl="24" class="elFor" v-for="(item,index) in diningList" :key="index">
                            <el-row class="elProgress">
                                <el-col class="item-name" :lg='9' :xl="9">{{item._id}}</el-col>
                                <el-col :lg='7' :xl="7">
                                    <el-col class="percent-label" :lg='8' :xl="8">{{item.commentScore}}</el-col>
                                    <el-col class="percent-label" :lg='16' :xl="16">
                                        <el-progress :text-inside="true" :stroke-width="6"
                                                     :percentage="item.commentScorePercent"
                                                     color="#D8FF77"></el-progress>
                                    </el-col>
                                </el-col>
                                <el-col :lg='8' :xl="8" style="text-align: right">
                                    <el-col :lg='16' :xl="16">
                                        <el-progress :text-inside="true" :stroke-width="6"
                                                     :percentage="item.commentNumberPercent"
                                                     color="#02FFF9"></el-progress>
                                    </el-col>
                                    <el-col class="percent-label" :lg="8" :xl="8">{{item.commentNumber}}</el-col>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    import BarCharts from '../components/barCharts/BarCharts'
    import {getSpotHotChange} from '@/api/dataView'
    import {debounce} from '@/utils'
    import {getSpotRank, getRestaurantRank} from "@/api/dataView";
    import {getToken} from '@/utils/auth'

    //展示的排行数据条数
    const maxDataNum = 10;
    export default {
        name: 'elSectionView',
        props: {
            contentHeight: {
                type: Number,
                default: 0
            },
        },
        components: {
            BarCharts,
        },
        data() {
            return {
                //景区热力变化图id
                scenicSpotFeverId: 'spotHotChangeChart',
                //景区排行列表
                scenicList: [],
                //餐饮排行列表
                diningList: [],
                centerChartHeight: 100,
            }
        },
        computed: {
            //景区详情链接
            scenicSpotDetailUrl() {
                return this.$config.detailUrl + '/ScenicInfo?scenicName=千岛湖&token=' + getToken();
            },
            // //餐饮详情链接
            // foodDetailUrl() {
            //     return this.$config.detailUrl + '/shopList?token=' + getToken();
            //     // return this.$router.path('/restaurant');
            // },
        },
        methods: {
            //获取景区排行列表
            getSpotRankFun: function () {
                getSpotRank().then(res => {
                    if (res.code === 0) {
                        //获取Top5的数据
                        this.scenicList = res.list ? res.list.slice(0, maxDataNum) : [];
                        var maxCommentNumber = Math.max.apply(Math, this.scenicList.map(function (b) {
                            return b.commentNumber
                        }));
                        this.scenicList.forEach(function (item) {
                            item["commentScorePercent"] = (item.commentScore / maxDataNum) * 100;
                            item["commentNumberPercent"] = maxCommentNumber > 0 ? (item.commentNumber / maxCommentNumber) * 100 : 0;
                        });
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            //获取餐饮排行列表
            getRestaurantRankFun: function () {
                getRestaurantRank().then(res => {
                    if (res.code === 0 && res.data) {
                        //获取Top5的数据
                        this.diningList = res.data.goodList ? res.data.goodList.slice(0, maxDataNum) : [];
                        var maxCommentNumber = Math.max.apply(Math, this.diningList.map(function (b) {
                            return b.commentNumber
                        }));
                        this.diningList.forEach(function (item) {
                            item["commentScorePercent"] = (item.commentScore / maxDataNum) * 100;
                            item["commentNumberPercent"] = maxCommentNumber > 0 ? (item.commentNumber / maxCommentNumber) * 100 : 0;
                        });
                    } else {
                        this.$message.error(res.message);
                    }
                });
            },
            //初始化图表高度
            loadCenterChartHeight() {
                this.centerChartHeight = this.contentHeight - this.$refs.chartTitleHeight.$el.clientHeight;
            }
        },
        watch: {
            scenicList() {
                //延时触发高度调整
                if (!this.screenHeightTimer) {
                    this.screenHeightTimer = true;
                    let self = this;
                    setTimeout(function () {
                        self.loadCenterChartHeight();
                        self.screenHeightTimer = false
                    }, 400);
                }
            }
        },
        created() {
            //初始化数据
            this.getSpotRankFun();
            this.getRestaurantRankFun();
        },
        mounted() {
            let self = this;
            this.$nextTick(() => {
                this.centerChartHeight = this.contentHeight - this.$refs.chartTitleHeight.$el.clientHeight;
                /** 自适应页面高度 */
                this.__resizeHandler = debounce(() => {
                    self.loadCenterChartHeight();
                }, 100);
                window.addEventListener('resize', this.__resizeHandler);
            });
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.__resizeHandler);
        }
    }
</script>
<style scoped lang="less">
    @url: "../../../assets/screenImage/";

    @media (max-width: 1400px) {
        .elContainerSection {
            .elContent {
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

    .elContainerSection {
        width: 100%;

        .elContent {
            .elBgd {
                background: url('@{url}title.png') no-repeat;
                background-size: 100% 100%;
                overflow: hidden;
                height: 100%;
                width: 100%;
            }

            .elImage {
                float: left;
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


            //内容
            .elCtBgd {
                background: url('@{url}bgrImage.png') no-repeat;
                background-size: 100% 100%;
                /*padding: 0.5vw 1.8vw;*/
                /*padding: 2% 5%;*/
                /*font-size: 1.2vw;*/

                .item-name {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #D9E0ED;
                }

                .percent-label {
                    color: #68E4E8;
                    text-align: center;
                }

                .elCtBgdTd {
                    overflow: auto;
                }

                .elFor {
                    padding-top: 0.5vh;
                    padding-top: 1%;
                }
            }
        }
    }

</style>
<style scoped>

    /*背景颜色*/
    .elContainerSection >>> .el-progress-bar__outer {
        background-color: rgba(0, 0, 0, 0.2) !important;
    }

    /*手动添加渐变色*/
    .elContainerSection >>> .el-progress.is-success .el-progress-bar__inner {
        background: linear-gradient(#D8FF77, #00FFFA) !important;
    }

    /*百分比的高度*/
    .elContainerSection >>> .el-progress-bar__inner {
        line-height: 0.5 !important;
    }

    /*隐藏百分比*/
    .elContainerSection >>> .el-progress-bar__innerText {
        display: none !important;
    }
</style>