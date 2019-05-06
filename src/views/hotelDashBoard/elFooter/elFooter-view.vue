<template>
  <div class="foot">
    <div style="margin: 10px;display: flex;align-items: center">
      <img src="../../../assets/DetailsImgs/commentIcon.png" style="width: 20px;height: 20px">
      <span class="chartTitle">酒店评论</span>
    </div>
    <el-tabs v-model="featureWord" @tab-click="tabChange">
      <!-- <el-tab-pane :label="tabsList[0]" name="taste"></el-tab-pane> -->
      <!-- <el-tab-pane :label="tabsList[1]" name="evn"></el-tab-pane> -->
      <el-tab-pane :label="tabsList[0]" name="location"></el-tab-pane>
      <el-tab-pane :label="tabsList[1]" name="server"></el-tab-pane>
      <el-tab-pane :label="tabsList[2]" name="price"></el-tab-pane>
    </el-tabs>
    <el-button :type="goodType" @click="selectGood">{{goodStr}}</el-button>
    <el-button :type="badType" @click="selectBad">{{badStr}}</el-button>

    <el-table
      class="table"
      :data="commentList"
      style="width: 100%;margin-top: 10px"
      tooltip-effect="dark"
      max-height="490"
      :show-header="showHeader"
    >
      <el-table-column class="text" align="left" width="1320">
        <template slot-scope="scope" class="content">
          <span v-html="showDate(scope.row.content)"></span>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: center">
      <el-pagination
        style="margin-top: 5px"
        background
        :current-page.sync="page.currPage"
        :page-size="5"
        :total="page.total"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getHotelComment, getHotelLabelList } from "@/api/hotel";
import { debounce } from "@/utils";
import { getEndDate } from "@/api/dataView";

export default {
  name: "elFooterView",
  components: {},
  props: {
    contentHeight: {
      type: Number,
      default: 240
    }
  },
  data() {
    return {
      //关键词
      featureWord: "price",
      //页数的设置
      page: {
        currPage: 0,
        pageSize: 5,
        totalPage: 0,
        next: 1,
        total: 0
      },
      //首部tab
      tabsList: [],
      goodStr: "",
      badStr: "",
      goodType: "primary",
      badType: "",
      commentList: [],
      //所有的列表
      allComments: [],
      goodComments: [],
      badComments: [],
      //总共的页数

      //走马灯的一些效果
      autoplay: false,
      showHeader: false,
      interval: 9000,
      tag: "",
      keywordComments: [],
      featureWordArray: {
        // 特征词
        location: ["方便", "便捷", "交通", "位置"],
        // taste: [
        //     "好吃",
        //     "新鲜",
        //     "份量大",
        //     "鲜美",
        //     "口感棒",
        //     "口味",
        //     "难吃",
        //     "味道"
        // ],
        // evn: [
        //     "干净",
        //     "整洁",
        //     "方便",
        //     "卫生",
        //     "乱",
        //     "脏",
        //     "差",
        //     "精致",
        //     "热闹",
        //     "恶心",
        //     "不可能",
        //     "装修",
        //     "人气"
        // ],
        server: ["服务", "态度"],
        price: [
          "实惠",
          "推荐",
          "满意",
          "排名",
          "口碑",
          "性价比",
          "强推",
          "差评",
          "失望",
          "不够吃",
          "贵",
          "不会去"
        ]
      }
    };
  },
  methods: {
    tabChange(tab, event) {
      this.featureWord = tab.name;
      this.initComment();
    },
    //为关键字添加上样式
    showDate: function(val) {
      var arr = this.featureWordArray[this.featureWord];
      var temp = val.split(/[,，。\s\.\t!……:;~]/);
      var newStr = [];
      var Str = "";
      for (var i = 0; i < temp.length; i++) {
        // 一句话的数组
        for (var j = 0; j < arr.length; j++) {
          if (temp[i].indexOf(arr[j]) != -1) {
            temp[i] = temp[i].replace(
              temp[i],
              '<font color="#409EFF">' + temp[i] + "</font>"
            );
            break;
          }
        }
      }
      for (var i = 0; i < temp.length; i++) {
        Str += temp[i] + ",";
      }
      return `<span class="comment">` + Str + "<span/>";
    },

    //初始化评论
    initComment() {
      var param = {
        c: this.featureWord
      };
      getHotelLabelList().then(res => {
        var infoList = res.data.infoList;
        this.tabsList.push("位置(" + resultNum[0] + ")");
        this.tabsList.push("服务(" + resultNum[1] + ")");
        this.tabsList.push("性价比(" + resultNum[2] + ")");


      });
      getShopComment(param).then(res => {
        var resultNum = res.resultNum;
        this.tabsList.push("口味(" + resultNum[0] + ")");
        this.tabsList.push("环境(" + resultNum[1] + ")");
        this.tabsList.push("服务(" + resultNum[2] + ")");
        this.tabsList.push("性价比(" + resultNum[3] + ")");

        this.goodType = "primary";
        this.badType = "";
        this.allComments = res.data;
        this.commentList = [];
        this.goodComments = [];
        this.badComments = [];
        this.allComments.forEach(item => {
          if (item.isGood == "1") this.goodComments.push(item);
          else this.badComments.push(item);
        });
        this.goodStr = "好评(" + this.goodComments.length + ")";
        this.badStr = "差评(" + this.badComments.length + ")";
        this.keywordComments = this.goodComments;
        this.page.total = this.goodComments.length;
        this.page.currPage = 1;
        console.log(this.page);
        this.changeComment(1);
      });
    },
    //选择好评和差评
    selectGood() {
      this.goodType = "primary";
      this.badType = "";

      this.keywordComments = this.goodComments;
      this.page.total = this.keywordComments.length;
      this.page.currPage = 1;
      this.changeComment(1);
    },
    selectBad() {
      this.goodType = "";
      this.badType = "primary";

      this.keywordComments = this.badComments;

      this.page.total = this.keywordComments.length;
      this.page.currPage = 1;
      this.changeComment(1);
    },
    //初始化列表
    changeComment: function(currPage) {
      this.commentList = [];
      if (currPage * 5 <= this.keywordComments.length) var ends = currPage * 5;
      else ends = this.keywordComments.length;

      for (var i = (currPage - 1) * 5; i < ends; i++)
        this.commentList.push(this.keywordComments[i]);
    },
    //底部页数发生变化
    handleCurrentChange(value) {
      this.changeComment(value);
    }
  },
  watch: {},

  mounted() {
    this.initComment();
  }
};
</script>
<style scoped lang="less">
.foot {
  font-size: 16px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
}
.comment {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(79, 83, 89, 1);
}
@url: "../../../assets/screenImage/";
</style>
