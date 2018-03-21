<template>
	<div id="personManage">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="personManage-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>人员管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="data-box">
				<el-row class="tac">
					<el-col :span="2">
					    <el-menu default-active="1"  class="el-menu-vertical-demo">
						    <el-menu-item index="1" @click="loadData(1)">人员管理</el-menu-item>
						    <el-menu-item index="2" @click="loadData(2)">部门管理</el-menu-item>
					    </el-menu>
					</el-col>
					<!--人员管理-->
					<el-col v-show="index==1" :offset="1" :span="21">
						<emp-list></emp-list>
					</el-col>
					<!--部门管理-->
					<el-col v-show="index==2" :offset="1" :span="21">
						<dept-list></dept-list>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import elHead from '../../common/Header.vue';
	import empList from '../person/empList.vue';
	import deptList from '../person/deptList.vue';
	export default {
		components:{
			elHead,
			empList,
			deptList,
       	},
        data: function(){
            return {
            	index: 1
            }
        },
        methods: {
        	loadData(index) {
		        this.index = index;
		    }
        },
        mounted() {
        }
    }
</script>

<style scoped>
	#personManage{
		min-width: 1366px;
	}
	#personManage .data-box{
		margin: 0 20px;
	}
	#personManage .data-box .el-tag{
	    background-color: #00d1b2;
	    cursor: pointer;
	    margin-right: 15px;
	}
	#personManage .data-box .el-menu{
		border-radius: 10px;
    	overflow: hidden;
	}
	#personManage .data-box .el-menu-item{
		text-align: center;
	}
	#personManage .data-box .el-col-2{
		min-width: 100px;
	}
	#personManage .el-menu{
		background-color: transparent;
		border: 0;
	}
	#personManage .el-menu-item{
		margin-bottom: 0;
		background-color: rgb(238, 246, 246);
	}
	#personManage .is-active{
		background-color: #00d1b2;
		color: #fff;
	}
	#personManage .el-menu-item:hover{
		background-color: #55DBC9;
		color: #fff;
	}
	
</style>