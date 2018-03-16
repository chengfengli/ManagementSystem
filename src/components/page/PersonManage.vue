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
					<el-col v-if="index==1" :offset="1" :span="21">
						<div class="condition">
							<table cellspacing="0">
								<tr>
									<td class="form-title">姓名</td>
									<td><el-input v-model="condition.USERNAME"></el-input></td>
									<td class="form-title">部门</td>
									<td><el-input v-model="condition.DEPT"></el-input></td>
									<td class="form-title">角色</td>
									<td><el-input v-model="condition.ROLE"></el-input></td>
									<td class="form-title">职务</td>
									<td><el-input v-model="condition.JOB"></el-input></td>
									<td style="width: 170px;">
										<el-button @click="selectPoseson">查询</el-button>
  										<el-button type="primary">导出</el-button>
									</td>
								</tr>
							</table>
						</div>
						<el-table :data="dataPerson" stripe border style="width: 100%;margin-top: 20px;" ref="multipleTable">
				            <el-table-column type="index" width="55"></el-table-column>
				            <el-table-column prop="USERNAME" label="姓名" width="100"></el-table-column>
				            <el-table-column prop="ROLENAME" label="角色" width="100"></el-table-column>
				            <el-table-column prop="JOB" label="职务" width="150"></el-table-column>
				            <el-table-column prop="EMAIL" label="邮箱" width="250"></el-table-column>
				            <el-table-column prop="PHONE" label="电话" width="160"></el-table-column>
				            <el-table-column prop="enable" label="启动" width="70">
				            	<template scope="scope">
				            		<span v-if="scope.row.ISUSED == 1">是</span>
				            		<span v-else>否</span>
				                </template>
				            </el-table-column>
				            <el-table-column prop="gag" label="禁言" width="70">
				            	<template scope="scope">
				            		<span v-if="scope.row.ISGAG == 1">是</span>
				            		<span v-else>否</span>
				                </template>
				            </el-table-column>
				            <el-table-column label="操作" width="200">
				                <template scope="scope">
				                    <el-button size="mini" @click="condition.USERNAME=5;editPersonDialog=true;">编辑</el-button>
				                    <el-button size="mini" type="danger" @click="delPerson(scope.row.USERID)">删除</el-button>
				                    <el-button size="mini" type="primary" @click="add()">新增</el-button>
				                </template>
				            </el-table-column>
				        </el-table>
						<!--<el-pagination :current-page="page" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>-->
					</el-col>
					<!--部门管理-->
					<el-col v-if="index==2" :offset="1" :span="21">
						<div class="condition">
							<table cellspacing="0">
								<tr>
									<td class="form-title">名称</td>
									<td><el-input v-model="dep.DEPTNAME"></el-input></td>
									<td class="form-title">业务科室</td>
									<td>
										<el-select v-model="dep.ISBUSINESS" placeholder="请选择">
										    <el-option label="是" value="1"></el-option>
										    <el-option label="否" value="0"></el-option>
										</el-select>
									</td>
									<td class="form-title">归属科室</td>
									<td><el-input v-model="dep.BELONG"></el-input></td>
									<td style="width: 170px;">
										<el-button>查询</el-button>
  										<el-button type="primary">导出</el-button>
									</td>
								</tr>
							</table>
						</div>
						<el-table :data="dataDept" stripe border style="width: 100%;margin-top: 20px;" ref="multipleTable">
				            <el-table-column type="index" width="55"></el-table-column>
				            <el-table-column prop="DEPTNAME" label="名称" width="100"></el-table-column>
				            <el-table-column prop="ISBUSINESS" label="业务科室" width="150"></el-table-column>
				            <el-table-column prop="BELONG" label="归属科室" width="150"></el-table-column>
				            <el-table-column prop="EMAIL" label="邮箱" width="250"></el-table-column>
				            <el-table-column prop="CONTACTPHONE" label="电话" width="160"></el-table-column>
				            <el-table-column label="操作" width="200">
				                <template scope="scope">
				                    <el-button size="mini" @click="editDept(scope.row)">编辑</el-button>
				                    <el-button size="mini" type="danger" @click="delDept(scope.row.DEPTID)">删除</el-button>
				                    <el-button size="mini" type="primary" @click="obj={};editDeptDialog=true;">新增</el-button>
				                </template>
				            </el-table-column>
				        </el-table>
						<!--<el-pagination :current-page="page" layout="prev, pager, next" :total="1000" @current-change="currengChange"></el-pagination>-->
					</el-col>
				</el-row>
			</div>
		</div>
		
		<!--员工编辑-->
		<el-dialog title="员工编辑" :visible.sync="editPersonDialog" width="30%" :close-on-click-modal="false" :show-close="false">
		  <edit-person @closeEidtPersonDialog="editPersonDialog=false" :data="obj"></edit-person>
		</el-dialog>
		<!--部门编辑-->
		<el-dialog title="部门编辑" :visible.sync="editDeptDialog" width="30%" :close-on-click-modal="false" :show-close="false">
		  <edit-dept @closeDeptDialog="editDeptDialog=false" :data="obj"></edit-dept>
		</el-dialog>
	</div>
