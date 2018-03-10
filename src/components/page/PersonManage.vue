<template>
	<div id="personManage">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="personManage-body">
			<div class="current">当前位置：<a href="#/index">首页</a> > 公告</div>
			<div class="data-box">
				<el-row class="tac">
					<el-col :span="2">
					    <el-menu default-active="1"  class="el-menu-vertical-demo">
						    <el-menu-item index="1" @click="loadData(1)">人员管理</el-menu-item>
						    <el-menu-item index="2" @click="loadData(2)">部门管理</el-menu-item>
					    </el-menu>
					</el-col>
					<el-col :span="22">
						<div class="condition">
							<table cellspacing="0">
								<tr>
									<td class="form-title">姓名</td>
									<td><el-input></el-input></td>
									<td class="form-title">部门</td>
									<td><el-input></el-input></td>
									<td class="form-title">角色</td>
									<td><el-input></el-input></td>
									<td class="form-title">职务</td>
									<td><el-input></el-input></td>
									<td style="width: 170px;">
										<el-button>查询</el-button>
  										<el-button type="primary">导出</el-button>
									</td>
								</tr>
							</table>
						</div>
						<el-table :data="data" border style="width: 100%;margin-top: 20px;" ref="multipleTable" @selection-all="handleSelectionChange" @selection-change="handleSelectionChange">
				            <el-table-column type="selection" width="55"></el-table-column>
				            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
				            <el-table-column prop="role" label="角色" width="100"></el-table-column>
				            <el-table-column prop="post" label="职务" width="150"></el-table-column>
				            <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
				            <el-table-column prop="phone" label="电话" width="160"></el-table-column>
				            <el-table-column prop="enable" label="启动" width="70">
				            	<template scope="scope">
				            		<span v-if="scope.row.enable == 1">是</span>
				            		<span v-else>否</span>
				                </template>
				            </el-table-column>
				            <el-table-column prop="gag" label="禁言" width="70">
				            	<template scope="scope">
				            		<span v-if="scope.row.enable == 1">是</span>
				            		<span v-else>否</span>
				                </template>
				            </el-table-column>
				            <el-table-column label="操作" width="250">
				                <template scope="scope">
				                    <el-button size="small"@click="edit(scope.$index, scope.row)">编辑</el-button>
				                    <el-button size="small" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
				                    <el-button size="small" type="primary" @click="add(scope.$index, scope.row)">新增</el-button>
				                </template>
				            </el-table-column>
				        </el-table>
						<el-pagination :current-page="currentPage" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>
					</el-col>
				</el-row>
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
            	newNoticeList:[],
            	currentPage: 1,
            	data: [
            		{name: '王小虎',role: '管理员',post: '信息科长',email: '12412341@qq.com',phone: '13588888888',enable: 1,gag: 1},
            		{name: '王小虎',role: '管理员',post: '信息科长',email: '12412341@qq.com',phone: '13588888888',enable: 1,gag: 1},
            		{name: '王小虎',role: '管理员',post: '信息科长',email: '12412341@qq.com',phone: '13588888888',enable: 1,gag: 1}
            	]
            }
        },
        methods: {
        	loadData(type) {
		        alert(type);
		    },
		    currengChange(currentPage) {// 翻页
        		alert(currentPage)
	        },
	        handleSelectionChange(val) {// 返回已选择的数据 数组
            	console.log(val)
           	},
           	edit(index,row) {
           		console.log(row)
           	},
           	del(index,row) {
           		console.log(row)
           	},
           	add(index,row) {
           		console.log(row)
           	}
        },
        mounted() {
        	for(var i=1;i<11;i++){
        		this.newNoticeList.push({id:i,time: "2018/10/10",title: '本周开会的通知',sender:"系统管理员",clickCount: 20})
        	}
        }
    }
</script>

<style scoped>
	#personManage .data-box{
		margin: 0 20px;
	}
	#personManage .data-box .el-tag{
	    background-color: #00d1b2;
	    cursor: pointer;
	    margin-right: 15px;
	}
	
	#personManage .data-box .el-menu-item{
		text-align: center;
	}
	#personManage .data-box .el-col-2{
		min-width: 100px;
	}
	#personManage .data-box table{
		width: 100%;
	}
	#personManage .data-box table tr{
		cursor: pointer;
	}
	#personManage .data-box table tr:nth-child(odd){
		background-color: #FAFAFA;
	}
	#personManage .data-box table tr:hover{
		background-color: #F5F7FA;
	}
	#personManage .data-box table td{
		padding: 5px 10px;
		font-size: 14px;
	}
	#personManage .data-box table td:nth-child(1),#personManage .data-box table td:nth-child(3){
		width: 100px;
	}
	#personManage .data-box table td:nth-child(3){
		font-size: 12px;	
	}
	
	#personManage .data-box .condition .form-title{
		text-align: right;
		width: 40px;
		padding: 5px 0;
	}
	
</style>