<template>
	<div id="index">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="home">
			<div class="current">当前位置：首页</div>
			<div v-for="link in links" keys="link" class="link" @click="linkTo(link.link)">
				<img class="link-ico" :src="link.ico">
				<div class="link-txt">{{link.txt}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import elHead from '../common/Header.vue';
	export default {
		components:{
            elHead
       },
        data: function(){
            return {
            	links:[
            		{txt:'个人通知',ico:'../../../static/img/icon.jpg',link:'notice'},
            		{txt:'公告',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'发布公告',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'事件中心',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'事件填报',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'我的事件',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'事件处理',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'事件管理',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'统计分析',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'人员管理',ico:'../../../static/img/icon.jpg',link:'login'},
            		{txt:'系统设置',ico:'../../../static/img/icon.jpg',link:'login'}
            	]
            }
        },
        methods: {
        	linkTo(link) {
        		window.open('#/'+link)
        	}
        }
    }
</script>

<style scoped>
	#index .home .link{
		display: inline-block;
		box-shadow: 0 0 3px #ccc;
		margin: 15px;
	    padding: 8px;
	    cursor: pointer;
	}
	#index .home .link .link-ico{
		width: 100px;
	}
	#index .home .link .link-txt{
		text-align: center;
    	font-size: 16px;
	}
</style>