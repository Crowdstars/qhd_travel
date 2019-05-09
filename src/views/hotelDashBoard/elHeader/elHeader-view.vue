<template>
  <div>
    <el-row :gutter="24" >
      <el-col :lg="12" >
        <div class="date">
          <p class="inner">截止：{{endDate}}</p>
        </div>
        <br>
        <!-- <br> -->
        <p class="title">
          千岛湖
          <br>
          酒店详情分析
        </p>
      </el-col>
      <el-col :lg="4">
        <p class="keyIndicatorValue">
          <span class="value">{{commentKeyIndicatorModel.monthNumCumulant}}条</span>
          <br>
          <span class="keyIndicatorKey">本月累积量</span>
        </p>

        <p class="keyIndicatorValue">
          <span>{{commentKeyIndicatorModel.yearNumCumulant}}条</span>
          <br>
          <span class="keyIndicatorKey">本年累积量</span>
        </p>
      </el-col>
      <el-col :lg="4">
        <p class="keyIndicatorValue">
          <span>{{commentKeyIndicatorModel.monthNumChange}}条</span>
          <br>
          <span class="keyIndicatorKey2">同比变化量</span>
        </p>
        <p class="keyIndicatorValue">
          <span>{{commentKeyIndicatorModel.yearNumChange}}条</span>
          <br>
          <span class="keyIndicatorKey2">同比变化量</span>
        </p>
      </el-col>
      <el-col :lg="4">
        <p class="keyIndicatorValue">
          <span>{{commentKeyIndicatorModel.monthNumPercent}}</span>
          <br>
          <span class="keyIndicatorKey3">同比增长率</span>
        </p>
        <p class="keyIndicatorValue">
          <span>{{commentKeyIndicatorModel.yearNumPercent}}</span>
          <br>
          <span class="keyIndicatorKey3">同比增长率</span>
        </p>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :lg="12">
        <p class="chartTitle">酒店评分 / 评论数分布图</p>
        <div class="chartBoard">
          <el-row :gutter="24">
            <el-col :lg="12">
              <pies-chart :id="HotelScoreId" :hotelScoreData="hotelScoreData"></pies-chart>
            </el-col>
            <el-col :lg="12">
              <pie-charts :id="HotelNumId" :hotelNumData="hotelNumData"></pie-charts>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :lg="12">
        <p class="chartTitle">酒店评论数变化图</p>
        <div class="chartBoard">
          <bar-charts :id="hotelDetailsId"></bar-charts>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PiesChart from "../components/pieCharts/PiesChart";
import PieCharts from "../components/pieCharts/pieCharts";
import BarCharts from "../components/barCharts/BarCharts";
import { IdData } from "../components/pieCharts/util";
import {
  getHotelKeyData,
  getHotelPieChartsNum,
  getHotelPieChartsScore
} from "@/api/hotel";
import { debounce } from "@/utils";
import { getEndDate } from "@/api/dataView";


export default {
  name: "elHeaderView",
  components: {
    PiesChart,
    PieCharts,
    BarCharts
  },
  props: {
    contentHeight: {
      type: Number,
      default: 240
    }
  },
  data() {
    return {
      commentKeyIndicatorModel: {
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
        isYearNumRise: 0
      },
      // //图表id
      HotelNumId: IdData.HotelNumId,
      HotelScoreId: IdData.HotelScoreId,
      hotelDetailsId: "hotelHotChangeChart",
      hotelNumData: [],
      hotelScoreData: [],
      endDate: ""
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
      getHotelKeyData().then(res => {
        if (res.code === 0) {
          this.commentKeyIndicatorModel = res.data.commentKeyIndicatorModel;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    SetOptionHotelNumData() {
      getHotelPieChartsNum().then(res => {
        let self = this;

        res.data.numberList.map((item, index) => {
          this.hotelNumData.push({
            name: item.name,
            value: Math.round(
              (item.value / self.returnSum(res.data.numberList)) * 100
            )
          });
        });
      });
    },
    //设置酒店评分
    SetOptionHotelScoreData() {
      let self = this;
      getHotelPieChartsScore().then(res => {
        res.data.scoreList.map((item, index) => {
          this.hotelScoreData.push({
            name: item.name,
            value: Math.round(
              (item.value / self.returnSum(res.data.scoreList)) * 100
            )
          });
        });
      });
    }
  },
  watch: {},

  mounted() {
    let self = this;
    this.getKeyIndicatorFun();
    this.SetOptionHotelNumData();
    this.SetOptionHotelScoreData();
    getEndDate()
      .then(res => {
        this.endDate = res.data.endDate;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped lang="less">
@url: "../../../assets/screenImage/";
h1 {
  font-family: Georgia;
}

.keyIndicatorValue{
  margin-top: 50px;
  font-size: 24px;
  font-family: SourceHanSansSC-Bold;
  font-weight: bolder;
  color: #4F5359;
}

.keyIndicatorKey, .keyIndicatorKey2, .keyIndicatorKey3 {
  margin-left: 10px;
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(146, 149, 155, 1);
}

.keyIndicatorKey2{
  margin-left: 20px;
}
.keyIndicatorKey3{
 margin-left: 20px; 
}
.value{
  margin-left: 13px;
}
.inner {
  font-size: 13px;
  width: 130px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;

  border: 5px solid #f8de4a;
  border-radius: 4px;
  background: #f8de4a;
}

.chartBoard {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(236, 237, 240, 1);
  padding: 5px;
}
.chartTitle{
  font-size: 18px;
  color: #4F5359;
  font-weight: Medium;
  font-family: SourceHanSansSC-Bold; 
}
.title {
  font-size: 32px;
  font-family: SourceHanSansSC-Bold;
  font-weight: bolder;
  color: #4F5359;
}

</style>
