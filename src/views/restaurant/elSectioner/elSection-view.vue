<template>
    <div>
        <el-row :gutter="10" class="elContainerSection">
    <el-col :lg = "24" :xl = "24" class="elContent">
    <el-card>
        <div class="horizontal left top padding10 text-main">
          <span
                  class="noshrink"
                  style="margin-top:4px"
          >商圈:</span>
            <choose-list
                    class="margin-left-10"
                    :values="businessCirle"
                    :select="selectBusiness"
                    v-on:on-select-change="onSelectChange"
            />
            <!-- select表示当前列表所选，values表示列表里所有的值 -->
            <!-- v-on 事件监听，监听 on-select-change 事件，该事件由choose-list组件发出，当一个值被选中时发出，比如说 选择 商圈 千岛湖十字街  -->
        </div>
        <div class="horizontal left top padding10 text-main">
          <span
                  class="noshrink"
                  style="margin-top:4px"
          >菜系:</span>
            <choose-list
                    class="margin-left-10"
                    :values="shopCookStyles"
                    :select="selectCookStyle"
                    v-on:on-select-change="onCookStyleChange"
            />
        </div>
    </el-card>
    </el-col>
</el-row>
        <el-row :gutter="10" class="elContainerSection">
            <el-col :lg='16' :xl = '16' class="elContent" style="height:200px; overflow: scroll">

                <div class="sl-list">
                    <!-- v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)" -->
                    <!-- 店铺组件 -->
                    <shop-row
                            v-for="item in shopList"
                            :key="item"
                            :item="item"
                    />

                    <!-- http://element-cn.eleme.io/#/zh-CN/component/pagination -->
                    <el-pagination
                            background
                            :current-page.sync="page.page"
                            :page-size="page.pageSize"
                            :total="page.total"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            layout="total,prev, pager, next"
                    >
                    </el-pagination>

                </div>

        </el-col>
        <el-col :lg='8' :xl = '8' class="elContent">

                    <!--标题-->
                    <el-row type="flex" justify="space-around" align="middle" class="elBgd"
                            :style="{'padding': contentHeight * 0.01 + 'px'}">
                        <el-col :lg='3' :xl="3">
                            <img class="elImage" :width="contentHeight * 0.10 + 'px'"
                                 src="../../../assets/screenImage/icon_restaurant_list.png">
                        </el-col>
                        <el-col :lg='14' :xl="14" class="elTitle threeTip">餐饮 排行榜</el-col>

                    </el-row>
            <div  class="condition">
                <span><a rel="nofollow" class="sort-con sel">排序方式</a>
                </span>
                <span><a rel="nofollow" class="sort-con sel">评论数量</a>
                    <span class="line">|</span>
                </span>
                <span><a rel="nofollow" class="sort-con sel">
                    按评价</a> <span class="line">|</span></span>
                <span><a rel="nofollow" class="sort-con sel">评分</a></span>
            </div>
                    <!--内容-->
                    <el-row class="elCtBgd"
                            :style="{'padding': contentHeight * 0.05 + 'px','max-height': centerChartHeight +'px'}">
                        <el-col :lg='24' :xl="24">
                            <el-row>
                                <el-col :lg='10' :xl="10">店名</el-col>
                                <el-col :lg='4' :xl="4" style="text-align: center">评分</el-col>
                                <el-col :lg='10' :xl="10" style="text-align: right">评论数</el-col>
                            </el-row>
                        </el-col>
                        <el-col :lg='24' :xl="24">
                            <el-row class="elCtBgdTd" :style="{'max-height': centerChartHeight +'px'}">
                                <el-col :lg='24' :xl="24" class="elFor" v-for="(item,index) in diningList" :key="index">
                                    <el-row class="elProgress">
                                        <el-col class="item-name" :lg='9' :xl="9">{{item._id}}</el-col>
                                        <el-col :lg='7' :xl="7">
                                            <el-col class="percent-label" :lg='8' :xl="8">{{item.commentScore}}</el-col>
                                            <el-col class="percent-label" :lg='16' :xl="16">
                                                <el-progress :text-inside="true" :stroke-width="6"
                                                             :percentage="item.commentScorePercent"
                                                             color="#D8FF77"></el-progress>
                                            </el-col>
                                        </el-col>
                                        <el-col :lg='8' :xl="8" style="text-align: right">
                                            <el-col :lg='16' :xl="16">
                                                <el-progress :text-inside="true" :stroke-width="6"
                                                             :percentage="item.commentNumberPercent"
                                                             color="#02FFF9"></el-progress>
                                            </el-col>
                                            <el-col class="percent-label" :lg="8" :xl="8">{{item.commentNumber}}</el-col>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
        </el-col>

        </el-row>
    </div>

