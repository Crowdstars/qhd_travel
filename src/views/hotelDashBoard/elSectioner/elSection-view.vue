<template>
  <div>
    <div style="margin-bottom: 10px; margin-top:100px;">
      <img
        src="../../../assets/DetailsImgs/listIcon.png"
        style="width: 15px;height: 15px; margin-right:5px;"
      >
      <span class="chartTitle">酒店列表</span>
    </div>
    <div class="select-style">
      <div class="horizontal left top padding10 text-main">
        <span class="noshrink fontStyle" style="margin-top:4px; margin-right:20px; ">商圈:</span>
        <choose-list
          class="margin-left-10"
          :values="businessCirle"
          :select="selectBusines"
          v-on:on-select-change="businessAreaChange"
        />
        <!-- select表示当前列表所选，values表示列表里所有的值 -->
        <!-- v-on 事件监听，监听 on-select-change 事件，该事件由choose-list组件发出，当一个值被选中时发出，比如说 选择 商圈 千岛湖十字街  -->
      </div>

      <div class="horizontal left top padding10 text-main">
        <span class="noshrink fontStyle" style="margin-top:4px; margin-right:20px;">等级:</span>
        <choose-list
          class="margin-left-10"
          :values="trendList"
          :select="selectTrend"
          v-on:on-select-change="cuisineChange"
        />
      </div>
    </div>

    <el-row :gutter="24">
      <el-col :lg="17">
        <el-row
          :gutter="24"
          style="display: flex;align-items: center;
                 height:40px;
                 background:rgba(247,247,247,1);margin-left: 2px;
                 margin-top: 10px;margin-right: 2px"
        >
          <el-col :lg="4">
            <span class="fontStyle small-font">排序方式</span>
            &nbsp;&nbsp;
            <i class="el-icon-d-arrow-right"></i>
          </el-col>
          <el-col :lg="5">
            <el-button type="text" class="fontStyle small-font" :autofocus="autoFocus()" @click="sortList(1,-1)">
              评分从高到低
              <i class="el-icon-download el-icon--right"></i>
            </el-button>
          </el-col>
          <el-col :lg="5">
            <el-button type="text" class="fontStyle small-font" @click="sortList(1,1)">
              评分从低到高
              <i class="el-icon-upload2 el-icon--right"></i>
            </el-button>
          </el-col>
          <el-col :lg="5">
            <el-button type="text" class="fontStyle small-font" @click="sortList(2,-1)">
              评论数从高到低
              <i class="el-icon-download el-icon--right"></i>
            </el-button>
          </el-col>
          <el-col :lg="5">
            <el-button type="text" class="fontStyle small-font" @click="sortList(2,1)">
              评论数从低到高
              <i class="el-icon-upload2 el-icon--right"></i>
            </el-button>
          </el-col>
        </el-row>

        <shop-row
          v-for="item in hotelList"
          :key="item.value"
          :item="item"
          style="margin-top: 20px;"
        />
        <div style="display: flex;justify-content: center">
          <el-pagination
            style="margin-top: 5px"
            background
            @current-change="handleCurrentChange"
            :current-page.sync="page.currPage"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            :total="page.total"
          ></el-pagination>
        </div>
      </el-col>
      <el-col :lg="7">
        <div
          style="margin-top: 10px;background:rgba(255,255,255,1);
                 border:1px solid rgba(236, 237, 240, 1);padding: 5px"
        >
          <div>
            <div style="display: flex;justify-content: space-around;text-align: center">
              <div style="cursor: pointer" @click="selectGoodComment">
                <img v-bind:src="goodCommentImageSrc" class="img-size">
                <p :class="[selectCommentName == 'good' ?'select-comment' :'unselect-comment']">好评榜</p>
                <p/>
              </div>
              <div style="cursor: pointer" @click="selectBadComment">
                <img v-bind:src="badCommentImageSrc" class="img-size">
                <p :class="[selectCommentName == 'bad' ?'select-comment' :'unselect-comment']">差评榜</p>
                <p/>
              </div>
              <div style="cursor: pointer" @click="selectHotComment">
                <img v-bind:src="hotCommentImageSrc" class="img-size">
                <p :class="[selectCommentName == 'hot' ?'select-comment' :'unselect-comment']">热度榜</p>
                <p/>
              </div>
            </div>
          </div>
          <comment-row
            v-for="(item,index) in commentList"
            :item="item"
            :index="index"
            :key="item.value"
            style="margin-top: 5px"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
//展示的排行数据条数
const maxDataNum = 10;
import { site_list } from "../base/dict";
import chooseList from "../components/chooseList/chooseList";
import shopRow from "../components/shop/shop-row";
import commentRow from "../components/comment/comment-row";

import { getHotelSend, getHotelList, getHotelRankList } from "@/api/hotel";
import { constants } from "crypto";

