<template>
  <el-row class="elContainer-elRow-elheader">
    <el-col :lg="8" :xl="8" ref="textScoreContent">
      <el-card class="key-card">
        <div slot="header" class="clearfix">
          <span>餐饮评论数</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <el-row class="elText" :style="{height:contentHeight+'px'}">
          <el-col :lg="24" :xl="24" style="width: 98%;">
            <!-- <el-row type="flex" justify="space-around" align="middle" style="overflow: hidden;">
              <el-col :lg="20" :xl="20" class="elText-title">餐饮评论数</el-col>
            </el-row>-->
            <el-row style="margin-top: 3%">
              <el-col :lg="7" :xl="7">本月积累量</el-col>
              <el-col :lg="8" :xl="8" :offset="1">同比变化量</el-col>
              <el-col :lg="7" :xl="7" :offset="1">同比增长率</el-col>
            </el-row>
            <el-row class="elText-elMonth">
              <el-col :lg="7" :xl="7">
                <span>{{keyIndicatorData.monthNumCumulant}}</span>
                <span class="articlePoints">条</span>
              </el-col>
              <el-col :lg="8" :xl="8" :offset="1">
                <span>{{keyIndicatorData.monthNumChange}}</span>
                <span class="articlePoints">条</span>
              </el-col>
              <el-col :lg="7" :xl="7" :offset="1">
                <span
                  :class="[keyIndicatorData.isMonthNumRise ? 'rising' : 'falling']"
                >{{keyIndicatorData.monthNumPercent}}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 4%">
              <el-col :lg="7" :xl="7">本年累积量</el-col>
              <el-col :lg="8" :xl="8" :offset="1">同比变化量</el-col>
              <el-col :lg="7" :xl="7" :offset="1">同比增长率</el-col>
            </el-row>
            <el-row class="elText-elYear">
              <el-col :lg="7" :xl="7">
                <span>{{keyIndicatorData.yearNumCumulant}}</span>
                <span class="articlePoints">条</span>
              </el-col>
              <el-col :lg="8" :xl="8" :offset="1">
                <span>{{keyIndicatorData.yearNumChange}}</span>
                <span class="articlePoints">条</span>
              </el-col>
              <el-col :lg="7" :xl="7" :offset="1">
                <span
                  :class="[keyIndicatorData.isYearNumRise ? 'rising' : 'falling']"
                >{{keyIndicatorData.yearMonthPercent}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <!--echarts图-->
    <el-col :lg="8" :xl="8" class="elContent">
      <el-card class="line-card">
        <div slot="header" class="clearfix">
          <span>餐饮评论数变化图</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <!--标题-->
         <!-- <el-row
          type="flex"
          justify="start"
          align="middle"
          class="elBgd"
          ref="chartTitleHeight"
          :style="{'padding': contentHeight * 0.003 + 'px'}"
        > -->
          <!-- <el-col :lg="2" :xl="2">
            <img
              class="elImage"
              :width="contentHeight * 0.15 + 'px'"
              src="../../../assets/screenImage/barIcon.png"
            >
        </el-col> -->
        
        <!-- <el-col :lg="14" :xl="14" class="elTitle">餐饮评论数变化图</el-col> -->
        <!-- </el-row> -->
        <!--内容-->
        <!-- <el-row class="elCtBgd" :style="{'padding': contentHeight * 0.05 + 'px'}"> -->
        <el-row class="elCtBgd">
          <el-col :lg="24" :xl="24">
            <line-charts :id="restaurantDetailsId" :height="centerChartHeight*0.7 + 'px'"></line-charts>
          </el-col>
        </el-row>
      </el-card>
    </el-col>

    <el-col :lg="8" :xl="8" class="elContent">
      <el-card class="pie-card">
        <el-row>
          <el-col :lg="12" :xl="12">
            <el-card shadow="never" class="num-card">
              <div slot="header" class="clearfix">
                <span>餐饮评论数分布</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
              </div>
              <div>
               <pie-charts
                  :id="RestNumId"
                  :restNumData="data1"
                  :height="centerChartHeight * 0.95 + 'px'"
                >
                  
                 </pie-charts>
              </div>
            </el-card>
            <!-- <div slot="header" class="clearfix"><span>餐饮评论数分布</span></div> -->
            <!--标题-->
            <el-row
              type="flex"
              justify="start"
              align="middle"
              class="elBgd"
              ref="chartTitleHeight"
              :style="{'padding': contentHeight * 0.05 + 'px'}"
            >
              <!-- <el-col :lg="3" :xl="3">
                <img
                  class="elImage"
                  :width="contentHeight * 0.15 + 'px'"
                  src="../../../assets/screenImage/pieIcon.png"
                >
              </el-col>-->
              <!-- <el-col :lg="18" :xl="18" class="elTitle threeTip">餐饮评论数分布</el-col> -->
              <!-- <div class="clearfix">
                <span>餐饮评论数分布</span>
              </div> -->
            </el-row>
            <!--内容-->
            <!-- <el-row class="elCtBgd">
              <el-col :lg="24" :xl="24" class="chartFontSizeStyle"> -->
                <!-- <pie-charts
                  :id="RestNumId"
                  :restNumData="data1"
                  :height="centerChartHeight * 0.95 + 'px'"
                > -->
                  <!-- <span class="one">酒店</span> -->
                <!-- </pie-charts>
              </el-col> -->
            <!-- </el-row> -->
          </el-col>
          <el-col :lg="12" :xl="12">
            <!--标题-->
            <el-row
              type="flex"
              justify="start"
              align="middle"
              class="elBgd"
              :style="{'padding': contentHeight * 0.05 + 'px'}"
            >
              <!-- <el-col :lg="3" :xl="3">
                <img
                  class="elImage"
                  :width="contentHeight * 0.15 + 'px'"
                  src="../../../assets/screenImage/pieIcon.png"
                >
              </el-col>-->
              <el-col :lg="18" :xl="18" class="elTitle threeTip">餐饮评分分布</el-col>
            </el-row>
            <!--内容-->
            <el-row class="elCtBgd">
              <el-col :lg="24" :xl="24" class="chartFontSizeStyle">
                <pies-chart
                  :id="RestScoreId"
                  :restScoreData="data2"
                  :height="centerChartHeight * 0.95 + 'px'"
                ></pies-chart>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
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
  name: "elHeaderView",
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
      restaurantDetailsId: "restaurantHotChangeChart",
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
        isYearNumRise: 0
      },
      //图表id
      RestScoreId: IdData.RestScoreId,
      RestNumId: IdData.RestNumId,
      //图表数据
      data1: [],
      data2: []
    };
  },
  methods: {
    //求和
    returnSum(data) {
      let sum = 0;
      data.map((item, index) => {
        sum += item.value;
      });
      return sum;
    },
    //获取关键指标数据
    getKeyIndicatorFun: function() {
      getShopKeyData().then(res => {
        if (res.code === 0) {
          this.keyIndicatorData = res.commentKeyIndicatorModel;
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
            name: item.name,
            value: Math.round(
              (item.value / self.returnSum(res.data.numberList)) * 100
            )
          });
        });
      });
    },
    //设置酒店餐馆评分
    SetOptionRestScoreData() {
      let self = this;
      getRestaurantPieChartsScore().then(res => {
        res.data.scoreList.map((item, index) => {
          this.data2.push({
            name: item.name,
            value: Math.round(
              (item.value / self.returnSum(res.data.scoreList)) * 100
            )
          });
        });
      });
    },

    //初始化图表高度
    loadCenterChartHeight() {
      this.centerChartHeight =
        this.contentHeight - this.$refs.chartTitleHeight.$el.clientHeight;
    }
  },
  watch: {
    attractionsList() {
      this.SetOptionRestNumData();
      this.SetOptionRestScoreData();
      //延时触发高度调整
      if (!this.screenHeightTimer) {
        this.screenHeightTimer = true;
        let self = this;
        setTimeout(function() {
          self.loadCenterChartHeight();
          self.screenHeightTimer = false;
        }, 400);
      }
    },
    contentHeight() {
      //延时触发高度调整
      if (!this.screenHeightTimer) {
        this.screenHeightTimer = true;
        let self = this;
        setTimeout(function() {
          self.loadCenterChartHeight();
          self.screenHeightTimer = false;
        }, 400);
      }
    }
  },

  mounted() {
    let self = this;
    this.getKeyIndicatorFun();
    this.SetOptionRestNumData();
    this.SetOptionRestScoreData();
    this.$nextTick(() => {
      this.centerChartHeight =
        this.contentHeight - this.$refs.chartTitleHeight.$el.clientHeight;
      /** 自适应页面高度 */
      this.__resizeHandler = debounce(() => {
        self.loadCenterChartHeight();
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.__resizeHandler);
  }
};
</script>
<style scoped lang="less">
@url: "../../../assets/screenImage/";
.elContainer-elRow-elheader {
  //   width: 100%;

  //   .elText {
  //     background-size: 100% 100%;
  //     padding: 1% 2%;
  //     width: 98.16667%;
  //     padding-left: 5%;

  //     &-images {
  //       float: left;
  //     }

  //     &-title {
  //       font-size: 1.5vw;
  //     }

  //     &-elMonth,
  //     &-elYear {
  //       font-size: 1.6vw;
  //     }

  //上升
  .rising {
    position: relative;
  }

  //下降
  .falling {
    position: relative;
  }

  .rising::after,
  .falling::after {
    content: "";
    display: inline-block;
    width: 1vw;
    height: 2.5vh;
    margin-left: 0.5rem;
    position: absolute;
    margin-top: 5%;
  }

  .rising::after {
    background: url("@{url}icon_growth.png") no-repeat;
    background-size: contain;
  }

  .falling::after {
    background: url("@{url}icon_reduce.png") no-repeat;
    background-size: contain;
  }

  //     .articlePoints {
  //       font-size: 1vw;
  //       margin-left: 8%;
  //     }
  //   }
}

.clearfix:after {
  clear: both;
}

// .key-card {
//   width: 455px;
// }
// .line-card {
//   width: 522px;
// }
// .pie-card{
//   width: 520px;
// }
.key-card,
.line-card,
.pie-card {
  width: 520px;
  height: 210px;
  cursor: pointer;
}
.num-card{
  padding: 0px;
  margin: 0px;
  border: 0px;
}
</style>
