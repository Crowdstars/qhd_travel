<template>
    <div>

            <el-row :gutter="24"  style="display: flex;align-items: center">
               <el-col :lg = "2">
                   <el-col :lg="2">
                       <div class="elBefore">
                           <span :class="[index == 0 || index == 1 || index == 2 ?'rank-three' :'rank']">{{index + 1 }}</span></div>
                   </el-col>
               </el-col>
                <el-col :lg="22">
<div style="margin-left: 20px">
                        <p class="shop-name">{{item._id}}</p>
    <div style="display: flex;justify-content: flex-start;align-items: center"><el-rate v-model="item.commentScore" text-color="#ED8B34" :disabled="true">

    </el-rate>
        <span class="score"> {{item.commentScore}}</span>
        &nbsp;| &nbsp;
        <span class="comment">{{item.commentNumber}}条点评</span>
    </div>
</div>


                </el-col>


            </el-row>
</div>

</template>
<style lang="less" scoped>
    .shop-name{
        font-size:14px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(79,83,89,1);
    }
    .comment{
        font-size:12px;
        font-family:SourceHanSansSC-Regular;
        font-weight:400;
        color:rgba(119,119,119,1);
    }
    .score{
        font-size:12px;
        font-family:Arial-BoldMT;
        font-weight:bold;
        color:rgba(237,139,52,1);
    }
    .elBefore {
        width:26px;
        height:26px;
        background:rgba(201,201,201,1);
        opacity:0.75;
        border-radius:50%;


        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

    };
    .rank{
        font-size:13px;
        font-family:Impact;
        font-weight:400;
        color:#919191
    }
    .rank-three{
        font-size:13px;
        font-family:Impact;
        font-weight:400;
        color:red
    }
    .div-style{
        background:rgba(255,255,255,1);
        border:2px solid rgba(236, 237, 240, 1);
    }


</style>
<script>
    export default {
        props: {
            item: Object,
            index: Number
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
