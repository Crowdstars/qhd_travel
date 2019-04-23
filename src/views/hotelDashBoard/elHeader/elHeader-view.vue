<template>
    <el-row class="elContainer-elRow-elheader">
        <el-col :lg="7" :xl="7">
            <el-row class="elText" :style="{height:contentHeight+'px'}">
                <el-col :lg='24' :xl="24" style="width: 98%;">
                    <el-row type="flex" justify="space-around" align="middle" style="overflow: hidden;">
                        <el-col :lg='4' :xl="4">
                            <img class="elText-images" :width="contentHeight * 0.1 + 'px'"
                                 src="../../../assets/screenImage/icon_comments.png">
                        </el-col>
                        <el-col :lg='20' :xl="20" class="elTitle">酒店评论数</el-col>
                    </el-row>
                    <el-row style="margin-top: 3%">
                        <el-col :lg='8' :xl="8">本月新增量</el-col>
                        <el-col :lg='7' :xl="7" :offset="1">同比变化量</el-col>
                        <el-col :lg='7' :xl="7" :offset="1">同比增长率</el-col>
                    </el-row>
                    <el-row class="elText-elMonth" style="color:#00FF64;">
                        <el-col :lg='8' :xl="8"><span>{{keyIndicatorData.monthNumCumulant}}</span><span
                                class="articlePoints">条</span>
                        </el-col>
                        <el-col :lg='7' :xl="7" :offset="1">
                            <span>{{keyIndicatorData.monthNumChange}}</span><span
                                class="articlePoints">条</span></el-col>
                        <el-col :lg='7' :xl="7" :offset="1"><span
                                :class="[keyIndicatorData.isMonthNumRise ? 'rising' : 'falling']">{{keyIndicatorData.monthNumPercent}}</span>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 4%">
                        <el-col :lg='8' :xl="8">本年累积量</el-col>
                        <el-col :lg='7' :xl="7" :offset="1">同比变化量</el-col>
                        <el-col :lg='7' :xl="7" :offset="1">同比增长率</el-col>
                    </el-row>
                    <el-row class="elText-elYear" style="color:#F5D001;">
                        <el-col :lg='8' :xl="8"><span>{{keyIndicatorData.yearNumCumulant}}</span><span
                                class="articlePoints">条</span></el-col>
                        <el-col :lg='7' :xl="7" :offset="1"><span>{{keyIndicatorData.yearNumChange}}</span><span
                                class="articlePoints">条</span></el-col>
                        <el-col :lg='7' :xl="7" :offset="1"><span
                                :class="[keyIndicatorData.isYearNumRise ? 'rising' : 'falling']">{{keyIndicatorData.yearNumPercent}}</span>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
        <!--echarts图-->
        <!--echarts图-->
        <el-col :lg="10" :xl="10">
            <!--标题-->
            <el-row type="flex" justify="start" align="middle" class="elBgd" ref="chartTitleHeight"
                    :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='2' :xl="2">
                    <img class="elImage" :width="contentHeight * 0.05 + 'px'"
                         src="../../../assets/screenImage/barIcon.png">
                </el-col>
                <el-col :lg='14' :xl="14" class="elTitle">景点评论数变化图</el-col>
            </el-row>
            <!--内容-->
            <el-row class="elCtBgd" :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='24' :xl="24">
                    <bar-charts :id="scenicSpotFeverId" :height="contentHeight * 0.70 + 'px'"></bar-charts>
                </el-col>
            </el-row>
        </el-col>
        <el-col :lg="7" :xl="7">
            <el-row type="flex" justify="start" align="middle" class="elBgd" ref="chartTitleHeight"
                    :style="{'padding': contentHeight * 0.05 + 'px'}">
                <el-col :lg='3' :xl="3">
                    <img class="elImage" :width="contentHeight * 0.1 + 'px'"
                         src="../../../assets/screenImage/pieIcon.png">
                </el-col>
                <el-col :lg='18' :xl="18" class="elTitle threeTip">酒店和餐饮评论数分布</el-col>
            </el-row>
            <!--内容-->
            <el-row class="elCtBgd">
                <el-col :span="12" class="chartFontSizeStyle">
                    <pie-charts :id="hotelRestNumId"  :hotelNumData="data1"
                                :height="contentHeight * 0.95 + 'px'">
                    </pie-charts>
                </el-col>
                <el-col :span="10" class="chartFontSizeStyle">
                    <pie-charts :id="hotelRestScoreId"  :hotelNumData="data2"
                                :height="contentHeight * 0.95 + 'px'">
                    </pie-charts>
                </el-col>
            </el-row>
        </el-col>

    </el-row>
