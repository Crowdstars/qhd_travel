<template>
    <div>

    <el-container ref="elContainer" class="elContainer"  v-if="$route.name ==='HotelDashBoard'">
        <el-main class="elContainer-elMain" ref="elMain">
            <el-header ref="elHeader" height="auto" class="elContainer-elHeader">
                <div class="first-block">
                    <!-- <img src="../assets/icons/qdhc_bg.jpg" style="width:100%; height:100%"> -->
                    <el-row>
                        <el-col :span="24">
                            <h1 style="color:white">千岛湖餐饮统计</h1>
                        </el-col>
                    </el-row>
                </div>
            </el-header>
            <p class="elContainer-endDate">截止日期：{{endDate}}</p>
            <el-row class="elContainer-elRow">
                <el-col :lg='24' :xl="24">
                    <elHeader-view></elHeader-view>
                </el-col>
                <!--<el-col :lg='24' :xl="24">
                    <elSection-view ></elSection-view>
                </el-col>-->
                <el-col :lg='24' :xl="24">
                    <el-footer-view></el-footer-view>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
       <router-view v-else />
   </div>

</template>

<script>
    import {getEndDate} from "@/api/dataView"
    import {debounce} from '@/utils'
    import {elHeaderView} from './elHeader'
    import {elSectionView} from './elSectioner'
    import {elFooterView} from './elFooter'

    export default {
        name: "HotelDashBoard",
        data() {
            return {
                //屏幕高度
                screenHeight: document.body.clientHeight,
                //主内容高度
                mainContentHeight: 0,
                //截止日期
                endDate: ''
            }
        },
        components: {
            elHeaderView,
            elSectionView,
            elFooterView
        },
        methods: {


        },
        watch: {

        },
        created() {
            getEndDate().then(res => {
                this.endDate = res.data.endDate;
            }).catch(err => {
                console.log(err);
            });

        },
        mounted() {

        },
        beforeDestroy() {
            window.removeEventListener('resize', this.__resizeHandler);
        }
    }
</script>

<style scoped lang="less">
    //路径
    @url: "../../assets/screenImage/";
    .elContainer {
        width: 100vw;
        height: 100vh;
        overflow: hidden;

        background-size: 100% 100%;
        color: #00FFE9;

        &-elMain {
            clear: both;

            background-size: 100% 100%;
            padding: 1vw;
        }

        //头部
        &-elHeader {
            float: left;
            width: 100%;
            text-align: center;
            font-size: 5vh;
            padding-bottom: 0.9vw;
        }

        &-endDate {
            position: absolute;
            float: right;
            right: 18%;
            color: #fff;
        }

        //内容
        &-elRow {
            padding-left: 0.5vw;
            padding-right: 0.9vw;
        }

    }

    @media (max-width: 1400px) {
        html, body, .elContainer {
            font-size: 10px !important;
        }
    }

    @media (min-width: 1400px) {
        @media (max-width: 1500px) {
            html, body, .elContainer {
                font-size: 12px !important
            }
        }
    }

    @media (min-width: 1500px) {
        @media (max-width: 1600px) {
            html, body, .elContainer {
                font-size: 14px !important
            }
        }
    }

    @media (min-width: 1600px) {
        @media (max-width: 1700px) {
            html, body, .elContainer {
                font-size: 16px !important;
            }
        }
    }

    @media (min-width: 1700px) {
        @media (max-width: 1800px) {
            html, body, .elContainer {
                font-size: 18px !important
            }
        }
    }

    @media (min-width: 1900px) {
        html, body, .elContainer {
            font-size: 20px !important;
        }
    }
</style>
<style>
    .first-block {
        clear: right;
        background:  url(../../assets/screenImage/qdhc_bg.jpg) center;
        opacity: 0.8;
        border-radius: 10px;
        border: 1px solid red;
    }
</style>