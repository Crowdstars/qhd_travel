<template>
  <div class="foot">
    <div style="margin-bottom: 10px; margin-top: 100px;display: flex;align-items: center">
      <img
        src="../../../assets/DetailsImgs/commentIcon.png"
        style="width: 15px;height: 15px; margin-right: 5px;"
      >
      <span class="chartTitle">餐饮评论</span>
    </div>
    <el-tabs v-model="featureWord" @tab-click="handleClick">
      <el-tab-pane :label="tabsList[0]" name="口味"></el-tab-pane>
      <el-tab-pane :label="tabsList[1]" name="环境"></el-tab-pane>
      <el-tab-pane :label="tabsList[2]" name="服务"></el-tab-pane>
      <el-tab-pane :label="tabsList[3]" name="性价比"></el-tab-pane>
    </el-tabs>
    <el-button :type="goodButton" icon="el-icon-success" @click="selectGood">{{goodStr}}</el-button>
    <el-button :type="badButton" icon="el-icon-error" @click="selectBad">{{badStr}}</el-button>

    <el-table
      :data="commentList"
      class="text"
      align="left"
      width="1320"
      :row-class-name="tableRowClassName"
      :height="changeHeightName()"
    >
      <!-- <el-table-column type="index"></el-table-column> -->
      <el-table-column class="text" align="left" width="1320">
        <template slot-scope="scope" class="content">
          <span v-html="showDate(scope.row.content)"></span>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        class="comment"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[6,12,24]"
        layout="total, prev, pager, next, jumper, sizes"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getShopLabelList, getShopComment } from "@/api/restaurant";

