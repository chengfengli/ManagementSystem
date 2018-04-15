<template>
	<div id="index">
		<div id="heade">
			<elHead></elHead>
		</div>
		<div class="home">
			<div class="link-list">
				<div v-for="link in links" :key="link.txt" class="link" @click="linkTo(link.link, link.txt)">
					<img class="link-ico" :src="link.ico">
					<div class="link-txt">{{link.txt}}</div>
				</div>
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
            		{txt:'个人通知',ico:'./static/img/index/notice.png',link:'notice'},
            		{txt:'公告',ico:'./static/img/index/announcement.png',link:'announcement'},
            		{txt:'发布公告',ico:'./static/img/index/announcementMana.png',link:'announcementMana'},
            		{txt:'事件中心',ico:'./static/img/index/event_center.png',link:'eventCenter'},
            		{txt:'事件填报',ico:'./static/img/index/event_tianbao.png',link:'eventFillIndex'},
            		{txt:'我的事件',ico:'./static/img/index/my_event.png',link:'eventProcessing'},
            		{txt:'事件处理',ico:'./static/img/index/event_tianbao.png',link:'eventProcessing'},
            		{txt:'事件管理',ico:'./static/img/index/event_manage.png',link:'eventProcessing'},
            		{txt:'统计分析',ico:'./static/img/index/statistical_analysis.png',link:'statisticsList'},
            		{txt:'人员管理',ico:'./static/img/index/person_manage.png',link:'personManage'},
            		{txt:'系统设置',ico:'./static/img/index/sys_set.png',link:'systemSet'}
            	]
            }
        },
        methods: {
        	linkTo(link,txt) {
        		if(txt == "我的事件" || txt == "事件处理" || txt == "事件管理"){
              this.$router.push({
                path: link,
                query: {txt: txt}
              })
            }else {
              this.$router.push(link);
            }
        	}
        }
    }
</script>

<style scoped>
	#index{
		height: 100%;
		background-color: #F2F2F2;
	}
	#index .home .link{
		display: inline-block;
		box-shadow: 0 0 3px #ccc;
		margin: 15px;
	    padding: 8px;
	    cursor: pointer;
	    color: rgb(72,72,72);
	    border-radius: 2px;
	}
	#index .home .link:hover{
		box-shadow: 0 0 4px #fff;
	}
	#index .link-list{
	    width: 584px;
	    margin: 5% auto;
	}
	#index .home .link .link-ico{
		width: 100px;
		height: 100px;
	}
	#index .home .link .link-txt{
		text-align: center;
    	font-size: 16px;
	}
</style>
