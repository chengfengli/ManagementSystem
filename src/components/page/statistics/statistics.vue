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
            	dataList:[]
            }
        },
        methods: {
        },
		mounted() {
			for(var i=0;i<10;i++){
				this.dataList.push({id:i,title: '事件类型',remakes: '事件的描述信息'})
			}
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
	#statistics-page .container td{
		padding: 5px;
	}
	#statistics-page .container td.title{
		width: 200px;
		text-align: center;
	}
</style>