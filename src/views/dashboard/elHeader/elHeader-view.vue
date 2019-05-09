<template>
  <el-row class="elContainer-elRow-elheader">
    <el-col :lg="7" :xl="7" ref="textScoreContent">
      <el-row class="elText" :style="{height:contentHeight+'px'}">
        <el-col :lg="24" :xl="24" style="width: 98%;">
          <el-row type="flex" justify="space-around" align="middle" style="overflow: hidden;">
            <el-col :lg="2" :xl="2">
              <img
                class="elText-images"
                :width="contentHeight * 0.02 + 'px'"
                src="../../../assets/screenImage/icon_score.png"
              >
            </el-col>
            <el-col :lg="22" :xl="22" class="elText-title">景区评分</el-col>
          </el-row>
          <el-row style="margin-top: 3%">
            <el-col :lg="8" :xl="8">本月综合评分</el-col>
            <el-col :lg="9" :xl="9" :offset="1" style="margin-bottom: 4px;">同比变化量</el-col>
            <el-col :lg="5" :xl="5" :offset="1">同比增长率</el-col>
          </el-row>
          <el-row class="elText-elMonth">
            <el-col :lg="8" :xl="8">
              <span>{{keyIndicatorData.monthScoreCumulant}}</span>
              <span class="articlePoints">分</span>
            </el-col>
            <el-col :lg="8" :xl="8" :offset="1">
              <span
                v-html="showText(keyIndicatorData.monthScoreChange)"
              >{{keyIndicatorData.monthScoreChange}}</span>
              <span class="articlePoints">分</span>
            </el-col>
            <el-col :lg="6" :xl="6" :offset="1">
              <span
                :class="[keyIndicatorData.isMonthScoreRise ? 'rising' : 'falling']"
                v-html="showText(keyIndicatorData.monthScorePercent)"
              >{{keyIndicatorData.monthScorePercent}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 5%">
            <el-col :lg="8" :xl="8">本年综合评分</el-col>
            <el-col :lg="9" :xl="5" :offset="1" style="margin-bottom: 4px;">同比变化量</el-col>
            <el-col :lg="5" :xl="5" :offset="1">同比增长率</el-col>
          </el-row>
          <el-row class="elText-elYear">
            <el-col :lg="8" :xl="8">
              <span>{{keyIndicatorData.yearScoreCumulant}}</span>
              <span class="articlePoints">分</span>
            </el-col>
            <el-col :lg="8" :xl="8" :offset="1">
              <span
                v-html="showText(keyIndicatorData.yearScoreChange)"
              >{{keyIndicatorData.yearScoreChange}}</span>
              <span class="articlePoints">分</span>
            </el-col>
            <el-col :lg="6" :xl="6" :offset="1">
              <span
                :class="[keyIndicatorData.isYearScoreRise ? 'rising' : 'falling']"
                v-html="showText(keyIndicatorData.yearScorePercent)"
              >{{keyIndicatorData.yearScorePercent}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <!--echarts图-->
    <el-col :lg="10" :xl="10" class="elMap" style="padding-right: 0.55%;">
      <scatter-charts :height="contentHeight + 'px'"/>
    </el-col>
    <el-col :lg="7" :xl="7">
      <el-row class="elText" :style="{height:contentHeight+'px'}">
        <el-col :lg="24" :xl="24" style="width: 98%;">
          <el-row type="flex" justify="space-around" align="middle" style="overflow: hidden;">
            <el-col :lg="2" :xl="2">
              <img
                class="elText-images"
                :width="contentHeight * 0.2 + 'px'"
                src="../../../assets/screenImage/icon_comments.png"
              >
            </el-col>
            <el-col :lg="22" :xl="22" class="elText-title">景区评论数</el-col>
          </el-row>
          <el-row style="margin-top: 3%">
            <el-col :lg="8" :xl="8">本月累积量</el-col>
            <el-col :lg="8" :xl="8" :offset="1" style="margin-bottom: 4px;">同比变化量</el-col>
            <el-col :lg="5" :xl="5" :offset="1">同比增长率</el-col>
          </el-row>
          <el-row class="elText-elMonth">
            <el-col :lg="8" :xl="8">
              <span>{{keyIndicatorData.monthNumCumulant}}</span>
              <span class="articlePoints">条</span>
            </el-col>
            <el-col :lg="7" :xl="7" :offset="1">
              <span
                v-html="showText(keyIndicatorData.monthNumChange)"
              >{{keyIndicatorData.monthNumChange}}</span>
              <span class="articlePoints">条</span>
            </el-col>
            <el-col :lg="7" :xl="7" :offset="1">
              <span
                :class="[keyIndicatorData.isMonthNumRise ? 'rising' : 'falling']"
                v-html="showText(keyIndicatorData.monthNumPercent)"
              >{{keyIndicatorData.monthNumPercent}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 4%">
            <el-col :lg="8" :xl="8">本年累积量</el-col>
            <el-col :lg="8" :xl="8" :offset="1" style="margin-bottom: 4px;">同比变化量</el-col>
            <el-col :lg="5" :xl="5" :offset="1">同比增长率</el-col>
          </el-row>
          <el-row class="elText-elYear">
            <el-col :lg="8" :xl="8">
              <span>{{keyIndicatorData.yearNumCumulant}}</span>
              <span class="articlePoints">条</span>
            </el-col>
            <el-col :lg="7" :xl="7" :offset="1">
              <span
                v-html="showText(keyIndicatorData.yearNumChange)"
              >{{keyIndicatorData.yearNumChange}}</span>
              <span class="articlePoints">条</span>
            </el-col>
            <el-col :lg="7" :xl="7" :offset="1">
              <span
                :class="[keyIndicatorData.isYearNumRise ? 'rising' : 'falling']"
                v-html="showText(keyIndicatorData.yearNumPercent)"
              >{{keyIndicatorData.yearNumPercent}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { getKeyIndicator } from "@/api/dataView";
import { debounce } from "@/utils";
import scatterCharts from "../components/scatterCharts";

export default {
  name: "elHeaderView",
  components: {
    scatterCharts
  },
  props: {
    contentHeight: {
      type: Number,
      default: 240
    }
  },
  data() {
    return {
      //元素高度
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
        yearNumPercent: "0",
        //本月评论数量是否上升 0 表示下降 1表示上升
        isMonthNumRise: 0,
        //本年评分数量是否上升 0 表示下降 1表示上升
        isYearNumRise: 0,
        //本月评分
        monthScoreCumulant: 0,
        //本年评分
        yearScoreCumulant: 0,
        //本月评分变化量
        monthScoreChange: 0,
        //本年评分变化量
        yearScoreChange: 0,
        //本月同比评分变化量
        monthScorePercent: "0",
        //本年同比评分变化量
        yearScorePercent: "0",
        //本月分数是否上升 0表示下降1表示上升
        isMonthScoreRise: 0,
        //本年分数是否上升 0表示下降1表示上升
        isYearScoreRise: 0
      }
    };
  },
  methods: {
    //获取关键指标数据
    getKeyIndicatorFun: function() {
      console.log("执行getKeyIndicatorFun()函数");
      getKeyIndicator().then(res => {
        if (res.code === 0) {
          this.keyIndicatorData = res.data;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    showText: function(val) {
      // console.log("正在执行showText()函数");
      // console.log(typeof(val));
      var t = val.toString();
      var str = t.substr(0,1);
      var value = "",
          newstr = "",
          textColor = "";
      if (str == "+") {
        value = "+";
        textColor = "red";
      }
      if (str == "-") {
        value = "-";
        textColor = "chartreuse";
      }
      var temp = t.split(/\s/);
      newstr = t.replace(
        temp[0],
        "<span style='color: " + textColor + ";'>" + value + "</span>"
      );
      console.log(newstr);
      return newstr;
    }
  },
  mounted() {
    let self = this;
    this.getKeyIndicatorFun();
    this.$nextTick(() => {
      self.textScoreContentHeight =
        self.$refs.textScoreContent.$el.clientHeight;
      /** 自适应页面高度 */
      this.__resizeHandler = debounce(() => {
        self.textScoreContentHeight =
          self.$refs.textScoreContent.$el.clientHeight;
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
// .elText-elMonth,
// .elText-elYear {
//   color: rgb(255, 251, 246);
//   font-size: 18px;
// }
.elContainer-elRow-elheader {
  width: 100%;

  .elText {
    background-size: 100% 100%;
    padding-top: 5%;
    // padding: 1% 2%;
    width: 98.16667%;
    padding-left: 3%;

    &-images {
      height: 20px;
      width: 20px;
      float: left;
      padding-bottom: 4%;
    }

    &-title {
      //   font-size: 1.5vw;
      font-size: 20px;
      padding-bottom: 2%;
    }

    &-elMonth,
    &-elYear {
      color: rgb(255, 255, 255);
      //   color:chartreuse
      font-size: 24px;
      //   font-size: 1.6vw;
    }

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

    .articlePoints {
      color: rgb(146, 230, 245);
      font-size: 15px;
      //   font-size: 1vw;
      margin-left: 3%;
    }
  }
}
</style>
