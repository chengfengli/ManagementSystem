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
					<el-button type="primary" plain @click="addAnnouncementDialog=true;obj=null" size="mini">发布公告</el-button>
				</div>
				<table>
					<tr>
						<td style="width: 150px;" valign="top">
							<el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" @select="select">
							    <el-menu-item v-for="item in typeList" :keys="item.ID" :index="item.ID.toString()">{{item.NAME}}</el-menu-item>
						    </el-menu>
						</td>
						<td valign="top" style="padding-left: 15px;padding-top: 10px;">
							<table cellspacing="0" @mouseleave="showBtn=0">
								<tr class="data-tr" v-if="total!=0" v-for="item in afficheList" :key="item.ID" @mouseover="showBtn=item.ID">
									<td class="time">{{item.PUBLISHDATE}}</td>
									<td class="title"><span class="edit" @click="detail(item.ID)">{{item.TITLE}}</span></td>
									<td class="btn"><span v-if="showBtn==item.ID"><span class="edit" @click="edit(item.ID)">编辑</span><span class="del" @click="del(item.ID)">删除</span></span></td>
									<td class="sender">{{item.PUSHER}}</td>
									<td class="click-cunt">点击量({{item.CLICKS}})</td>
								</tr>
							</table>
							<div v-if="total==0" class="not-data">暂无数据</div>
							<el-pagination v-if="total!=0" @size-change="changeSize" @current-change="changePage" :current-page="page" :page-sizes="[10,20,30,50]" 
								:page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<!--发布公告-->
		<el-dialog title="发布公告" :visible.sync="addAnnouncementDialog" width="40%" :close-on-click-modal="false" :show-close="false">
		  <add-announcement v-if="addAnnouncementDialog" @closeDialog="addAnnouncementDialog=false;id=0" @refreshAn="refreshAn" :type="defaultIndex" :obj="obj"></add-announcement>
		</el-dialog>
		<!--新增分类-->
		<el-dialog title="新增分类" :visible.sync="addTypeDialog" width="270px" :close-on-click-modal="false" :show-close="false">
		  <add-type v-if="addTypeDialog" @closeDialog="addTypeDialog=false" @refreshType="refreshType"></add-type>
		</el-dialog>
		<!--公告详情-->
		<el-dialog title="公告详情" :visible.sync="detailDialog" width="40%" :close-on-click-modal="false" :show-close="false">
			<el-form v-if="obj!=null" label-width="90px">
				<el-form-item label="标题：">
				    {{obj.TITLE}}
				</el-form-item>
				<el-form-item label="发布时间：">
				    {{obj.PUBLISHDATE}}
				</el-form-item>
				<el-form-item label="置顶：">
				    <span v-if="obj.TOP==0">未置顶</span>
				    <span v-else>置顶</span>
				</el-form-item>
	            <el-form-item prop="CONTENT" label="内容：">
	            	<div style="line-height: 20px;padding-top: 10px;" v-html="obj.CONTENT"></div>
	            </el-form-item>
	            <div class="btn-box">
	            	<el-button @click="detailDialog=false" size="mini">关闭</el-button>
	            </div>
	        </el-form>
		</el-dialog>
	</div>
</template>

