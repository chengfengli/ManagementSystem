<template>
	<div id="notice">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="notice-body">
			<div class="current">当前位置：<a href="#/index">首页</a> > 个人通知</div>
			<div class="data-box">
				<table cellspacing="0" @mouseleave="show=-1">
					<tr v-for="item in list" @mouseover="showDel(item.id)" @click="details(item.id)">
						<td>{{item.name}}</td>
						<td><a v-if="show == item.id" class="del-btn" href="javascript:void(0)" @click="del(item.id)">删除</a></td>
						<td>
							<div class="title">{{item.title}}</div>
							<div class="txt">留言：{{item.message}}</div>
						</td>
					</tr>
				</table>
				<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
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
            	currentPage:1
            }
        },
        methods: {
        	getDataCount() {
        		
        	},
        	initDate(page) {// 加载数据
        		
        	},
        	showDel(index) {
        		this.show = index;
        	},
        	del(id) {// 删除
        		alert('del')
        	},
        	details(id) {// 详情
        		this.currentPage = id;
        	},
        	currengChange(currentPage) {// 翻页
        		alert(currentPage)
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