</template>
<script>
    //展示的排行数据条数
    const maxDataNum = 10;
    import { site_list, shop_cook_styles } from '@/base/dict';
    import chooseList from '../components/chooseList/chooseList';
    import shopRow from '../components/shop/shop-row';
    import {
        getRestaurantList
    } from "@/api/restaurant";
    import {getRestaurantRank} from "@/api/dataView";
    export default {
        name:'elSectionView',
        props: {
            contentHeight: {
                type: Number,
                default: 0
            },
        },
        components: { // 用到的组件需要在这里进行定义
            'choose-list': chooseList,
            'shop-row': shopRow
        },
            data() { //data里定义的值在模版里可以直接通过名字来访问, 模版里用到的必须在这里定义
                return {
                    loading: true,
                    businessCirle: site_list,
                    shopCookStyles: shop_cook_styles,
                    selectBusiness: '全部',
                    selectCookStyle: '全部',
                    shopList: [],
                    page: {
                        page: 0,
                        pageSize: 20,
                        total: 0,
                        next: 1
                    },
                    //餐饮排行列表
                    diningList: [],
                    centerChartHeight: 100,
                }
            },
            mounted() {
                this.loadData(this.page.page, this.selectCookStyle, this.selectBusiness);
                this.getRestaurantRankFun();
            },
            methods: {

                loadData: async function (page, type, site) {
                    const asyncPromise = new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(1);
                            // reject('出错了');
                        }, 1000);
                    });

                    asyncPromise
                        .then(value => {
                            console.log(value);

                        })
                        .catch(error => {
                            console.log(error);
                        })

                    this.loading = true;
                    this.shopList = []; // 设置为空数组来清空数据，因为所选的条件变更了

                    const params = {page, type, site}; // page,type,site作为参数传递到params里

                    getRestaurantList(params).then(result => {
                        console.log(result);
                        let self = this;
                        // const { page: pageData, data } = result
                        const pageData = result.page;
                        const data = result.data;
                        this.shopList = data
                        this.page = pageData  // 表示当前数据是多少页的，总共有多少页
                        this.loading = false;

                    })
                },
                onSelectChange(value) {
                    this.selectBusiness = value
                    this.page = {
                        page: 0,
                        pageSize: 20,
                        total: 0,
                        next: 1
                    }
                    this.loadData(0, this.selectCookStyle, this.selectBusiness) //更新数据
                },
                onCookStyleChange(value) {
                    this.selectCookStyle = value
                    this.page = {
                        page: 0,
                        pageSize: 20,
                        total: 0,
                        next: 1
                    }
                    this.loadData(0, this.selectCookStyle, this.selectBusiness)
                },
                handleSizeChange(value) {
                    console.log('- - - - - - rhjlog handleSizeChange', value)
                },
                handleCurrentChange(value) {

                    console.log('- - - - - - rhjlog handleCurrentChange', value, this.page)
                    this.loadData(value, this.selectCookStyle, this.selectBusiness)
                },

                //获取餐饮排行列表
                getRestaurantRankFun: function () {
                    getRestaurantRank().then(res => {
                        if (res.code === 0 && res.data) {
                            //获取Top5的数据
                            this.diningList = res.data.goodList ? res.data.goodList.slice(0, maxDataNum) : [];
                            var maxCommentNumber = Math.max.apply(Math, this.diningList.map(function (b) {
                                return b.commentNumber
                            }));
                            this.diningList.forEach(function (item) {
                                item["commentScorePercent"] = (item.commentScore / maxDataNum) * 100;
                                item["commentNumberPercent"] = maxCommentNumber > 0 ? (item.commentNumber / maxCommentNumber) * 100 : 0;
                            });
                        } else {
                            this.$message.error(res.message);
                        }
                    });
                },
            }

    }
</script>

<style scoped lang="less">
    .sl-list {
        margin-top: 20px;
        overflow: scroll;
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
    @url: "../../../assets/screenImage/";

    @media (max-width: 1400px) {
        .elContainerSection {
            .elContent {
                .elTitle {
                    font-size: 15px !important;
                }

                .threeTip::after {
                    font-size: 6px !important;
                    bottom: -100% !important;
                }
            }
        }
    }

    .elContainerSection {
        width: 100%;

        .elContent {
            .elBgd {
                background: url('@{url}title.png') no-repeat;
                background-size: 100% 100%;
                overflow: hidden;
                height: 100%;
                width: 100%;
            }

            .elImage {
                float: left;
            }

            .elFontSize {
                float: right;
                width: 60%;
                text-align: right;
                color: #006FFF;
            }

            .elTitle {
                padding: 0 10px;
            }

            .threeTip {
                position: relative;

                &::after {
                    color: #006FFF;
                    content: '（近三个月综合数据统计）';
                    display: inline-block;
                    position: absolute;
                    font-size: 8px;
                    left: 0;
                    bottom: -100%;
                }
            }


            .elLink {
                float: right;
            }


            //内容
            .elCtBgd {
                background: url('@{url}bgrImage.png');
                background-size: 100% 200%;
                /*padding: 0.5vw 1.8vw;*/
                /*padding: 2% 5%;*/
                /*font-size: 1.2vw;*/

                .item-name {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #D9E0ED;
                }

                .percent-label {
                    color: #68E4E8;
                    text-align: center;
                }

                .elCtBgdTd {
                    overflow: auto;
                }

                .elFor {
                    padding-top: 0.5vh;
                    padding-top: 1%;
                }
            }
        }
    }

</style>
<style scoped>

    /*背景颜色*/
    .elContainerSection >>> .el-progress-bar__outer {
        background-color: rgba(0, 0, 0, 0.2) !important;
    }

    /*手动添加渐变色*/
    .elContainerSection >>> .el-progress.is-success .el-progress-bar__inner {
        background: linear-gradient(#D8FF77, #00FFFA) !important;
    }

    /*百分比的高度*/
    .elContainerSection >>> .el-progress-bar__inner {
        line-height: 0.5 !important;
    }

    /*隐藏百分比*/
    .elContainerSection >>> .el-progress-bar__innerText {
        display: none !important;
    }
</style>
