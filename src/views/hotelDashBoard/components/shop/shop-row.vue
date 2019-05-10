<template>
  <div class="div-style">
    <el-row type="flex" class="row-bg" justify="space-around" :gutter="24" style="display:flex;align-items: center;text-align: center">
      <el-col :lg="11">
        <div style="text-align: left;margin-left: 5px">
          <p class="shop-name-style">{{item.name}}</p>
          <p class="shop-address">
            <i class="el-icon-location"></i>
            <span>{{item.address}}</span>
          </p>

          <div style="display: flex;justify-content: flex-start;align-items: center">
            <el-rate v-model="item.commentScore" :disabled="true"></el-rate>
            <span class="shop-score">{{item.commentScore}}</span>
            &nbsp;|&nbsp;
            <span class="comment">{{item.commentNumber}}</span>
            <span class="text">条点评</span>
          </div>
        </div>
      </el-col>
      <el-col :lg="2" v-if="item.comment_service_grade != '暂无评分'">
        <span class="tag">服务</span>
        <br>
        <span class="tag-score">{{item.comment_service_grade}}</span>
      </el-col>
      <el-col :lg="2" v-if="item.comment_service_grade != '暂无评分'">
        <span class="tag">卫生</span>
        <br>
        <span class="tag-score">{{item.comment_health_grade}}</span>
      </el-col>
      <el-col :lg="2" v-if="item.comment_service_grade != '暂无评分'">
        <span class="tag">位置</span>
        <br>
        <span class="tag-score">{{item.comment_location_grade}}</span>
      </el-col>
      <el-col :lg="2" v-if="item.comment_service_grade != '暂无评分'">
        <span class="tag">设施</span>
        <br>
        <span class="tag-score">{{item.comment_facility_grade}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.shop-name-style {
  font-size: 16px;
  font-family: SourceHanSansSC-Bold;
  font-weight: bold;
  color: rgba(79, 83, 89, 1);
}
.shop-address {
  border-bottom: 100px;
  font-size: 14px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(119, 119, 119, 1);
}
.tag-score {
  font-size: 13px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(90, 139, 240, 1);
  margin-right: 5px;
}
.comment,
.text {
  margin-left: 10px;
  margin-bottom: 2px;

  font-size: 12px;
  font-family: SourceHanSansSC-Regular;
  // font-weight:400;
  color: rgba(119, 119, 119, 1);
}
.comment {
  font-weight: 900;
}

.shop-score {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2px;
  font-size: 12px;
  font-family: Arial-BoldMT;
  font-weight: bold;
  color: rgba(237, 139, 52, 1);
}
.div-style {
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(236, 237, 240, 1);
}

.tag {
  font-size: 13px;
  font-family: SourceHanSansSC-Regular;
  font-weight: 400;
  color: rgba(131, 138, 147, 1);
}
.row-bg {
    padding: 10px 0;
    // background-color: #f9fafc;
  }
.sr-card {
  cursor: pointer;
}
.sr-container {
  > img {
    width: 170px;
    height: 127px;
    margin-right: 20px;
  }
}
</style>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {
      true: true
    };
  },
  mounted() {},
  methods: {
    onClick() {
      console.log("- - - - - - rhjlog ", this.item);
    }
  },
  watch: {}
};
</script>
