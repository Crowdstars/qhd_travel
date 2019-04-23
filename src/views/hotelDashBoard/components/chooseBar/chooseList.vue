<template>
    <div class="horizontal left vcenter wrap">
        <div
                v-for="value in values"
                v-bind:key="value._id"
                class="cl-block"
        >
            <div v-if="value._id == innerSelect" class="cl-select bg-accept" >
                {{value._id}}({{value.countNum}})
            </div>
            <div class="cl-normal" v-else="value.countNum == 0" @click="onTap(value._id, value.countNum)">{{value._id}}({{value.countNum}})</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .cl-block {
        font-size: 15px;
        margin-top: 2px;
        margin-bottom: 10px;
        cursor: pointer;
        padding: 1px;
    }

    .cl-select {
        padding: 2px 4px;
        margin-right: 8px;
        border-radius: 5px;
        color: #fff;
    }
    .bg-accept {
        background-color: #409eff;
    }
    .cl-normal {
        padding: 2px 4px;
        margin-right: 10px;
    }


</style>
<script>
    export default {
        props: {
            values: {
                type: Array,
                default: []
            },
            select: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                innerSelect: this.select
            }
        },
        mounted() {
        },
        methods: {
            onTap(value, hotelcount) {
                this.$emit('on-select-change', value, hotelcount)
            }
        },
        watch: {
            select(val) {
                this.innerSelect = val;
            },
        },

    }
</script>