export default {
  data() {
    return {
      infoList: [], // 后台接口/api/qdhhotelcomtagsum所有数据
      tabsList: [],
      commentList: [],
      featureWord: "口味",
      goodButton: "primary",
      badButton: "",
      goodStr: "",
      badStr: "",
      currPage: 1,
      pageSize: 6,
      commentClass: 1,
      total: 0,
      totalpage: 0,
      goodNum: 0,
      badNum: 0,

      featureWordArray: {
        // 特征词
        服务: ["服务", "态度"],
        口味: [
          "好吃",
          "新鲜",
          "份量大",
          "鲜美",
          "口感棒",
          "口味",
          "难吃",
          "味道"
        ],
        环境: [
          "干净",
          "整洁",
          "卫生",
          "乱",
          "脏",
          "精致",
          "装修",
          "人气",
          "环境"
        ],
        性价比: ["实惠", "口碑", "性价比", "不够吃", "贵", "不会去", "价格"]
      }
    };
  },
  mounted() {
    this.initTabsList();
  },
  methods: {
    // 初始化标签列表
    initTabsList: function() {
      console.log("执行initTabsList");
      getShopLabelList().then(res => {
        console.log(111111111111);
        this.infoList = res.data["infoList"];
        console.log("this.infoList");
        console.log(this.infoList);
        var resultNum = [];
        for (var i = 0; i < this.infoList.length; i++) {
          if (this.infoList[i].name === "口味") {
            var array = this.infoList[i];
            resultNum[0] = array.count[0] + array.count[1];
            continue;
          }
          if (this.infoList[i].name === "环境") {
            var array = this.infoList[i];
            resultNum[1] = array.count[0] + array.count[1];
            continue;
          }
          if (this.infoList[i].name === "服务") {
            var array = this.infoList[i];
            resultNum[2] = array.count[0] + array.count[1];
          }
          if (this.infoList[i].name === "性价比") {
            var array = this.infoList[i];
            resultNum[3] = array.count[0] + array.count[1];
          }
        }
        this.tabsList.push("口味(" + resultNum[0] + ")");
        this.tabsList.push("环境(" + resultNum[1] + ")");
        this.tabsList.push("服务(" + resultNum[2] + ")");
        this.tabsList.push("性价比(" + resultNum[3] + ")");

        this.initButtonList(this.featureWord);
        this.loadCommentList(
          this.featureWord,
          this.currPage,
          this.pageSize,
          this.commentClass
        );
      });
    },

    // 初始化按钮列表
    initButtonList: function(value) {
      console.log("执行initButtonList, value=");
      var array = this.infoList;
      for (var i = 0; i < array.length; i++) {
        if (value === array[i].name) {
          var obj = array[i].count;
          this.badNum = obj[0];
          this.goodNum = obj[1];
          this.badStr = "差评(" + obj[0] + ")";
          this.goodStr = "好评(" + obj[1] + ")";
        }
        this.selectGood();
      }
    },

    // 标签变更事件 this.featureWord变更
    handleClick(tab, event) {
      console.log(
        "执行handleClick函数 this.featureWord变更，需要相应更新应用到的函数"
      );
      this.featureWord = tab.name; // location
      this.initButtonList(this.featureWord);
      this.loadCommentList(
        this.featureWord,
        this.currPage,
        this.pageSize,
        this.commentClass
      );
    },

    // 加载评论列表信息
    loadCommentList: function(featureWord, currPage, pageSize, commentClass) {
      console.log("执行loadCommentList函数");
      var param = {
        featureWord: featureWord,
        currPage: currPage,
        pageSize: pageSize,
        commentClass: commentClass
      };
      getShopComment(param).then(res => {
        this.commentList = res.data.commentList;
      });
    },

    // 总数变更
    loadTotal: function(totalNum) {
      console.log("执行loadTotalPage函数，总页数变更");
      this.total = totalNum;
    },

    // 点击好评 事件 this.commentClass变更
    selectGood: function() {
      console.log("点击好评事件");
      this.goodButton = "primary";
      this.badButton = "";
      this.commentClass = 1;
      this.currPage = 1;
      this.loadCommentList(
        this.featureWord,
        this.currPage,
        this.pageSize,
        this.commentClass
      );
      this.loadTotal(this.goodNum);
    },

    // 点击差评事件 this.commentClass变更
    selectBad: function() {
      console.log("点击差评事件");
      this.badButton = "primary";
      this.goodButton = "";
      this.commentClass = -1;
      this.currPage = 1;
      this.loadCommentList(
        this.featureWord,
        this.currPage,
        this.pageSize,
        this.commentClass
      );
      this.loadTotal(this.badNum);
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.currPage = 1;
      console.log(`每页 ${val} 条`);
      this.loadCommentList(
        this.featureWord,
        this.currPage,
        this.pageSize,
        this.commentClass
      );
    },
    handleCurrentChange(val) {
      console.log("当前页数变更，执行handleCurrentChang函数");
      this.currPage = val;
      this.loadCommentList(
        this.featureWord,
        this.currPage,
        this.pageSize,
        this.commentClass
      );
      console.log(`当前页: ${val}`);
    },

    // 特征句子高亮显示
    showDate: function(val) {
      console.log("执行showDate函数");
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
              '<u><font color="#ED8B34">' + temp[i] + "</font></u>"
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
    // 表格颜色改变
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "success-row";
      }
      return "warning-row";
    },
    // 表格高度改变
    changeHeightName: function() {
      if (this.pageSize === 6) {
        return "350";
      }
      if (this.pageSize === 12) {
        return "700";
      }
      if (this.pageSize === 24) {
        return "1000";
      }
    },
    indexMethod: function(index) {
      return index + 1;
    }
  }
};
</script>

<style scoped lang="less">
.chartTitle {
  font-size: 18px;
  color: #4f5359;
  font-weight: Medium;
  font-family: SourceHanSansSC-Bold;
}
.foot {
  font-size: 16px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
}
.el-table .warning-row {
  background: rgb(253, 248, 238);
}

.el-table .success-row {
  background: #ebf4f8;
}
.comment {
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: #4F5359;
}



// @url: "../../../assets/screenImage/";
</style>