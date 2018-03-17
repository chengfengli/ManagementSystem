<template>
	<div id="announcementMana">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="announcementMana-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>发布公告</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="data-box">
				<div style="padding: 10px 0;">
					<el-button type="primary" plain @click="addTypeDialog=true" size="mini">新增分类</el-button>
					<el-button type="primary" plain @click="delType" size="mini">删除分类</el-button>
					<el-button type="primary" plain @click="addAnnouncementDialog=true" size="mini">发布公告</el-button>
				</div>
				<el-row class="tac">
					<el-col :span="2">
					    <el-menu default-active="1" class="el-menu-vertical-demo">
						    <el-menu-item index="1">事件公告</el-menu-item>
						    <el-menu-item index="2">流程制度</el-menu-item>
						    <el-menu-item index="3">器械事件</el-menu-item>
						    <el-menu-item index="4">部门公告</el-menu-item>
						    <el-menu-item index="5">系统方法</el-menu-item>
						    <el-menu-item index="6">药品事件</el-menu-item>
					    </el-menu>
					</el-col>
					<el-col :span="21" :offset="1">
						<table cellspacing="0">
							<tr v-for="item in newNoticeList" :key="item.id" @click="details(item.id)">
								<td class="time">{{item.time}}</td>
								<td class="title">{{item.title}}</td>
								<td class="btn">{{item.title}}</td>
								<td class="sender">{{item.title}}</td>
								<td class="click-cunt">点击量({{item.clickCount}})</td>
							</tr>
						</table>
						<page :page="1" @change="pagechange" :total="total" :limits="[5,10,15,20,25]" :pageSize="20"></page>
					</el-col>
				</el-row>
			</div>
		</div>
		<!--发布公告-->
		<el-dialog title="发布公告" :visible.sync="addAnnouncementDialog" width="40%" :close-on-click-modal="false" :show-close="false">
		  <add-announcement @closeDialog="addAnnouncementDialog=false"></add-announcement>
		</el-dialog>
		<!--新增分类-->
		<el-dialog title="新增分类" :visible.sync="addTypeDialog" width="40%" :close-on-click-modal="false" :show-close="false">
		  <add-type @closeDialog="addTypeDialog=false"></add-type>
		</el-dialog>
	</div>
</template>

<script>
	import elHead from '../../common/Header.vue';
	import addAnnouncement from '../announcement/addAnnouncement.vue';
	import addType from '../announcement/addType.vue';
	import Page from '../../common/Page.vue';
	export default {
		components:{
			elHead,
			addAnnouncement,
			addType,
			Page
       },
        data: function(){
            return {
            	tabPosition: 'right',
            	activeName: 'new',
            	newNoticeList:[],
            	currentPage: 1,
            	addAnnouncementDialog: false,
            	addTypeDialog: false,
            	total: 100
            }
        },
        methods: {
	        details(id) {
	        	this.$message(id.toString());
	        },
	        addAnnouncement() {
	        	
	        },
	        pagechange(page,pageSize) {
	        },
	        delType() {
	        }
        },
        mounted() {
        	for(var i=1;i<21;i++){
        		this.newNoticeList.push({"id":i,"time": "2018/10/10","title": "本周开会的通知","sender":"系统管理员","clickCount": 20})
        	}
        }
    }
</script>

<style scoped>
	#announcementMana .data-box{
		margin: 0 20px;
	}
	#announcementMana .data-box .el-tag{
	    cursor: pointer;
	}
	#announcementMana .data-box .el-menu-item{
		text-align: center;
	}
	#announcementMana .el-menu{
		background-color: transparent;
		border: 0;
	}
	#announcementMana .el-menu-item{
		margin-bottom: 10px;
		background-color: rgb(238, 246, 246);
	}
	#announcementMana .is-active,#announcementMana .el-menu-item:hover{
		background-color: #00d1b2;
		color: #fff;
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