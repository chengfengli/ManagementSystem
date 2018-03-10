<template>
	<div id="announcementMana">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="announcementMana-body">
			<div class="current">当前位置：<a href="#/index">首页</a> > 公告</div>
			<div class="data-box">
				<div style="padding: 10px 0;">
					<el-tag>新增分类</el-tag>
					<el-tag>删除分类</el-tag>
					<el-tag>发布公告</el-tag>
				</div>
				<el-row class="tac">
					<el-col :span="2">
					    <el-menu default-active="1"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
						    <el-menu-item index="1">事件公告</el-menu-item>
						    <el-menu-item index="2">流程制度</el-menu-item>
						    <el-menu-item index="3">器械事件</el-menu-item>
						    <el-menu-item index="4">部门公告</el-menu-item>
						    <el-menu-item index="5">系统方法</el-menu-item>
						    <el-menu-item index="6">药品事件</el-menu-item>
					    </el-menu>
					</el-col>
					<el-col :span="22">
						<table cellspacing="0">
							<tr v-for="item in newNoticeList" @click="details(item.id)">
								<td class="time">{{item.time}}</td>
								<td class="title">{{item.title}}</td>
								<td class="btn">{{item.title}}</td>
								<td class="sender">{{item.title}}</td>
								<td class="click-cunt">点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
					</el-col>
				</el-row>
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
            	tabPosition: 'right',
            	activeName: 'new',
            	newNoticeList:[],
            	currentPage: 1,
            }
        },
        methods: {
        	handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    handleClose(key, keyPath) {
		        console.log(key, keyPath);
		    },
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
        	for(var i=1;i<21;i++){
        		this.newNoticeList.push({id:i,time: "2018/10/10",title: '本周开会的通知',sender:"系统管理员",clickCount: 20})
        	}
        }
    }
</script>

<style scoped>
	#announcementMana .data-box{
		margin: 0 20px;
	}
	#announcementMana .data-box .el-tag{
	    background-color: #00d1b2;
	    cursor: pointer;
	    margin-right: 15px;
	}
	#announcementMana .data-box .el-menu-item{
		text-align: center;
	}
	#announcementMana .data-box .el-col-2{
		min-width: 100px;
	}
	#announcementMana .data-box table{
		width: 100%;
	}
	#announcementMana .data-box table tr{
		cursor: pointer;
	}
	#announcementMana .data-box table tr:nth-child(odd){
		background-color: #FAFAFA;
	}
	#announcementMana .data-box table tr:hover{
		background-color: #F5F7FA;
	}
	#announcementMana .data-box table td{
		padding: 5px 10px;
		font-size: 14px;
	}
	#announcementMana .data-box table td:nth-child(1),#announcement .data-box table td:nth-child(3){
		width: 100px;
	}
	#announcement .data-box table td:nth-child(3){
		font-size: 12px;	
	}
</style>