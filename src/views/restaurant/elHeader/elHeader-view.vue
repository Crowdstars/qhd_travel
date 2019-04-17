<template>
  <el-row class="elContainer-elRow-elheader">
    <el-col :lg="7" :xl="7" ref="textScoreContent">
      <el-row class="elText" :style="{height:contentHeight+'px'}">
        <el-col :lg='24' :xl="24" style="width: 98%;">
          <el-row type="flex" justify="space-around" align="middle" style="overflow: hidden;">
            <el-col :lg='4' :xl="4">
              <img class="elText-images" :width="contentHeight * 0.2 + 'px'"
                   src="../../../assets/screenImage/icon_score.png">
            </el-col>
            <el-col :lg='20' :xl="20" class="elText-title">餐饮评论数</el-col>
          </el-row>
          <el-row style="margin-top: 3%">
            <el-col :lg='7' :xl="7">本月积累量</el-col>
            <el-col :lg='8' :xl="8" :offset="1">同比变化量</el-col>
            <el-col :lg='7' :xl="7" :offset="1">同比增长率</el-col>
          </el-row>
          <el-row class="elText-elMonth" style="color:#00FF64;">
            <el-col :lg='7' :xl="7"><span>{{keyIndicatorData.monthNumCumulant}}</span><span
                    class="articlePoints">条</span></el-col>
            <el-col :lg='8' :xl="8" :offset="1"><span>{{keyIndicatorData.monthNumChange}}</span><span
                    class="articlePoints">条</span></el-col>
            <el-col :lg='7' :xl="7" :offset="1"><span
                    :class="[keyIndicatorData.isMonthNumRise ? 'rising' : 'falling']">{{keyIndicatorData.monthNumPercent}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 4%">
            <el-col :lg='7' :xl="7">本年累积量</el-col>
            <el-col :lg='8' :xl="8" :offset="1">同比变化量</el-col>
            <el-col :lg='7' :xl="7" :offset="1">同比增长率</el-col>
          </el-row>
          <el-row class="elText-elYear" style="color:#F5D001;">
            <el-col :lg='7' :xl="7"><span>{{keyIndicatorData.yearNumCumulant}}</span><span
                    class="articlePoints">条</span></el-col>
            <el-col :lg='8' :xl="8" :offset="1"><span>{{keyIndicatorData.yearNumChange}}</span><span
                    class="articlePoints">条</span></el-col>
            <el-col :lg='7' :xl="7" :offset="1"><span
                    :class="[keyIndicatorData.isYearNumRise ? 'rising' : 'falling']">{{keyIndicatorData.yearMonthPercent}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>


    <!--echarts图-->
    <el-col :lg="10" :xl="10" class="elContent">
      <!--标题-->
      <el-row
              type="flex"
              justify="start"
              align="middle"
              class="elBgd"
              ref="chartTitleHeight"
              :style="{'padding': contentHeight * 0.05 + 'px'}"
      >
        <el-col :lg="2" :xl="2">
          <img
                  class="elImage"
                  :width="contentHeight * 0.15 + 'px'"
                  src="../../../assets/screenImage/barIcon.png"
          >
        </el-col>
        <el-col :lg="14" :xl="14" class="elTitle">景点评论数变化图</el-col>
      </el-row>
      <!--内容-->
      <el-row class="elCtBgd" :style="{'padding': contentHeight * 0.05 + 'px'}">
        <el-col :lg="24" :xl="24">
          <line-charts :id="restaurantDetailsId" :height="centerChartHeight*0.9 + 'px'"></line-charts>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import LineCharts from "../components/lineCharts/LineCharts";
  import PiesChart from "../components/pieCharts/PiesChart";
  import PieCharts from "../components/pieCharts/pieCharts";
  import {
    getRestaurantPieChartsNum,
    getRestaurantPieChartsScore
  } from "@/api/dataView";
  import { IdData } from "../components/pieCharts/util";
  import { getShopKeyData } from "@/api/restaurant";
  import { debounce } from "@/utils";

  export default {
    name: 'elHeaderView',
    components: {
      LineCharts,
      PiesChart,
      PieCharts
    },
    props: {
      contentHeight: {
        type: Number,
        default: 240
      }
    },
    data() {
      return {
        centerChartHeight: 100,
        //元素高度
        restaurantDetailsId: "spotHotChangeChart",
        textScoreContentHeight: 0,
        //关键指标数据
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
          yearMonthPercent: "0",
          //本月评论数量是否上升 0 表示下降 1表示上升
          isMonthNumRise: 0,
          //本年评分数量是否上升 0 表示下降 1表示上升
          isYearNumRise: 0,


        }
      }
    },
    methods: {
      //获取关键指标数据
      getKeyIndicatorFun: function () {
        getShopKeyData().then(res => {
          console.log(res);
          if (res.code === 0) {
            this.keyIndicatorData = res.commentKeyIndicatorModel[0];
            console.log(this.keyIndicatorData);
          } else {
            this.$Message.error(res.message);
          }
        });
      },
      SetOptionRestNumData() {
        getRestaurantPieChartsNum().then(res => {
          let self = this;
          res.data.numberList.map((item, index) => {
            this.data1.push({
              "name": item.name,
              "value": Math.round(item.value / (self.returnSum(res.data.numberList)) * 100)
            })
          })
        });

      },
      //设置酒店餐馆评分
      SetOptionRestScoreData() {
        let self = this;
        getRestaurantPieChartsScore().then(res => {
          res.data.scoreList.map((item, index) => {
            this.data2.push({
              name: item.name,
              value: Math.round(item.value / (self.returnSum(res.data.scoreList)) * 100)
            })
          })
        });
      },
      //初始化图表高度
      loadCenterChartHeight() {
        this.centerChartHeight = this.contentHeight - this.$refs.chartTitleHeight.$el.clientHeight;
      },
    },
    watch: {
      attractionsList() {
        this.SetOptionRestNumData();
        this.SetOptionRestScoreData();
        //延时触发高度调整
        if (!this.screenHeightTimer) {
          this.screenHeightTimer = true;
          let self = this;
          setTimeout(function () {
            self.loadCenterChartHeight();
            self.screenHeightTimer = false
          }, 400);
        }
      },
      contentHeight() {
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


    mounted() {
      let self = this;
      this.getKeyIndicatorFun();
      this.$nextTick(() => {
        self.textScoreContentHeight = self.$refs.textScoreContent.$el.clientHeight;
        /** 自适应页面高度 */
        this.__resizeHandler = debounce(() => {
          self.textScoreContentHeight = self.$refs.textScoreContent.$el.clientHeight;
        }, 100);
        window.addEventListener('resize', this.__resizeHandler);
      })
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.__resizeHandler);
    }
  }
</script>
<style scoped lang="less">
  @url: "../../../assets/screenImage/";
  .elContainer-elRow-elheader {
    width: 100%;

    .elText {
      background: url('@{url}other.png') no-repeat;
      background-size: 100% 100%;
      padding: 1% 2%;
      width: 98.16667%;
      padding-left: 5%;

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
        background: url('@{url}icon_growth.png') no-repeat;
        background-size: contain;
      }

      .falling::after {
        background: url('@{url}icon_reduce.png') no-repeat;
        background-size: contain;
      }

      .articlePoints {
        font-size: 1vw;
        margin-left: 8%;
      }
    }
  }
</style>
