<template>
    <div class = "div-style">
<el-row :gutter="24" style="display:flex;align-items: center;text-align: center">
    <el-col :lg="12">
<div style="text-align: left;margin-left: 5px">
        <p class="shop-name-style">{{item.shop_name}}</p>
        <p class="shop-address">地址：{{item.shop_address}}</p>

        <div style="display: flex;justify-content: flex-start;align-items: center"><el-rate v-model="item.our_score" disabled="true">

        </el-rate>
            <span class="shop-score"> {{item.our_score}}</span>
           &nbsp;|&nbsp;
            <span class="comment"> {{item.shop_comment_num}}条点评</span>
        </div>
</div>
    </el-col>
    <el-col :lg = "4" v-if = "item.shop_service != '暂无评分'">

        <span class="tag">服务</span>
        <br>
        <span class="tag-score">  {{item.shop_service}}</span>

    </el-col>
    <el-col :lg = "4" v-if = "item.shop_service != '暂无评分'">

        <span class="tag">环境</span>
        <br>
        <span class="tag-score"> {{item.shop_env}}</span>

    </el-col>
    <el-col :lg = "4"  v-if = "item.shop_service != '暂无评分'">

        <span class="tag">口味</span>
        <br>
        <span class="tag-score"> {{item.shop_taste}}</span>

    </el-col>
</el-row>

        </div>
</template>
<style lang="less" scoped>
    .shop-name-style{
        font-size:16px;
        font-family:SourceHanSansSC-Bold;
        font-weight:bold;
        color:rgba(79,83,89,1);
    };
    .shop-address{
        font-size:14px;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(119,119,119,1);
    }
    .tag-score{
        font-size:14px;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(90,139,240,1);
    }
    .comment{
        font-size:12px;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(119,119,119,1);
    }

.shop-score{
    font-size:12px;
    font-family:Arial-BoldMT;
    font-weight:bold;
    color:rgba(237,139,52,1);
}
.div-style{
    background:rgba(255,255,255,1);
    border:2px solid rgba(236, 237, 240, 1);
}

     .tag{
         font-size:14px;
         font-family:SourceHanSansSC-Regular;
         font-weight:400;
         color:rgba(131,138,147,1);
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
            return {}
        },
        mounted() {
        },
        methods: {
            onClick() {
                console.log('- - - - - - rhjlog ', this.item)
            }
        },
        watch: {},

    }
</script>
