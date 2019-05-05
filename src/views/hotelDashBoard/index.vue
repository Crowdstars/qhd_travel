<template>
    <div style="overflow: scroll">
        <img src="../../assets/DetailsImgs/bg.png" style="width: 100%;height: 50%">

        <elHeader-view style="margin-left:250px;margin-right: 250px;margin-top: -10%; font-size: 10px"></elHeader-view>

        <elSection-view style="margin: 0 250px;font-size: 10px"></elSection-view>
        <!-- <elFooter-view style="margin: 0 250px;font-size: 10px"></elFooter-view> -->

    </div>
</template>
<script>
    import {debounce} from '@/utils'
    import {elHeaderView} from './elHeader'
    import {elSectionView} from './elSectioner'
    // import {elFooterView} from './elFooter'
export default {
    name: "elhotel",
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
        elHeaderView, 
        elSectionView,
        // elFooterView
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
            // getEndDate().then(res => {
            //     this.endDate = res.data.endDate;
            // }).catch(err => {
            //     console.log(err);
            // });

        },
        mounted() {
            let self = this;


        },
        beforeDestroy() {
            window.removeEventListener('resize', this.__resizeHandler);
        }
}
</script>
<style  lang="less">
    html, body {
        font-size: 10px !important;
        overflow: scroll;
    }
    .chartTitle{
        font-size:20px;
        font-family:SourceHanSansSC-Medium;
        font-weight:500;
        color:rgba(79,83,89,1);
    }
    //路径
    @url: "../../assets/DetailsImgs/";

</style>