<template>
    <el-card class="box-card-component" style="margin-left:8px;">
        <div slot="header" class="box-card-header">
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
        </div>
        <div style="position:relative;">
            <div style="padding-top:35px;" class="progress-item">
                <span>Vue</span>
                <el-progress :percentage="70"/>
            </div>
            <div class="progress-item">
                <span>JavaScript</span>
                <el-progress :percentage="18"/>
            </div>
            <div class="progress-item">
                <span>Css</span>
                <el-progress :percentage="12"/>
            </div>
            <div class="progress-item">
                <span>ESLint</span>
                <el-progress :percentage="100" status="success"/>
            </div>
        </div>
    </el-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import PanThumb from '@/components/PanThumb'

    export default {
        components: {PanThumb},

        filters: {
            statusFilter(status) {
                const statusMap = {
                    success: 'success',
                    pending: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                statisticsData: {
                    article_count: 1024,
                    pageviews_count: 1024
                }
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'avatar',
                'roles'
            ])
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .box-card-component {
        .el-card__header {
            padding: 0px !important;
        }
    }
</style>
<style rel="stylesheet/less" lang="less" scoped>
    .box-card-component {
        .box-card-header {
            position: relative;
            height: 220px;

            img {
                width: 100%;
                height: 100%;
                transition: all 0.2s linear;

                &:hover {
                    transform: scale(1.1, 1.1);
                    filter: contrast(130%);
                }
            }
        }

        .progress-item {
            margin-bottom: 10px;
            font-size: 14px;
        }
    }
</style>
