<template>
    <el-main>

    </el-main>
</template>
<script>
    import {getSameTradeRateCount} from "@/api/dataView"
    import {debounce} from '@/utils'
    import chooseList from '../components/chooseBar/chooseList'
    import {tradeAreas, hotelRates} from './tradeArea'

    //展示的排行数据条数
    export default {
        name: 'elSectionView',
        props: {
            contentHeight: {
                type: Number,
                default: 0
            },
        },
        components: {
            chooseList,
        },
        data() {
            return {
                centerChartHeight: 100,
                qdhhotelranklist: [],
                qdhhotelcount: 0,
                hotelReq: {
                    'hotelrate': '全部',
                    'tradearea': '全部'
                },
                hotelRates: hotelRates,
                tradeAreas: tradeAreas,
                tradeArea: "全部",
                hotelRate: "全部"
            }
        },
        computed: {},
        methods: {
        },
        watch: {
            scenicList() {
                //延时触发高度调整
                if (!this.screenHeightTimer) {
                    this.screenHeightTimer = true;
                    let self = this;
                    setTimeout(function () {
                        self.loadCenterChartHeight();
                        self.screenHeightTimer = false
                    }, 400);
                }
            }
        },
        created() {

        },
        mounted() {

        },
        beforeDestroy() {
        }
    }
</script>
<style scoped lang="less">
</style>
<style scoped>

</style>