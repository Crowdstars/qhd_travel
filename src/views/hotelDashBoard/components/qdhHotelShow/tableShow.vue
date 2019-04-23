<template>
    <div class="shop-info">
        <div class="txt" v-for="hotel in qdhhotellist" @mouseenter="enterBackChange" @mouseleave="leaveBackChange">
            <div class="tit">
                <span>{{hotel.name}}</span>
            </div>
            <div class="comment">
                <span class="sml-rank-stars">{{hotel.comment_grade}}</span>
                <em class="sep">|</em>
                <span class="hpowu"> <b>{{hotel.commentNum}}</b> 条点评</span>
            </div>
            <div class="tag-addr">
                <span class="addr">{{hotel.hotelRate}}</span>
                <em class="sep">|</em>
                <span class="addr">{{hotel.address}}</span>
            </div>
            <div class="detail-container">
                 <span class="comment-list">
                       <span>卫生：<b>{{hotel.comment_health_grade}}</b></span>
                       <span>服务：<b>{{hotel.comment_service_grade}}</b></span>
                       <span>位置：<b>{{hotel.comment_location_grade}}</b></span>
                       <span>设施：<b>{{hotel.comment_facility_grade}}</b></span>
                  </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tableShow",
        components: {},
        props: {
            datalist: {
                type: Array
            },
            hotelrate: {
                type: String
            },
        },
        data() {
            return {
                qdhhotellist: [],
            }
        },
        methods: {

            enterBackChange: function (event) { // `event` 是原生 DOM 事件

            },
            leaveBackChange: function (event) { // `event` 是原生 DOM 事件

            }
        },
        watch: {
            datalist: function () {
                this.qdhhotellist = this.datalist;
                console.log(this.qdhhotellist);
            },
        }
    }
</script>
<style lang="scss">
    .shop-info {
        position: absolute;
        z-index: 1000;
        border: 1px solid red;
        padding: 20px;
    }
    .condition {
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #e9e9e9;
        margin-top: -1px;
        position: relative;
        padding-left: 10px;
        zoom: 1;
    }

    .condition .sort-con {
        display: inline-block;
        margin: 0 10px;
        text-align: center;
    }

    .txt {
        padding: 8px 15px 13px 30px;
        background-color: #fff9f7;
        position: relative;
        min-height: 88px;
        margin: 5px;
        -webkit-border-top-right-radius: 10px;
        border-top-right-radius: 10px;
        -webkit-border-bottom-right-radius: 10px;
        border-top-bottom-radius: 10px;


    }

    /*.tit {
    border: 1px solid red;
    }*/

    .tit span {
        display: inline-block;
        padding: 5px 10px 5px 0px;
        margin: 10px 0px;
        font-size: 20px;
        color: black;
    }

    .comment span {
        color: #999;
    }

    .comment span b {
        color: black;
    }

    .comment-list {
        position: absolute;
        line-height: 30px;
        right: 25px;
        top: 70px;
        color: #999;
    }

    .sml-rank-stars {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        width: 66px;
        height: 12px;
        vertical-align: -1px;
        background-image: url('../../../../assets/images/remarkgrade.png');
        background-repeat: no-repeat;
        background-position: 0px -100px;
        -webkit-background-size: 86px auto;
        -moz-background-size: 86px auto;
        background-size: 86px auto;
        margin-right: 10px;
    }


    .tag-addr {
        line-height: 24px;
        color: #999;
    }

    .tag-addr .sep, .comment .sep {
        color: #999;
    }

    .condition {
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #e9e9e9;
        margin-top: -1px;
        position: relative;
        padding-left: 10px;
        zoom: 1;
    }

</style>