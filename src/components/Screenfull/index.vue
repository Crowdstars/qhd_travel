<template>
    <div>
        <el-tooltip :content="isFullscreen?'取消全屏':'全屏'" effect="dark" placement="bottom">
            <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"/>
        </el-tooltip>
    </div>
</template>

<script>
    import screenfull from 'screenfull'

    export default {
        name: 'Screenfull',
        data() {
            return {
                isFullscreen: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            click() {
                if (!screenfull.enabled) {
                    this.$message({message: '你的浏览器无法正常工作', type: 'warning'});
                    return false
                }
                screenfull.toggle();
            },
            init() {
                if (screenfull.enabled) {
                    screenfull.on('change', () => {
                        this.isFullscreen = screenfull.isFullscreen
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .screenfull-svg {
        display: inline-block;
        cursor: pointer;
        fill: #5a5e66;;
        width: 20px;
        height: 20px;
        vertical-align: 10px;
    }
</style>
