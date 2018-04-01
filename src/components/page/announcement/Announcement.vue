<template>
	<div id="announcement">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="announcement-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>公告</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="data-box">
				<el-row class="tac">
					<el-col :span="2">
					    <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" @select="select">
						    <el-menu-item v-for="item in typeList" :keys="item.ID" :index="item.ID">{{item.NAME}}</el-menu-item>
					    </el-menu>
					</el-col>
					<el-col :span="21" :offset="1">
						<table cellspacing="0">
							<tr v-for="item in afficheList" :key="item.ID" @click="details(item.ID)">
								<td class="time">{{item.PUBLISHDATE}}</td>
								<td class="title">{{item.TITLE}}</td>
								<td class="btn"></td>
								<td class="sender">{{item.PUSHER}}</td>
								<td class="click-cunt">点击量({{item.CLICKS}})</td>
							</tr>
						</table>
						<el-pagination @size-change="changeSize" @current-change="changePage" :current-page="page" :page-sizes="[10,20,30,50]" 
							:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
					</el-col>
				</el-row>
			</div>
		</div>
		<!--公告详情-->
		<el-dialog title="公告详情" :visible.sync="addAnnouncementDialog" width="40%" :close-on-click-modal="false" :show-close="false">
			<el-form label-width="80px">
				<el-form-item label="标题">
				    
				</el-form-item>
				<el-form-item label="发布时间">
				    
				</el-form-item>
				<el-form-item label="置顶">
				    
				</el-form-item>
	            <el-form-item prop="CONTENT" label="内容">
	            </el-form-item>
	            <el-form-item label-width="40px">
	                
	            </el-form-item>
	            <div class="btn-box">
	            	<el-button @click="addAnnouncementDialog=false" size="mini">关闭</el-button>
	            </div>
	        </el-form>
		</el-dialog>
	</div>
</template>

<script>
	import elHead from '../../common/Header.vue';
	export default {
		components:{
			elHead
       },
        data: function(){
            return {
            	activeName: 'new',
            	typeList:[],
            	afficheList:[],
            	defaultIndex: null,
            	page:1,
            	pageSize: 10,
            	total:0,
            	addAnnouncementDialog: false
            }
        },
        methods: {
		    select(index) {
	        	this.afficheListInit(index);
	        },
		    currengChange(currentPage) {// 翻页
        		alert(currentPage)
	        },
	        details(id) {
	        	this.$http.post('/affiche/detail/'+id).then(res => {
					if(res.code == 10000) {
						this.addAnnouncementDialog = true;
					} else {
						this.$message.error(res.msg);
					}
				}).catch(function(error) {
					console.log(error);
				})
	        },
	        typeListInit() {// 获取类型
	        	this.$http.post('/affiche/listType').then(res => {
					if(res.code == 10000) {
						this.typeList = res.data;
						if(res.data.length!=0){
							this.defaultIndex = res.data[0].ID;
							this.afficheListInit(this.defaultIndex);
						}
					} else {
						this.$message.error(res.msg);
					}
				}).catch(function(error) {
					console.log(error);
				})
	        },
	        afficheListInit(typeId) {// 根据类型获取对应的数据
	        	this.$http.post('/affiche/list/'+typeId,{page:this.page,pageSize:this.pageSize}).then(res => {
					if(res.code == 10000) {
						this.total = res.data.totalPage;
						this.afficheList = res.data.rows;
					} else {
						this.$message.error(res.msg);
					}
				}).catch(function(error) {
					console.log(error);
				})
	        }
        },
        mounted() {
			this.typeListInit();
        }
    }
</script>

<style scoped>
	#announcement .data-box{
		margin: 0 20px;
		min-width: 1300px;
	}
	#announcement .data-box .el-tag{
	    cursor: pointer;
	}
	#announcement .data-box .el-menu-item{
		text-align: center;
	}
	#announcement .el-menu{
		background-color: transparent;
		border: 0;
	}
	#announcement .el-menu-item{
		margin-bottom: 10px;
		background-color: rgb(238, 246, 246);
	}
	#announcement .is-active,#announcement .el-menu-item:hover{
		background-color: #00d1b2;
		color: #fff;
	}
	#announcement .data-box .el-col-2{
		min-width: 100px;
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
	#announcement .btn-box{
		text-align: center;
		margin:20px 0;
	}
</style>