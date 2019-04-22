<template>
    <el-container ref="elContainer" class="elContainer">
        <el-main class="elContainer-elMain" ref="elMain">
            <el-header ref="elHeader" height="auto" class="elContainer-elHeader"></el-header>
            <p class="elContainer-endDate">截止日期：{{endDate}}</p>
            <el-row class="elContainer-elRow">
                <el-col :lg='24' :xl="24">
                    <elHeader-view :contentHeight="mainContentHeight * 0.25"
                                   :style="{height:mainContentHeight * 0.25 +'px',overflow: 'hidden'}"></elHeader-view>
                </el-col>
                <el-col :lg='24' :xl="24">
                    <elSection-view :contentHeight="mainContentHeight * 0.7"
                                    :style="{height:mainContentHeight * 0.7 +'px'}"></elSection-view>
                </el-col>

            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {getEndDate} from "@/api/dataView"
    import {debounce} from '@/utils'
    import {elHeaderView} from './elHeader'
    import {elSectionView} from './elSectioner'
    import {elFooterView} from './elFooter'
export default {
    name: "elrestaurant",
    data(){
         return {
                //屏幕高度
                screenHeight: document.body.clientHeight,
                //主内容高度
                mainContentHeight: 0,
                //截止日期
                endDate: ''
            }
    },
    components:{
        elHeaderView, elSectionView, elFooterView
    },
    methods: {
            //自动加载区域高度
            autoLoadHeight() {
                let self = this,
                    //屏幕高度
                    sHeight = self.screenHeight,
                    sPadding = parseInt(window.getComputedStyle(this.$refs.elMain.$el).paddingTop) + 1,
                    sHeader = this.$refs.elHeader.$el.clientHeight + 1;
                self.mainContentHeight = sHeight - sHeader - (sPadding * 2) - 5;
            }
        },
        watch: {
            //监听屏幕高度变化
            screenHeight(val) {
                //延时触发高度调整
                if (!this.screenHeightTimer) {
                    this.screenHeight = val;
                    this.screenHeightTimer = true;
                    let that = this;
                    setTimeout(function () {
                        that.autoLoadHeight();
                        that.screenHeightTimer = false
                    }, 400);
                }
            }
        },
        created() {
            getEndDate().then(res => {
                this.endDate = res.data.endDate;
            }).catch(err => {
                console.log(err);
            });
            this.$nextTick(() => {
                this.autoLoadHeight();
            });
        },
        mounted() {
            let self = this;
            /** 自适应页面高度 */
            this.__resizeHandler = debounce(() => {
                window.screenHeight = document.body.clientHeight;
                self.screenHeight = window.screenHeight;
            }, 100);
            window.addEventListener('resize', this.__resizeHandler);
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
