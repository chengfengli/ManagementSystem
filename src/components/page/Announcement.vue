<template>
	<div id="announcement">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="announcement-body">
			<div class="current">当前位置：<a href="#/index">首页</a> > 公告</div>
			<div class="data-box">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<!--最新公告-->
				    <el-tab-pane label="最新公告" name="new">
				    	<table cellspacing="0" @mouseleave="show=-1">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>{{item.title}}</td>
								<td>点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
				    </el-tab-pane>
				    <!--流程制度-->
				    <el-tab-pane label="流程制度" name="flow">
				    	<table cellspacing="0" @mouseleave="show=-1">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>{{item.title}}</td>
								<td>点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
				    </el-tab-pane>
				    <!--部门公告-->
				    <el-tab-pane label="部门公告" name="dep">
				    	<table cellspacing="0" @mouseleave="show=-1">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>{{item.title}}</td>
								<td>点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
				    </el-tab-pane>
				    <!--器械事件-->
				    <el-tab-pane label="事件公告" name="event">
				    	<table cellspacing="0" @mouseleave="show=-1">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>{{item.title}}</td>
								<td>点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
				    </el-tab-pane>
				    <!--器械事件-->
				    <el-tab-pane label="器械事件" name="deviceIncidents">
				    	<table cellspacing="0" @mouseleave="show=-1">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>{{item.title}}</td>
								<td>点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
				    </el-tab-pane>
				    <!--系统公告-->
				    <el-tab-pane label="系统公告" name="systemBulletin">
				    	<table cellspacing="0" @mouseleave="show=-1">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>{{item.title}}</td>
								<td>点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
				    </el-tab-pane>
				    <!--药物事件-->
				    <el-tab-pane label="药物事件" name="drugIncidents">
				    	<table cellspacing="0" @mouseleave="show=-1">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td>{{item.time}}</td>
								<td>{{item.title}}</td>
								<td>点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
				    </el-tab-pane>
				</el-tabs>
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
            	activeName: 'new',
            	newNoticeList:[],
            	currentPage: 1,
            }
        },
        methods: {
        	handleClick(tab, event) {
        		console.log(tab.name);
		    },
		    getNewNotice(){
		    	
		    },
		    currengChange(currentPage) {// 翻页
        		alert(currentPage)
	        },
	        details(id) {
	        	this.$message(id.toString());
	        },
        },
        mounted() {
        	for(var i=1;i<11;i++){
        		this.newNoticeList.push({id:i,time: "2018/10/10",title: '本周开会的通知',clickCount: 20})
        	}
        }
    }
</script>

<style scoped>
	#announcement .data-box{
		margin: 0 20px;
	}
	#announcement .data-box table{
		width: 100%;
	}
	#announcement .data-box table tr{
		cursor: pointer;
	}
	#announcement .data-box table tr:nth-child(odd){
		background-color: #FAFAFA;
	}
	#announcement .data-box table tr:hover{
		background-color: #F5F7FA;
	}
	#announcement .data-box table td{
		padding: 5px 10px;
		font-size: 14px;
	}
	#announcement .data-box table td:nth-child(1),#announcement .data-box table td:nth-child(3){
		width: 100px;
	}
	#announcement .data-box table td:nth-child(3){
		font-size: 12px;	
	}
</style>