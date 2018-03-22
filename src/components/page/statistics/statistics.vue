<template>
	<div id="statistics-page">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="statistics-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>统计分析</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="container">
				<table cellspacing="0">
					<tr v-for="item in dataList" :keys="item.id">
						<td class="title">{{item.title}}</td>
						<td class="remakes">{{item.remakes}}</td>
					</tr>
				</table>
			</div>
		</div>
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
            	dataList:[
            		{id:1,title: '事件类型',remakes: '事件的描述信息'},
            		{id:2,title: '事件类型',remakes: '事件的描述信息'},
            		{id:3,title: '事件类型',remakes: '事件的描述信息'}
            	]
            }
        },
        methods: {
        },
		mounted() {
		}
	}
</script>

<style scoped>
	#statistics-page .container{
		width: 90%;
		margin: 0 auto;
	}
	#statistics-page .container table{
		width: 100%;
	}
	#statistics-page .container tr:nth-child(odd){
		background-color: #FAFAFA;
	}
	#statistics-page .container tr:hover{
		background-color: #F5F7FA;
	}
	#statistics-page .container td{
		padding: 5px;
	}
	#statistics-page .container td.title{
		width: 200px;
		text-align: center;
	}
</style>