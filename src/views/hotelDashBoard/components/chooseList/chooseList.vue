<template>
    <div class="horizontal left vcenter wrap">
        <div
                v-for="value in values"
                v-bind:key="value"
                class="cl-block "
        >
            <div
                    v-if="value == innerSelect"
                    class="cl-select bg-accept"
            >
                <span class="fontStyle">{{value}}</span>
            </div>
            <div
                    class="cl-normal"
                    v-else
                    @click="onTap(value)"
            >{{value}}
            </div>
        </div>

    </div>
</template>
<style lang="less" scoped>
    .cl-block {
        font-size: 14px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .cl-select {
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 8px;

        margin-right: 8px;

        border-radius: 20px;
        // color: white;
    }

    .cl-normal {
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 8px;
        margin-right: 8px;
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
            onTap(value) {
                this.$emit('on-select-change', value)
            }
        },
        watch: {
            select(val) {
                this.innerSelect = val;
            },
        },

    }
</script>