</template>

<script>
	import elHead from '../common/Header.vue';
	import editPerson from '../page/editPerson.vue';
	import editDept from '../page/editDept.vue';
	export default {
		components:{
			elHead,
			editPerson,
			editDept
       	},
        data: function(){
            return {
            	index: 1,
            	obj:{},
            	condition: {
            		USERNAME: '2',
            		DEPT: '',
            		ROLE: '',
            		JOB: '',
            	},
            	dep: {
            		DEPTNAME: '',
            		ISBUSINESS:'1',
            		BELONG: '',
            	},
            	page: 1,
            	pageSize: 10,
            	dataPerson: [],
            	dataDept: [],
            	editPersonDialog: false,
            	editDeptDialog: false
            }
        },
        methods: {
        	selectPoseson(){ // 人员查询
        		this.condition.page = this.page;
        		this.condition.pageSize = this.pageSize;
        		this.$http.post('/user/userList',this.condition).then(res=>{
        			if(res.code == 10000){
        				this.dataPerson = res.data.rows;
        			}else{
        				this.$message.error(res.msg);
        				this.dataPerson = [];
        			}
        		})
        	},
        	delPerson(id){ // 删除人员
        		this.$http.post('/user/del/'+id).then(res=>{
        			if(res.code == 10000){
        				this.$message({
				          	message: res.msg,
				          	type: 'success'
				        });
        				this.selectPoseson();
        			}else{
        				this.$message.error(res.msg);
        			}
        		})
        	},
        	selectDept() { // 部门查询
        		this.dep.page = this.page;
        		this.dep.pageSize = this.pageSize;
        		this.$http.post('/dept/listDept',this.condition).then(res=>{
        			if(res.code == 10000){
        				this.dataDept = res.data.rows;
        			}else{
        				this.$message.error(res.msg);
        				this.dataPerson = [];
        			}
        		})
        	},
        	delDept(id){ // 删除部门
        		this.$http.post('/dept/del/'+id).then(res=>{
        			if(res.code == 10000){
        				this.$message({
				          	message: res.msg,
				          	type: 'success'
				        });
        				this.selectDept();
        			}else{
        				this.$message.error(res.msg);
        			}
        		})
        	},
        	editDept(data) {
        		this.obj=data;
        		this.editDeptDialog=true;
        	},
        	loadData(index) {
		        this.index = index;
		    }
        },
        mounted() {
        	this.selectPoseson();
        	this.selectDept();
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
		background-color: #F5F7FA;
	}
	#personManage .data-box table tr:hover{
		background-color: #F0F9EB;
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
		width: 60px;
		padding: 5px 0;
	}
	#personManage .el-menu{
		background-color: transparent;
		border: 0;
	}
	#personManage .el-menu-item{
		margin-bottom: 10px;
		background-color: rgb(238, 246, 246);
	}
	#personManage .is-active,#personManage .el-menu-item:hover{
		background-color: #00d1b2;
		color: #fff;
	}
</style>