<template>
	<div id="notice">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="notice-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>个人通知</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="data-box">
				<table cellspacing="0" @mouseleave="show=-1">
					<tr v-for="item in list" :keys="item.id" @mouseover="showDel(item.id)" @click="details(item.id)">
						<td>{{item.name}}</td>
						<td><a v-if="show == item.id" class="del-btn" href="javascript:void(0)" @click="del(item.id)">删除</a></td>
						<td>
							<div class="title">{{item.title}}</div>
							<div class="txt">留言：{{item.message}}</div>
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
            	total:100
            }
        },
        methods: {
        	changeSize(pageSize) {
        		
        	},
        	changePage(page) {
        		
        	},
        	showDel(index) {
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
		          this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
		        }).catch(res=>{});
        	},
        	details(id) {// 详情
        		this.currentPage = id;
        	}
        },
        mounted() {
        	for(var i=1;i<11;i++){
        		this.list.push({id:i,name: "张三",title: '本周开会的通知',message: '请各位同事准时参加！'})
        	}
        }
    }
</script>

<style scoped>
	#notice .data-box{
		padding: 0 60px;
	}
	#notice .data-box table{
		width: 100%;
		margin-top: 20px;
	}
	#notice .data-box table .del-btn{
		font-size: 14px;
	}
	#notice .data-box table tr .title{
		font-size: 16px;
    	font-weight: bold;
	}
	#notice .data-box table tr .txt{
		font-size: 14px;
	}
	#notice .data-box table tr:nth-child(odd){
		background-color: #FAFAFA;
	}
	#notice .data-box table tr:hover{
		background-color: #F5F7FA;
	}
	#notice .data-box table td{
		padding: 5px 10px;
	}
	#notice .data-box table td:nth-child(2){
		width: 50px;
	}
</style>