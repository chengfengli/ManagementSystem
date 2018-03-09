<template>
	<div id="notice">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="notice-body">
			<div class="current">当前位置：首页 > 个人中心</div>
			<div class="data-box">
				<table cellspacing="0">
					<tr v-for="item in list" @mouseover="showDel(item.id)">
						<td>{{item.name}}</td>
						<td><a v-if="show == item.id" href="javascript:void(0)">删除</a></td>
						<td>
							<div>{{item.title}}</div>
							<div>留言：{{item.message}}</div>
						</td>
					</tr>
				</table>
				<el-pagination layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
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
            	list: []
            }
        },
        methods: {
        	showDel(index) {
        		this.show = index;
        	},
        	currengChange(currentPage) {
        		alert(currentPage)
        	}
        },
        mounted() {
        	for(var i=1;i<21;i++){
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
	#notice .data-box table tr:nth-child(odd){
		background-color: #ccc;
	}
	#notice .data-box table td{
		padding: 5px 10px;
	}
	#notice .data-box table td:nth-child(2){
		width: 50px;
	}
</style>