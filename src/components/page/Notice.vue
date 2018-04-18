<template>
	<div id="notice">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="notice-body">
			<div class="current">
				<el-breadcrumb class="nav-box" separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>个人通知</el-breadcrumb-item>
				  	
				</el-breadcrumb>
				<span class="tips">点击消息标题，可直接跳转到事件。注：消息只是反映事件当事的状态，可能与当前事件状态不符!</span>
			</div>
			<div class="data-box">
				<table cellspacing="0" @mouseleave="show=-1">
					<tr v-for="item in list" :keys="item.ID" @mouseover="showDel(item.ID)" @click="details(item.ID,item.TYPE)">
						<td class="user-name">
							{{item.SENDER}}
							<div class="send-time">2018-09-15 15:23</div>
						</td>
						<td>
							<span v-if="item.READ==1" class="status readed"></span>
							<span v-else class="status unread"></span>
							<a v-if="show == item.ID" class="del-btn" href="javascript:void(0)" @click="del(item.ID)">删除</a>
						</td>
						<td>
							<div class="title">{{item.TITLE}}</div>
							<div class="txt">留言：{{item.LW}}</div>
						</td>
					</tr>
				</table>
				<el-pagination @size-change="changeSize" @current-change="changePage" :current-page="page"
	        	:page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
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
            	show: -1,
            	list: [],
            	page:1,
            	pageSize: 10,
            	total:0
            }
        },
        methods: {
        	changeSize(pageSize) {
        		this.pageSize = pageSize;
        		this.dataInit();
        	},
        	changePage(page) {
        		this.page = page;
        		this.dataInit();
        	},
        	showDel(index) {//显示删除按钮
        		this.show = index;
        	},
        	del(id) {// 删除
        		this.$confirm('确定删除该数据吗?', '温馨提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	showClose: false,
		          	center: true
		        }).then(res => {
		        	this.$http.post('/notice/del/'+id).then(res => {
						if(res.code == 10000) {
							this.$message({
					            type: 'success',
					            message: '删除成功!'
					        });
					        this.dataInit();
						} else {
							this.$message.error(res.msg);
						}
					}).catch(function(error) {
						this.$message.error(error);
					})
		        }).catch(res=>{});
        	},
        	details(id,type) {// 阅读通知
        		this.$http.post('/notice/read/'+id).then(res => {
					if(res.code == 10000) {
						this.dataInit();
					} else {
						this.$message.error(res.msg);
					}
				}).catch(function(error) {
					this.$message.error(error);
				})
        		if(id==1){
        			this.$router.push({
		                path: 'eventProcessing',
		                query: {id: id}
		           })
        		}
        	},
        	dataInit() {
        		this.$http.post('/notice/list',{page:this.page,pageSize:this.pageSize}).then(res => {
					if(res.code == 10000) {
						this.list = res.data.rows;
						this.total = res.data.totalSize;
					} else {
						this.$message.error(res.msg);
					}
				}).catch(function(error) {
					this.$message.error(error);
				})
        	}
        },
        mounted() {
        	this.dataInit();
        }
    }
</script>

<style scoped>
	#notice .data-box{
		padding: 0 30px;
	}
	#notice .nav-box{
		display: inline-block;
	}
	#notice .tips{
		color: #15A6DB;
		position: relative;
		top: -2px;
		margin-left: 50px;
	}
	#notice .data-box table{
		width: 100%;
		margin-top: 20px;
	}
	#notice .data-box table .del-btn{
		font-size: 14px;
		color: orangered;
	}
	#notice .data-box table td{
		border-bottom: 1px solid #CCCCCC;
	}
	#notice .data-box table tr .title{
		font-size: 14px;
    	font-weight: bold;
    	cursor: pointer;
    	color: #666666;
	}
	#notice .data-box table tr .title:hover{
		color: #15A6DB;
		text-decoration: underline;
	}
	#notice .data-box table tr .txt{
		font-size: 12px;
		color: #AAAAAA;
		margin-top: 3px;
	}
	#notice .data-box table tr:nth-child(even){
		background-color: #F5F5F5;
	}
	#notice .data-box table tr:hover{
		background-color: #F5F5F5;
	}
	#notice .data-box table td{
		padding: 5px 10px;
	}
	#notice .data-box table td:nth-child(2){
		width: 50px;
	}
	#notice .user-name{
		width: 130px;
		color: #666666;
	}
	#notice .send-time{
		color: #ccc;
	}
	/*阅读状态*/
	#notice .status{
		display: inline-block;
		height: 10px;
		width: 10px;
		border-radius: 50%;
	}
	#notice .readed{
		background-color: green;
	}
	#notice .unread{
		background-color: red;
	}
</style>