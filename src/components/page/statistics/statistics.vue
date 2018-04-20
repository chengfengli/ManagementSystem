<template>
	<div id="statistics-page">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="statistics-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item :to="{ path: 'statisticsList' }">统计分析</el-breadcrumb-item>
				  	<el-breadcrumb-item>事件总览</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="container" >
				<div>
					<table>
						<tr>
							<td class="td-width">事件状态<span class="selectAll" @click="selectAll('status')">全选</span></td>
							<td class="td-width">事件类型<span class="selectAll" @click="selectAll('type')">全选</span></td>
							<td class="td-width">事件等级<span class="selectAll" @click="selectAll('level')">全选</span></td>
							<td class="td-width">事件标识<span class="selectAll" @click="selectAll('flag')">全选</span></td>
							<td style="width: 270px;">上报起止日期<span class="time" @click="currentYear()">当年</span><span class="time" @click="currentMonth()">当月</span><span class="time" @click="lastMonth()">上月</span></td>
							<td class="td-width">填报科室</td>
							<td class="td-width">事件序号/标号</td>
						</tr>
						<tr>
							<td>
								<el-select v-model="status" multiple collapse-tags placeholder="请选择" size="mini">
								    <el-option v-for="item in eventStatus" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
								</el-select>
							</td>
							<td>
								<el-select v-model="types" multiple collapse-tags placeholder="请选择" size="mini">
								    <el-option v-for="item in eventTypes" :key="item.EVENTTYPEID" :label="item.TYPENAME" :value="item.EVENTTYPEID"></el-option>
								</el-select>
							</td>
							<td>
								<el-select v-model="levels" multiple collapse-tags placeholder="请选择" size="mini">
								    <el-option v-for="item in eventLevels" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
								</el-select>
							</td>
							<td>
								<el-select v-model="flags" multiple collapse-tags placeholder="请选择" size="mini">
								    <el-option v-for="item in eventFlags" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
								</el-select>
							</td>
							<td>
								<el-date-picker v-model="form.STARTTIME" type="date" placeholder="选择日期" size="mini"></el-date-picker>-
								<el-date-picker v-model="form.ENDTIME" type="date" placeholder="选择日期" size="mini"></el-date-picker>
							</td>
							<td>
								<el-select v-model="form.REPORTDEPT" placeholder="请选择" size="mini">
								    <el-option v-for="item in depts" :key="item.VALUE" :label="item.DISPLAY" :value="item.VALUE"></el-option>
								</el-select>
							</td>
							<td>
								<el-input v-model="form.TITLE" min="0" size="mini"></el-input>
							</td>
							<td>
								<el-button type="success" size="mini" @click="select()">查询</el-button>
								<el-button size="mini">导出Excel报表</el-button>
							</td>
						</tr>
					</table>
				</div>
				<div style="margin-top: 15px;">
					<table>
						<tr>
							<td>
								<div class="toolsbar">
									<img src="../../../../static/img/statistics/5.png" @click="setEchartsBar('echarts_1','COLLECTBYTYPE','事件类型统计')"/>
									<img src="../../../../static/img/statistics/6.png" @click="setEchartsBar2('echarts_1','COLLECTBYTYPE','事件类型统计')"/>
									<img src="../../../../static/img/statistics/3.png" @click="setEchartsLine('echarts_1','COLLECTBYTYPE','事件类型统计')"/>
									<img src="../../../../static/img/statistics/2.png" @click="setEchartsPie('echarts_1','COLLECTBYTYPE','事件类型统计')"/>
								</div>
								<div id="echarts_1" style="height: 300px;"></div>
							</td>
							<td style="width: 35%;">
								<div class="toolsbar">
									<img src="../../../../static/img/statistics/6.png" @click="setEchartsBar2('echarts_2','COLLECTBYLEVEL','事件等级统计')"/>
									<img src="../../../../static/img/statistics/2.png" @click="setEchartsPie('echarts_2','COLLECTBYLEVEL','事件等级统计')"/>
								</div>
								<div id="echarts_2" style="height: 300px;"></div>
							</td>
						</tr>
						<tr>
							<td>
								<div class="toolsbar">
									<img src="../../../../static/img/statistics/5.png" @click="setEchartsBar('echarts_3','COLLECTBYDEPT','上报科室统计')"/>
									<img src="../../../../static/img/statistics/6.png" @click="setEchartsBar2('echarts_3','COLLECTBYDEPT','上报科室统计')"/>
									<img src="../../../../static/img/statistics/3.png" @click="setEchartsLine('echarts_3','COLLECTBYDEPT','上报科室统计')"/>
									<img src="../../../../static/img/statistics/2.png" @click="setEchartsPie('echarts_3','COLLECTBYDEPT','上报科室统计')"/>
								</div>
								<div id="echarts_3" style="height: 300px;"></div>
							</td>
							<td style="width: 35%;">
								<div class="toolsbar">
									<img src="../../../../static/img/statistics/6.png" @click="setEchartsBar2('echarts_4','COLLECTBYSTATUS','事件状态统计')"/>
									<img src="../../../../static/img/statistics/2.png" @click="setEchartsPie('echarts_4','COLLECTBYSTATUS','事件状态统计')"/>
								</div>
								<div id="echarts_4" style="height: 300px;"></div>
							</td>
						</tr>
					</table>
					
				</div>
				
				
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
            	dataList:[],
            	eventStatus:[],
            	status:[],
            	eventTypes:[],
            	types:[],
            	eventLevels:[],
            	levels:[],
            	eventFlags:[],
            	flags:[],
            	depts:[],
            	form:{
            		STATUS:null,
            		TYPE:null,
            		LEVEL:null,
            		FLAG:null,
            		STARTTIME:null,
            		ENDTIME:null,
            		REPORTDEPT:null,
            		TITLE:null
            	}
            }
        },
        methods: {
        	select(){
        		this.form.STATUS=this.status.join(',');
        		this.form.TYPE=this.types.join(',');
        		this.form.LEVEL=this.levels.join(',');
        		this.form.FLAG=this.flags.join(',');
        		this.getData();
        	},
        	selectAll(type){
        		if(type=='status'){
        			this.status=[];
        			for(var i in this.eventStatus){
        				this.status.push(this.eventStatus[i].VALUE);
        			}
        		}else if(type=='type'){
        			this.types=[];
        			for(var i in this.eventTypes){
        				this.types.push(this.eventTypes[i].EVENTTYPEID);
        			}
        		}else if(type=='level'){
        			this.levels=[];
        			for(var i in this.eventLevels){
        				this.levels.push(this.eventLevels[i].VALUE);
        			}
        		}else if(type=='flag'){
        			this.flags=[];
        			for(var i in this.eventFlags){
        				this.flags.push(this.eventFlags[i].VALUE);
        			}
        		}
        	},
        	lastMonth(){
        		var nowdays = new Date();
			    var year = nowdays.getFullYear();
			    var month = nowdays.getMonth();
			    if(month==0){
			        month=12;
			        year=year-1;
			    }
			   	if (month < 10) {
		        	month = "0" + month;
		    	}
				var firstDay = year + "-" + month + "-" + "01";
				var myDate = new Date(year, month, 0);
				var lastDay = year + "-" + month + "-" + myDate.getDate();
				this.form.STARTTIME = firstDay;
				this.form.ENDTIME = lastDay;
        	},
        	currentMonth(){
        		var nowdays = new Date();
			    var year = nowdays.getFullYear();
			    var month = nowdays.getMonth()+1;
			    if(month==0){
			        month=12;
			    }
			   	if (month < 10) {
		        	month = "0" + month;
		    	}
				var firstDay = year + "-" + month + "-" + "01";
				var lastDay = year + "-" + month + "-" + nowdays.getDate();
				this.form.STARTTIME = firstDay;
				this.form.ENDTIME = lastDay;
        	},
        	currentYear(){
        		var nowdays = new Date();
			    var year = nowdays.getFullYear();
			    var month = nowdays.getMonth()+1;
			   	if (month < 10) {
		        	month = "0" + month;
		    	}
				var firstDay = year + "-01-" + "01";
				var lastDay = year + "-" + month + "-" + nowdays.getDate();
				this.form.STARTTIME = firstDay;
				this.form.ENDTIME = lastDay;
        	},
        	getData(){
        		this.$http.post('/eventSummary/eventOverView',this.form).then(res => {
			        if (res.code == 10000) {
			            this.dataList = res.data;
			            this.setEchartsBar('echarts_1','COLLECTBYTYPE','事件类型统计');
			            this.setEchartsPie('echarts_2','COLLECTBYLEVEL','事件等级统计');
			            this.setEchartsBar('echarts_3','COLLECTBYDEPT','上报科室统计');
			            this.setEchartsPie('echarts_4','COLLECTBYSTATUS','事件状态统计');
			        } else {
			            this.$message.error(res.msg);
			        }
		        }).catch(function (error) {
		          console.log(error);
		        })
        	},
        	getEventStatus(){// 事件状态
        		this.$http.post('/dic/getDicByKey/eventstatus').then(res => {
			        if (res.code == 10000) {
			            this.eventStatus = res.data;
			        } else {
			            this.$message.error(res.msg);
			        }
		        }).catch(function (error) {
		          console.log(error);
		        })
        	},
        	getEventTypes(){//事件类型
        		this.$http.post('/event/rootType').then(res => {
			        if (res.code == 10000) {
			            this.eventTypes = res.data;
			        } else {
			            this.$message.error(res.msg);
			        }
		        }).catch(function (error) {
		          console.log(error);
		        })
        	},
        	getEventLevels(){//事件等级
        		this.$http.post('/dic/getDicByKey/eventlevel').then(res => {
			        if (res.code == 10000) {
			            this.eventLevels = res.data;
			        } else {
			            this.$message.error(res.msg);
			        }
		        }).catch(function (error) {
		          console.log(error);
		        })
        	},
        	getEventFlags(){//事件标识
        		this.$http.post('/dic/getDicByKey/eventflag').then(res => {
			        if (res.code == 10000) {
			            this.eventFlags = res.data;
			        } else {
			            this.$message.error(res.msg);
			        }
		        }).catch(function (error) {
		          console.log(error);
		        })
        	},
        	getDepts(){//科室
        		this.$http.post('/dic/getDicByKey/dept').then(res => {
			        if (res.code == 10000) {
			            this.depts = res.data;
			        } else {
			            this.$message.error(res.msg);
			        }
		        }).catch(function (error) {
		          console.log(error);
		        })
        	},
        	setEchartsBar(id,key,title){
        		var data = this.dataList[key];
        		var array_x = [];
        		var array_y = [];
        		for(var i in data){
        			array_x.push(data[i].NAME);
        			array_y.push(data[i].NUM);
        		}
        		var echarts = this.$echarts.init(document.getElementById(id));
	        	var option = {
	        		title:{
	        			text:title,
	        			x:'center'
	        		},
	        		grid:{
	        			top:40,
	        			left:40,
	        			right:40,
	        			bottom:40
	        		},
				    xAxis: {
				        type: 'category',
				        data: array_x,
				        minInterval:1
				    },
				    yAxis: {
				        type: 'value',
				        minInterval:1
				    },
				    series: [{
				        data: array_y,
				        type: 'bar',
				        label:{
				        	show:true,
				        	position:'insideTop'
				        },
				        barMaxWidth:20
				    }],
				    color:this.$colors
				};
				echarts.clear();
				echarts.setOption(option);
        	},
        	setEchartsBar2(id,key,title){
        		var data = this.dataList[key];
        		var array_x = [];
	        		var array_y = [];
	        		for(var i in data){
	        			array_x.push(data[i].NAME);
	        			array_y.push(data[i].NUM);
	        		}
	        		var option = {
					    title: {
					        text: title,
					        x:'center'
					    },
					    grid: {
					        top:40,
		        			left:20,
		        			right:40,
		        			bottom:40,
					        containLabel: true
					    },
					    xAxis: {
					        type: 'value',
					        boundaryGap: [0, 0.01]
					    },
					    yAxis: {
					        type: 'category',
					        data: array_x
					    },
					    series: [
					        {
					            type: 'bar',
					            data: array_y,
					            label:{
						        	show:true,
						        	position:'insideRight'
						        }
					        }
					    ],
				    	color:this.$colors
					};
					var echarts = this.$echarts.init(document.getElementById(id));
					echarts.clear();
					echarts.setOption(option);
        	},
        	setEchartsPie(id,key,title){
        		var data = this.dataList[key];
        		var new_data=[];
	        		for(var i in data){
	        			new_data.push({value:data[i].NUM,name:data[i].NAME});
	        		}
		        	var option = {
		        		title:{
		        			text:title,
		        			x:'center'
		        		},
					    series : [
					        {
					            type: 'pie',
					            radius : '35%',
					            center: ['50%', '60%'],
					            labelLine:{
					            	length:30,
					            	length2:10
					            },
					            data:new_data,
					            label:{
					            	show:true,
					            	formatter: "{b}\n{d}%"
					            },
					            itemStyle: {
					                emphasis: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ],
				    	color:this.$colors
					};
					var echarts = this.$echarts.init(document.getElementById(id));
					echarts.clear();
					echarts.setOption(option);
        	},
        	setEchartsLine(id,key,title){
        		var data = this.dataList[key];
        		var array_x = [];
        		var array_y = [];
        		for(var i in data){
        			array_x.push(data[i].NAME);
        			array_y.push(data[i].NUM);
        		}
        		var option = {
        			title:{
	        			text:title,
	        			x:'center'
	        		},
	        		grid: {
				        top:40,
	        			left:20,
	        			right:40,
	        			bottom:40,
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        data: array_x
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
				        data: array_y,
				        type: 'line'
				    }],
				    color:this.$colors
				};
				var echarts = this.$echarts.init(document.getElementById(id));
				echarts.clear();
				echarts.setOption(option);
        	}
        },
		mounted() {
			this.getData();
			this.getEventStatus();
			this.getEventTypes();
			this.getEventLevels();
			this.getEventFlags();
			this.getDepts();
		}
	}
</script>

<style scoped>
	#statistics-page .container table{
		width: 100%;
	}
	#statistics-page .container td.title{
		width: 200px;
		text-align: center;
	}
	.statistics-body{
		min-width: 1200px;
	}
	.toolsbar img{
		width: 20px;
		cursor:pointer;
	}
	.selectAll{
		float: right;
		color: #0088FF;
		cursor: pointer;
	}
	.el-date-editor.el-input{
		width: 130px;
	}
	.td-width{
		width: 150px;
	}
	.time{
		float: right;
		color: #0088FF;
		cursor: pointer;
		margin-left: 10px;
	}
</style>