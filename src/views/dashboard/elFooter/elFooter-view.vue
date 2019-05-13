<template>
  <el-row :gutter="10" class="elContainerFooter">
    <el-col :lg="7" :xl="7" class="elContent">
      <!--标题-->
      <el-row
        type="flex"
        justify="space-around"
        align="middle"
        class="elBgd"
        :style="{'padding': contentHeight * 0.05 + 'px'}"
      >
        <el-col :lg="2" :xl="2">
          <img
            class="elImage"
            :width="contentHeight * 0.15 + 'px'"
            src="../../../assets/screenImage/icon_attractions_list.png"
          >
        </el-col>
        <el-col :lg="14" :xl="14" class="elTitle threeTip">景点 排行榜</el-col>
        <el-col :lg="8" :xl="8" class="elFontSize">
          <a :href="attractionsDetailUrl" target="_blank">查看详情</a>
        </el-col>
      </el-row>
      <!--内容-->
      <el-row class="elLBgd" :style="{'padding': contentHeight * 0.05 + 'px'}">
        <el-col :lg="24" :xl="24">
          <el-row class="elBorder">
            <el-col :lg="8" :xl="8">景区</el-col>
            <el-col :lg="8" :xl="8">评分</el-col>
            <el-col :lg="8" :xl="8">评论数</el-col>
          </el-row>
        </el-col>
        <el-col
          class="elRowContent"
          :lg="24"
          :xl="24"
          :style="{'max-height': centerChartHeight * 0.72 +'px'}"
        >
          <el-row
            class="elBorder content-name"
            v-for="(item,index) in attractionsList"
            :key="index"
          >
            <el-col :lg="8" :xl="8" class="elBR">{{item._id}}</el-col>
            <el-col :lg="8" :xl="8">{{item.commentScore}}</el-col>
            <el-col :lg="8" :xl="8">{{item.commentNumber}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <!--echarts图-->
    <el-col :lg="10" :xl="10" class="elContent">
      <el-row>
        <el-col :lg="12" :xl="12">
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
                src="../../../assets/screenImage/pieIcon.png"
              >
            </el-col>
            <el-col :lg="22" :xl="22" class="elTitle threeTip">酒店和餐饮评论数分布</el-col>
          </el-row>
          <!--内容-->
          <el-row class="elCtBgd">
            <el-col :lg="24" :xl="24" class="chartFontSizeStyle">
              <pie-charts
                :id="hotelRestNumId"
                :restNumData="data3"
                :hotelNumData="data1"
                :height="centerChartHeight * 0.95 + 'px'"
              >
                <span class="one">酒店</span>
                <span>餐饮</span>
              </pie-charts>
            </el-col>
          </el-row>
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
            <el-col :lg="2" :xl="2">
              <img
                class="elImage"
                :width="contentHeight * 0.15 + 'px'"
                src="../../../assets/screenImage/pieIcon.png"
              >
            </el-col>
            <el-col :lg="20" :xl="20" class="elTitle threeTip">酒店和餐饮评分分布</el-col>
          </el-row>
          <!--内容-->
          <el-row class="elCtBgd">
            <el-col :lg="24" :xl="24" class="chartFontSizeStyle">
              <pies-chart
                :id="hotelRestScoreId"
                :hotelScoreData="data2"
                :restScoreData="data4"
                :height="centerChartHeight * 0.95 + 'px'"
              >
                <span class="one">酒店</span>
                <span>餐饮</span>
              </pies-chart>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <el-col :lg="7" :xl="7" class="elContent">
      <!--标题-->
      <el-row
        type="flex"
        align="middle"
        class="elBgd"
        :style="{'padding': contentHeight * 0.05 + 'px'}"
      >
        <el-col :lg="2" :xl="2">
          <img
            class="elImage"
            :width="contentHeight * 0.15 + 'px'"
            src="../../../assets/screenImage/icon_hotel_list.png"
          >
        </el-col>
        <el-col :lg="14" :xl="14" class="elTitle threeTip">酒店 排行榜</el-col>
        <el-col :lg="8" :xl="8" class="elFontSize">
          <a href="#/hotel">查看详情</a>
        </el-col>
      </el-row>
      <!--内容-->
      <el-row class="elRBgd">
        <el-col :lg="24" :xl="24">
          <el-row class="elBorder">
            <el-col :lg="10" :xl="10" :offset="4">酒店</el-col>
            <el-col :lg="5" :xl="5">评分</el-col>
            <el-col :lg="5" :xl="5">评论数</el-col>
          </el-row>
        </el-col>
        <el-col
          class="elRowContent"
          :lg="24"
          :xl="24"
          :style="{'max-height': centerChartHeight * 0.85 +'px'}"
        >
          <el-row class="elBorder" v-for="(item,index) in hotelList" :key="index">
            <el-col :lg="4" :xl="4">
              <span class="elBefore">{{index + 1 }}</span>
            </el-col>
            <el-col
              class="item-name"
              :lg="10"
              :xl="10"
              :title="item._id"

            >{{item._id}}</el-col>
            <el-col :lg="5" :xl="5" class="fontsetNum">{{item.commentScore}}</el-col>
            <el-col :lg="5" :xl="5" class="fontsetNum">{{item.commentNumber}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import PiesChart from "../components/pieCharts/PiesChart";
import PieCharts from "../components/pieCharts/pieCharts";
import {
  getHotelScorePieCharts,
  getHotelNumPieCharts,
  getRestaurantPieChartsNum,
  getRestaurantPieChartsScore
} from "@/api/dataView";
import { IdData } from "../components/pieCharts/util";
import { debounce } from "@/utils";
import { getSpotRank, getHotelRank } from "@/api/dataView";
import { getToken } from "@/utils/auth";
//展示的排行数据条数
const maxDataNum = 10;
export default {
  name: "elFooterView",
  props: {
    contentHeight: {
      type: Number,
      default: 0
    }
  },
  components: {
    PiesChart,
    PieCharts
  },
  data() {
    return {
      //景点排行列表
      attractionsList: [],
      //酒店排行列表
      hotelList: [],
      //图表id
      hotelRestScoreId: IdData.hotelRestScoreId,
      hotelRestNumId: IdData.hotelRestNumId,
      //图表数据
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      //图表高度
      centerChartHeight: 100
    };
  },
  computed: {
    //景点详情链接
    attractionsDetailUrl() {
      return this.$config.detailUrl + "/qdhScenic?token=" + getToken();
    }
  },
  methods: {
    //获取景点排行列表
    getSpotRankFun: function() {
      getSpotRank().then(res => {
        if (res.code === 0) {
          //获取Top5的数据
          this.attractionsList = res.qdhlist
            ? res.qdhlist.slice(0, maxDataNum)
            : [];
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //获取酒店排行列表
    getHotelRankFun: function() {
      getHotelRank().then(res => {
        if (res.code === 0 && res.data) {
          //获取Top5的数据
          this.hotelList = res.data.goodList
            ? res.data.goodList.slice(0, maxDataNum)
            : [];
        } else {
          this.$message.error(res.message);
        }
      });
    },
    //求和
    returnSum(data) {
      let sum = 0;
      data.map((item, index) => {
        sum += item.value;
      });
      return sum;
    },
    //设置酒店餐馆评论数
    SetOptionHotelRestNumData() {
      getHotelNumPieCharts().then(res => {
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
      getRestaurantPieChartsNum().then(res => {
        let self = this;
        res.data.numberList.map((item, index) => {
          this.data3.push({
            name: item.name,
            value: Math.round(
              (item.value / self.returnSum(res.data.numberList)) * 100
            )
          });
        });
      });
    },
    //设置酒店餐馆评分
    SetOptionHotelRestScoreData() {
      let self = this;
      getHotelScorePieCharts().then(res => {
        res.data.scoreList.map((item, index) => {
          this.data2.push({
            name: item.name,
            value: Math.round(
              (item.value / self.returnSum(res.data.scoreList)) * 100
            )
          });
        });
      });
      getRestaurantPieChartsScore().then(res => {
        res.data.scoreList.map((item, index) => {
          this.data4.push({
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
    },
    //打开酒店详情页面
    toViewHotelDetail(item) {
      const url =
        this.$config.detailUrl +
        "/hotelsingleshow/?hotelname=" +
        item._id +
        "&hotelrate=" +
        item.shopRate +
        "&currpage=1&token=" +
        getToken();
      window.open(url);
    }
  },
  watch: {
    attractionsList() {
      this.SetOptionHotelRestNumData();
      this.SetOptionHotelRestScoreData();
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
  created() {
    this.getSpotRankFun();
    this.getHotelRankFun();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.centerChartHeight =
        this.contentHeight - this.$refs.chartTitleHeight.$el.clientHeight;
      /** 自适应页面高度 */
      this.__resizeHandler = debounce(() => {
        self.loadCenterChartHeight();
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    });
  }
};
</script>
<style scoped lang="less">
@url: "../../../assets/screenImage/";
.fontsetNum {
  color: aliceblue;
  font-size: 15px;
}
@media (max-width: 1400px) {
  .elContainerFooter {
    .elContent {
      .elTitle {
        font-size: 16px !important;
      }

      .threeTip::after {
        font-size: 6px !important;
        bottom: -100% !important;
      }
    }
  }
}
.content-name {
  color: aliceblue;
}

.elContainerFooter {
  width: 100%;

  .elContent {
    .elBgd {
      background: url("@{url}title.png") no-repeat;
      background-size: 100% 100%;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .elImage {
      height: 20px;
      width: 20px;
      float: left;
    }

    &-elCenterImage {
      width: 10%;
      margin-top: 1%;
    }

    .elFontSize {
      float: right;
      width: 60%;
      text-align: right;
      color: #006fff;
      font-size: 13px;
    }

    .elTitle {
      padding: 0 10px;
      font-size: 20px;
    }

    .threeTip {
      position: relative;

      // &::after {
      //     color: #006FFF;
      //     content: '（近三个月综合数据统计）';
      //     display: inline-block;
      //     position: absolute;
      //     font-size: 8px;
      //     left: 0;
      //     bottom: -100%;
      // }
    }

    .elLink {
      float: right;
    }

    //内容
    .elCtBgd {
      background: url("@{url}bgrImage.png") no-repeat;
      background-size: 100% 100%;
      padding: 2% 5%;
    }

    .elLBgd {
      background: url("@{url}lImage.png") no-repeat;

      .elBorder {
        .elBR:last-child {
          border-radius: 0 0 8% 19%;
        }

        .click-cursor {
          cursor: pointer;
        }

        div {
          border: 1px solid #0e367f;
          width: 32.4%;
          padding: 0.6% 0;
          margin: 0.1% 0.1%;
        }
      }
    }

    .elRBgd {
      background: url("@{url}rImage.png") no-repeat;

      .elBorder {
        margin: 0.5% 0px;

        .elBefore {
          display: inline-block;
          padding: 2% 10%;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          background: #40f1ff;
          color: black;
        }

        .item-name {
          font-size: 15px;
          color: aliceblue;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          background: #062863;
          border: 1px solid #0e367f;
        }

        .click-cursor {
          cursor: pointer;
        }

        div {
          padding: 0.5% 0;
        }
      }
    }

    .elLBgd,
    .elRBgd {
      text-align: center;
      background-size: 100% 100%;

      .elRowContent {
        overflow: auto;
      }
    }
  }
}
</style>
<style scoped>
.chartFontSizeStyle div.chart {
  position: relative;
}

.chartFontSizeStyle span {
  position: absolute;
  display: inline-block;
  text-align: center;
  color: #fff;
  right: 24%;
  bottom: 12%;
  transform: translate(0, -3%);
}

.chartFontSizeStyle span.one {
  position: absolute;
  display: inline-block;
  text-align: center;
  color: #fff;
  right: 68%;
  bottom: 12%;
  transform: translate(0, 3%);
}
</style>