export default {
  name: "elSectionView",
  props: {
    contentHeight: {
      type: Number,
      default: 0
    }
  },
  components: {
    // 用到的组件需要在这里进行定义
    "choose-list": chooseList,
    "shop-row": shopRow,
    "comment-row": commentRow
  },
  data() {
    //data里定义的值在模版里可以直接通过名字来访问, 模版里用到的必须在这里定义
    return {
      loading: true,
      businessCirle: site_list,
      trendList: [],
      selectTrend: "",
      selectBusines: "全部(1171)",
      commentType: 1,
      sortWay: -1,
      hotelList: [],
      page: {
        currPage: 0,
        pageSize: 5,
        totalPage: 0,
        next: 1,
        total: 0
      },
      //餐饮排行列表
      hotelsList: [],
      centerChartHeight: 100,
      goodCommentImageSrc: require("../../../assets/DetailsImgs/goodCommentSelect.png"),
      badCommentImageSrc: require("../../../assets/DetailsImgs/badCommentUnselect.png"),
      hotCommentImageSrc: require("../../../assets/DetailsImgs/hotCommentUnselect.png"),
      //被选中是好评榜，差评榜，还是热度榜
      selectCommentName: "good",
      //所有的评论列表
      allComments: {},
      commentList: []
    };
  },
  mounted() {
    this.initTrend();
    this.initAllComment();
  },
  methods: {
    businessAreaChange(value) {
      this.selectBusines = value;
      //商圈改变后，触发菜系的变化
      this.initTrend();
      this.autoFocus();
    },
    initTrend() {
      console.log("执行initTrend函数");
      var params = this.selectBusines.replace(/\([^\)]*\)/g, "");
      this.trendList = [];
      getHotelSend({
        businessArea: params
      }).then(res => {
        res.data.hotelShopList.forEach(item => {
          this.trendList.push(item._id + "(" + item.countNum + ")");
        });
        this.selectTrend = this.trendList[0];
        this.initHotelList();
      });
    },
    cuisineChange(value) {
      this.selectTrend = value;
      //触发列表的改变
      this.page.currPage = 1;
      this.initHotelList();
      this.autoFocus();
    },
    //初始化菜系
    initHotelList() {
      //去除括号内的东西

      //商圈 菜系等参数拿到
      var params = {
        businessArea: this.selectBusines.replace(/\([^\)]*\)/g, ""),
        hotelRate: this.selectTrend.replace(/\([^\)]*\)/g, ""), //菜系（默认加载全部shopCook: ”全部“）
        pageSize: 5, //每页显示餐馆数量
        sortWay: this.sortWay, //排序方式，降序传-1，升序传1 默认传-1
        commentType: this.commentType, //排序关键字，按照评分传1，按照评论数量传2 默认传1
        currPage: this.page.currPage // 当前页面
      };

      getHotelList(params).then(res => {
        this.hotelList = res.data.hotellist;
        console.log("显示酒店列表 怎么出现了未知数");
        this.page = res.page;
      });
    },
    //排序方式
    sortList(commentType, sortWay) {
      this.page.currPage = 1;
      this.sortWay = sortWay;
      this.commentType = commentType;
      //商圈 菜系等参数拿到
      this.initHotelList();
    },
    //当前页面发生变化的时候
    handleCurrentChange(value) {
      this.page.currPage = value;
      this.initHotelList();
    },

    //选择好评榜
    selectGoodComment() {
      this.goodCommentImageSrc = require("../../../assets/DetailsImgs/goodCommentSelect.png");
      this.badCommentImageSrc = require("../../../assets/DetailsImgs/badCommentUnselect.png");
      this.hotCommentImageSrc = require("../../../assets/DetailsImgs/hotCommentUnselect.png");
      this.selectCommentName = "good";
      this.commentList = this.allComments.goodList;
    },
    //选择差评榜
    selectBadComment() {
      this.goodCommentImageSrc = require("../../../assets/DetailsImgs/goodCommentUnselect.png");
      this.badCommentImageSrc = require("../../../assets/DetailsImgs/badCommentSelect.png");
      this.hotCommentImageSrc = require("../../../assets/DetailsImgs/hotCommentUnselect.png");
      this.selectCommentName = "bad";
      this.commentList = this.allComments.badList;
    },
    //选择热度榜
    selectHotComment() {
      this.goodCommentImageSrc = require("../../../assets/DetailsImgs/goodCommentUnselect.png");
      this.badCommentImageSrc = require("../../../assets/DetailsImgs/badCommentUnselect.png");
      this.hotCommentImageSrc = require("../../../assets/DetailsImgs/hotCommentSelect.png");
      this.selectCommentName = "hot";
      this.commentList = this.allComments.commentNumList;
    },
    //初始化好评榜 差评榜 和热度榜
    initAllComment() {
      getHotelRankList().then(res => {
        this.allComments = res.data;
        this.commentList = this.allComments.goodList;
      });
    },
    autoFocus(){
      console.log("执行autoFocus函数")
      return true;
    }
  }
};
</script>

<style lang="less">
.chartTitle {
  font-size: 18px;
  color: #4f5359;
  font-weight: Medium;
  font-family: SourceHanSansSC-Bold;
}
// .sl-list {
//   margin-top: 20px;
//   overflow: scroll;
// }

.select-style {
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(236, 237, 240, 1);
}

/*
    好评榜 差评榜 被选中时候 与未选中时候样式
    */
.select-comment {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: #e95124;
  // color: #c4dcfc;
  border-bottom: 1px solid #e95124;
}

.unselect-comment {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(131, 138, 147, 1);
}

.img-size {
  width: 40px;
  height: 40px;
}
.noshrink {
  font-size: 15px;
}
.small-font {
  font-size: 14px;
}
i:hover {
  color: rgba(82, 153, 240, 1);
}
.fontStyle {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: #4f5359;
}
</style>
