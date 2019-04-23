<template>
    <el-card class="sr-card" shadow="hover" >
        <div
                class="horizontal left vcenter sr-container"
                v-on:click="onClick"
        >
            <img :src="item.shop_img" />
            <div class="vertical space-between left in-horizontal fill-vertical fill-horizontal">
                <span class="text-main text-size-18">{{item.shop_name}}</span>
                <div class="horizontal left vcenter">

                    <i class="el-icon-goods text-size-14 text-normal">人均 ¥{{item.shop_price}}</i>
                    <div class="text-size-14 text-normal margin-left-10">{{item.shop_comment_num}}条评论</div>
                </div>
                <!-- <div class="text-size-14 text-normal"></div> -->
                <div class="text-size-14 text-normal">{{item.shop_site}} {{item.shop_cook_style}}</div>
                <i class="el-icon-location text-size-14 text-normal">{{item.shop_address}}</i>
            </div>
            <div class="vertical top left">
                <el-rate
                        v-model="item.shop_score"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                />
            </div>
        </div>
    </el-card>
</template>
<style lang="less" scoped>
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
