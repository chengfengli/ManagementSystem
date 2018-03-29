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
				<ul id="ancho-box">
					<li><a href="#1">医疗事件</a></li>
					<li><a href="#2">事件情况描述</a></li>
					<li><a href="#3">一般情况</a></li>
					<li><a href="#3">现场情况</a></li>
				</ul>
				<div id="form-box">
					<el-collapse v-model="activeNames">
						<a name="1"></a>
					  	<el-collapse-item title="一致性 Consistency" name="1">
					    	<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
					    	<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="一致性 Consistency" name="2">
					    	<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
					    	<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<!--<div class="btn-box">
					<el-button id="temporary-btn" type="primary" size="mini">暂存</el-button>
					<el-button id="submit-btn" type="primary" size="mini">提交</el-button>
				</div>-->
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
            	activeName: 'first',
            	activeNames: ['1']
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
	#ancho-box{
		list-style: none;
		position: fixed;
		top: 100px;
	}
	#ancho-box a{
		font-size: 14px;
		padding: 10px 5px;
		display: block;
		border: 1px solid red;
	}
	#form-box{
		margin-left: 200px;
		border: 1px solid;
		margin-top: 20px;
	}
	#eventFill-page .btn-box{
		position: absolute;
		right: 20px;
		top: 15px;
	}
</style>