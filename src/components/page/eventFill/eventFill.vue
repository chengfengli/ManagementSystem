<template>
	<div id="eventFill-page">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="eventFill-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item :to="{ path: 'eventFillIndex' }">事件填报</el-breadcrumb-item>
				  	<el-breadcrumb-item>填报页面</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="body">
				<div class="btn-box">
					<el-button id="temporary-btn" type="primary" size="mini">暂存</el-button>
					<el-button id="submit-btn" type="primary" size="mini">提交</el-button>
				</div>
				<el-tabs v-model="activeName" type="card">
				    <el-tab-pane label="医疗事件" name="first">医疗事件</el-tab-pane>
				    <el-tab-pane label="事件情况描述" name="second">事件情况描述</el-tab-pane>
				    <el-tab-pane label="一般情况" name="third">一般情况</el-tab-pane>
				    <el-tab-pane label="现场情况" name="fourth">现场情况</el-tab-pane>
				    <el-tab-pane label="其他情况" name="other">其他情况</el-tab-pane>
			  	</el-tabs>
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
            	activeName: 'first'
            }
        },
        methods: {
        },
		mounted() {
			var obj = this.$route.query;
			this.$http.post('/event/initFillPage/'+obj.id).then(res=>{
//      		if(res.code == 10000){
//      			this.dataList = res.data;
//      		}else{
//      			this.$message.error(res.msg);
//      		}
        	});
			
		}
	}
</script>

<style scoped>
	#eventFill-page .body{
		position: relative;
	}
	#eventFill-page .btn-box{
		position: absolute;
		right: 20px;
		top: 15px;
	}
</style>