</template>
<script>
    import BarCharts from '../components/barCharts/BarCharts'
    import PiesChart from '../components/pieCharts/PiesChart'
    import PieCharts from '../components/pieCharts/pieCharts'
    import {
        getHotelScorePieCharts,
        getHotelNumPieCharts,
        hotelComNumTotal,

    } from '@/api/dataView'
    import {IdData} from '../components/pieCharts/util'


    export default {
        name: 'elHeaderView',
        components: {
            BarCharts,
            PiesChart,
            PieCharts
        },
        props: {
            contentHeight: {
                type: Number,
                default: 180
            }
        },
        data() {
            return {
                //元素高度
                textScoreContentHeight: 0,
                //关键指标数据
                centerChartHeight: 100,
                //
                scenicSpotFeverId: 'spotHotChangeChart',
                //
                hotelRestScoreId: IdData.hotelRestScoreId,
                hotelRestNumId: IdData.hotelRestNumId,

                data1: [],
                data2: [],

                keyIndicatorData: {
                    //本月累积量 
                    monthNumCumulant: 0,
                    //本年累积量
                    yearNumCumulant: 0,
                    //本月评论数量变化量
                    monthNumChange: 0,
                    //本年评论数量变化量
                    yearNumChange: 0,
                    //本月同比数量变化量 
                    monthNumPercent: "0",
                    //本年同比数量变化量 
                    yearNumPercent: "0",
                    //本月评论数量是否上升 0 表示下降 1表示上升
                    isMonthNumRise: 0,
                    //本年评分数量是否上升 0 表示下降 1表示上升
                    isYearNumRise: 0,
                    //本月评分
                }
            }
        },
        methods: {
            //获取关键指标数据
            getKeyIndicatorFun: function () {
                hotelComNumTotal().then(res => {
                    if (res.code === 0) {
                        this.keyIndicatorData = res.data.comsummary;
                    } else {
                        this.$Message.error(res.message);
                    }
                });
            },

            SetOptionHotelNumData() {
                getHotelNumPieCharts().then(res => {
                    let self = this;
                    res.data.numberList.map((item, index) => {
                        this.data1.push({
                            "name": item.name,
                            "value": Math.round(item.value / (self.returnSum(res.data.numberList)) * 100)
                        })
                    })
                });

            },
            //求和
            returnSum(data) {
                let sum = 0;
                data.map((item, index) => {
                    sum += item.value;
                });
                return sum
            },
            //设置酒店餐馆评分
            SetOptionHotelScoreData() {
                getHotelScorePieCharts().then(res => {
                    res.data.scoreList.map((item, index) => {
                        this.data2.push({
                            name: item.name,
                            value: Math.round(item.value / (self.returnSum(res.data.scoreList)) * 100)
                        })
                    })
                    console.log(this.data2, '输出这些内容');
                });
            },
        },
        mounted() {
            this.getKeyIndicatorFun();
            this.SetOptionHotelScoreData();
            this.SetOptionHotelNumData();
        },
        beforeDestroy() {
        }
    }
</script>
<style scoped lang="less">
    .elContainer-elRow-elheader {
        width: 100%;
        min-height: 200px;
        border: 1px solid red;
        background-color: #f6f6f6;

        .elBgd {
            background-size: 100% 100%;
            height: 100%;
            width: 100%;
            overflow: hidden;
            color: black;
        }

        .elText {
            background-size: 100% 100%;
            padding: 1% 2% 1% 5%;
            width: 98.16667%;

            &-images {
                float: left;
            }

            &-title {
                font-size: 1.5vw;
            }

            &-elMonth, &-elYear {
                font-size: 1.6vw;
            }

            //上升
            .rising {
                color: #FF2953 !important;
                position: relative;
            }

            //下降
            .falling {
                color: #00FF47 !important;
                position: relative;
            }

            .rising::after, .falling::after {
                content: '';
                display: inline-block;
                width: 1vw;
                height: 2.5vh;
                margin-left: 0.5rem;
                position: absolute;
                margin-top: 5%;
            }
            .rising::after {
                background-size: contain;
            }

            .falling::after {
                background-size: contain;
            }

            .articlePoints {
                font-size: 1vw;
                margin-left: 8%;
            }
        }
    }
</style>
<style>
    .chartFontSizeStyle {

        border: 1px solid red;
    }
</style>