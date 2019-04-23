<template>
    <div class="pageChange">
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :current-page.sync="currPageShow"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "PageChange",
        props : {
            //每页显示条数
            pageSize : {
                type : Number,
                default : 10
            },
            //总记录数
            total : {
                type : Number,
                default : 0
            },
            showTitle: {
                type: String,
                default: 'hehe'
            }
        },
        data: function() {
            return {
                currPageShow: 1
            }
        },
        mounted() {
        },
        methods: {
            handleCurrentChange: function(val) {
                this.$emit('changeFunc',this.showTitle, val);
            }
        }
    }
</script>
<style scoped>

</style>