<script>
	import elHead from '../../common/Header.vue';
	import addAnnouncement from '../announcement/addAnnouncement.vue';
	import addType from '../announcement/addType.vue';
	export default {
		components:{
			elHead,
			addAnnouncement,
			addType,
       	},
        data: function(){
            return {
            	typeList:[],
            	afficheList:[],
            	defaultIndex: null,
            	newNoticeList:[],
            	addAnnouncementDialog: false,
            	addTypeDialog: false,
            	detailDialog:false,
            	showBtn:0,
            	page: 1,
            	pageSize: 10,
            	total: 0,
            	obj:null
            }
        },
        methods: {
	        details(id) {
	        	this.$message(id.toString());
	        },
	        select(index) {
	        	this.defaultIndex = index.toString();
	        	this.afficheListInit();
	        },
	        refreshType() {
	        	this.typeListInit();
	        },
	        refreshAn() {
	        	this.id=0;
	        	this.afficheListInit();
	        },
	        changeSize(pageSize) {
	        	this.pageSize = pageSize;
	        	this.afficheListInit();
	        },
	        changePage(page) {
	        	this.page = page;
	        	this.afficheListInit();
	        },
	        delType() {//删除类型
	        	this.$confirm('确定删除当前选中的分类吗?', '温馨提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	showClose: false,
		          	center: true
		        }).then(() => {
		        	this.$http.post('/affiche/delType/'+this.defaultIndex).then(res => {
						if(res.code == 10000) {
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					        this.typeListInit();
						} else {
							this.$message.error(res.msg);
						}
					}).catch(function(error) {
						this.$message.error(error);
					})
		        }).catch(res=>{});
	        },
	        typeListInit() {// 获取类型
	        	this.$http.post('/affiche/listType').then(res => {
					if(res.code == 10000) {
						this.typeList = res.data;
						if(res.data.length!=0){
							this.defaultIndex = res.data[0].ID.toString();
							this.afficheListInit();
						}
					} else {
						this.$message.error(res.msg);
					}
				}).catch(function(error) {
					this.$message.error(error);
				})
	        },
	        afficheListInit() {// 根据类型获取对应的数据
	        	this.$http.post('/affiche/list/'+this.defaultIndex,{page:this.page,pageSize:this.pageSize}).then(res => {
					if(res.code == 10000) {
						this.total = res.data.totalPage;
						this.afficheList = res.data.rows;
					} else {
						this.$message.error(res.msg);
					}
				}).catch(function(error) {
					this.$message.error(error);
				})
	      	},
	      	edit(id) {//编辑公告
	      		this.$http.post('/affiche/detail/'+id).then(res=>{
	        		if(res.code == 10000){
            			this.obj = res.data;
            			this.addAnnouncementDialog=true;
            		}else{
            			this.$message.error(res.msg);
            		}
	        	})
	      	},
	      	del(id) {//删除公告
	      		this.$confirm('确定删除该数据吗?', '温馨提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	showClose: false,
		          	center: true
		        }).then(() => {
		        	this.$http.post('/affiche/del/'+id).then(res => {
						if(res.code == 10000) {
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					        this.afficheListInit();
						} else {
							this.$message.error(res.msg);
						}
					}).catch(function(error) {
						this.$message.error(error);
					})
		        }).catch(res=>{});
	      	},
	      	detail(id){
	      		this.$http.post('/affiche/detail/'+id).then(res=>{
	        		if(res.code == 10000){
            			this.obj = res.data;
            			this.detailDialog=true;
            		}else{
            			this.$message.error(res.msg);
            		}
	        	})
	      	}
        },
        mounted() {
        	this.typeListInit();
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
	#announcementMana .data-box table table{
		width: 100%;
	}
	#announcementMana .data-box table table tr:nth-child(odd){
		background-color: #FAFAFA;
	}
	#announcementMana .data-box table table tr:hover{
		background-color: #F5F7FA;
	}
	#announcementMana .data-box table table td{
		padding: 5px 10px;
		font-size: 14px;
	}
	#announcementMana .data-box table table td:nth-child(1),#announcementMana .data-box table td:nth-child(3){
		width: 100px;
	}
	#announcementMana .data-box table table td:nth-child(3){
		font-size: 12px;	
	}
	#announcementMana .btn{
		width: 100px;
	}
	#announcementMana .edit,#announcementMana .del{
		display: inline-block;
		margin: 0 5px;
		cursor:pointer;
		color: #15A6DB;
	}
	#announcementMana .edit:hover,#announcementMana .del:hover{
		color: #00d1b2;
	}
	.btn-box{
		text-align: center;
		margin:20px 0;
	}
	.data-tr{
		border-bottom: 1px solid #CCCCCC;
	}
	
	#announcementMana .el-input--mini .el-input__inner{
	    line-height: 0!important;
	    -ms-line-height:  0!important;
	 }
	#announcementMana .el-input__inner{
	   line-height: 0!important;
	   -ms-line-height:  0!important;
	}
</style>