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
					<tr v-for="item in dataList" :keys="item.KEY" @click="statistics(item.KEY)">
						<td class="title">{{item.NAME}}</td>
						<td class="remakes">{{item.MARK}}</td>
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
        	statistics(key){
        		this.$router.push('/statistics');
        	}
        },
		mounted() {
			this.$http.post('/eventSummary/statisticsMethod').then(res => {
		        if (res.code == 10000) {
		            this.dataList = res.data;
		        } else {
		            this.$message.error(res.msg);
		        }
	        }).catch(function (error) {
	          console.log(error);
	        })
		}
	}
</script>

<style scoped>
	#statistics-page .container table{
		width: 100%;
	}
	#statistics-page .container td{
		padding: 10px;
	}
	#statistics-page .container td.title{
		width: 200px;
		text-align: center;
	}
	table tr{
		cursor:pointer;
		font-size: 14px;
	}
	table tr:nth-child(odd){
		background-color: #FAFAFA;
	}
	table tr:hover{
		background-color: #839965;
		color: #fff;
	}
</style>