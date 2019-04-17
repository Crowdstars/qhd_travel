<template>
    <div class="dashboard-editor-container">

        <!--动态数字加载-->
        <panel-group @handleSetLineChartData="handleSetLineChartData"/>

        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <!--折线图-->
            <line-chart :chart-data="lineChartData"/>
        </el-row>

        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <!--雷达图-->
                    <raddar-chart/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <!--饼图-->
                    <pie-chart/>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <!--条形图-->
                    <bar-chart/>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="8">
            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}"
                    style="margin-bottom:30px;">
                <todo-list/>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}"
                    style="margin-bottom:30px;">
                <box-card/>
            </el-col>
        </el-row>
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="24">
                <div class="chart-wrapper">
                    <!--散点图（百度地图）-->
                    <scatter-charts/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import PanelGroup from './components/PanelGroup'
    import LineChart from './components/LineChart'
    import RaddarChart from './components/RaddarChart'
    import PieChart from './components/PieChart'
    import BarChart from './components/BarChart'
    import TodoList from './components/TodoList'
    import BoxCard from './components/BoxCard'
    import scatterCharts from './components/scatterCharts'

    const lineChartData = {
        newVisitis: {
            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
            expectedData: [200, 192, 120, 144, 160, 130, 140],
            actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
            expectedData: [80, 100, 121, 104, 105, 90, 100],
            actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
            expectedData: [130, 140, 141, 142, 145, 150, 160],
            actualData: [120, 82, 91, 154, 162, 140, 130]
        }
    };

    export default {
        name: 'DashboardAdmin',
        components: {
            PanelGroup,
            LineChart,
            RaddarChart,
            PieChart,
            BarChart,
            TodoList,
            BoxCard,
            scatterCharts,
        },
        data() {
            return {
                lineChartData: lineChartData.newVisitis,


            }
        },
        created() {

        },

        methods: {
            handleSetLineChartData(type) {
                this.lineChartData = lineChartData[type]
            },


        },

    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);

        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 32px;
        }
    }
</style>
