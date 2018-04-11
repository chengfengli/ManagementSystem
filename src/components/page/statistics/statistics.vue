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
				<!--<table cellspacing="0">
					<tr v-for="item in dataList" :keys="item.id">
						<td class="title">{{item.title}}</td>
						<td class="remakes">{{item.remakes}}</td>
					</tr>
				</table>-->
				<div id="echarts_1" style="height: 400px;"></div>
				<div id="echarts_2" style="height: 400px;"></div>
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
			var echarts_1 = this.$echarts.init(document.getElementById('echarts_1'));
			var option = {
			    xAxis: {
			        type: 'category',
			        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			    },
			    yAxis: {
			        type: 'value'
			    },
			    series: [{
			        data: [120, 200, 150, 80, 70, 110, 130],
			        type: 'bar'
			    }]
			};
			echarts_1.setOption(option);
			
			for(var i=0;i<10;i++){
				this.dataList.push({id:i,title: '事件类型',remakes: '事件的描述信息'})
			}
			
			var echarts_2 = this.$echarts.init(document.getElementById('echarts_2'));
			var option2 = {
//			    title : {
//			        text: '某站点用户访问来源',
//			        subtext: '纯属虚构',
//			        x:'center'
//			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    series : [
			        {
			            name: '访问来源',
			            type: 'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'直接访问'},
			                {value:310, name:'邮件营销'},
			                {value:234, name:'联盟广告'},
			                {value:135, name:'视频广告'},
			                {value:1548, name:'搜索引擎'}
			            ],
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};
			echarts_2.setOption(option2);
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