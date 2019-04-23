<template>
    <div class="commentShow">
    </div>
</template>

<script>
    export default {
        name: "qdhHotelCommentAnalyze",
        props: {
            getComment: {
                type: Array
            },
        },
        data: function () {
            return {
                loading: true,
                commentEls: 6,
            }
        },
        methods: {
            removeAllDiv: function () {
                var commentShow = document.getElementsByClassName('commentShow')[0];
                commentShow.innerHTML = '';
            }
        },
        watch: {
            getComment: function(val) {
                this.removeAllDiv();
                var commentShow = document.getElementsByClassName('commentShow')[0];
                for(var i = 0; i < this.getComment.length; i++) {
                    var commentDiv = document.createElement('div');
                    commentDiv.setAttribute('class', 'com_el_row');
                    commentDiv.innerHTML = this.getComment[i]['commentContent']
                    commentDiv.style.background = '#f5f5f5';
                    commentDiv.style.padding = '10px';
                    commentDiv.style.marginBottom = '20px';
                    commentDiv.style.overflow = 'hidden';
                    commentDiv.style.fontSize = '14px';
                    commentDiv.style.lineHeight = '28px';
                    commentDiv.style.marginTop = '17px';
                    commentDiv.style.color = '#333';
                    commentDiv.style.webkitBoxShadow = '1px 1px 1px #409EFF';
                    commentDiv.style.mozBoxShadow =  '1px 1px 1px  #409EFF';
                    commentDiv.style.boxShadow = '1px 1px 1px  #409EFF';
                    commentShow.append(commentDiv);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .commentShow {
        max-height: 550px;
        margin-bottom: 10px;
        padding: 20px;
        overflow:scroll;
    }
</style>