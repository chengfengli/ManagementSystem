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
									<td><el-input v-model="condition.USERNAME" size="mini"></el-input></td>
									<td class="form-title">部门</td>
									<td><el-input v-model="condition.DEPT" size="mini"></el-input></td>
									<td class="form-title">角色</td>
									<td><el-input v-model="condition.ROLE" size="mini"></el-input></td>
									<td class="form-title">职务</td>
									<td><el-input v-model="condition.JOB" size="mini"></el-input></td>
									<td style="width: 170px;">
										<el-button @click="selectPoseson(1,10)" type="primary" size="mini">查询</el-button>
  										<el-button type="success" size="mini">导出</el-button>
  										<!-- @click="exportEmp()"-->
									</td>
								</tr>
							</table>
						</div>
						<div style="border: 1px solid #ebeef5;">
							<el-button @click="eidtPerson('')" type="text" size="mini"><i class="el-icon-circle-plus-outline"></i>新增</el-button>
							<el-table :data="dataPerson" stripe border style="width: auto;" ref="multipleTable">
					            <el-table-column type="index" align="center"></el-table-column>
					            <el-table-column prop="USERNAME" label="姓名" align="center"></el-table-column>
					            <el-table-column prop="ROLENAME" label="角色" align="center"></el-table-column>
					            <el-table-column prop="JOB" label="职务" align="center"></el-table-column>
					            <el-table-column prop="EMAIL" label="邮箱" align="center"></el-table-column>
					            <el-table-column prop="PHONE" label="电话" align="center"></el-table-column>
					            <el-table-column prop="enable" label="启动" align="center">
					            	<template scope="scope">
					            		<span v-if="scope.row.ISUSED == 1">是</span>
					            		<span v-else>否</span>
					                </template>
					            </el-table-column>
					            <el-table-column prop="gag" label="禁言" align="center">
					            	<template scope="scope">
					            		<span v-if="scope.row.ISGAG == 1">是</span>
					            		<span v-else>否</span>
					                </template>
					            </el-table-column>
					            <el-table-column label="操作" align="center">
					                <template scope="scope">
					                    <el-button size="mini" @click="eidtPerson(scope.row.USERID)"><i class="el-icon-edit"></i>编辑</el-button>
					                    <el-button size="mini" type="danger" @click="delPerson(scope.row.USERID)"><i class="el-icon-delete"></i>删除</el-button>
					                </template>
					            </el-table-column>
					        </el-table>
					        <page @change="pagechangeEmp" :total="emp.total"></page>
						</div>
					</el-col>
					<!--部门管理-->
					<el-col v-if="index==2" :offset="1" :span="21">
						<div class="condition">
							<table cellspacing="0">
								<tr>
									<td class="form-title">名称</td>
									<td><el-input v-model="dep.DEPTNAME" size="mini"></el-input></td>
									<td class="form-title">业务科室</td>
									<td>
										<el-select v-model="dep.ISBUSINESS" size="mini" placeholder="请选择">
										    <el-option label="是" value="1"></el-option>
										    <el-option label="否" value="0"></el-option>
										</el-select>
									</td>
									<td class="form-title">归属科室</td>
									<td><el-input v-model="dep.BELONG" size="mini"></el-input></td>
									<td style="width: 170px;">
										<el-button @click="selectDept(1,10)" type="primary" size="mini">查询</el-button>
									</td>
								</tr>
							</table>
						</div>
						<div style="border: 1px solid #ebeef5;">
							<el-button size="mini" type="text" @click="obj={};editDeptDialog=true;"><i class="el-icon-circle-plus-outline"></i>新增</el-button>
							<el-table :data="dataDept" stripe border style="width: auto;" ref="multipleTable">
					            <el-table-column type="index" align="center"></el-table-column>
					            <el-table-column prop="DEPTNAME" label="名称" align="center"></el-table-column>
					            <el-table-column prop="ISBUSINESS" label="业务科室" align="center">
					            	<template scope="scope">
					            		<span v-if="scope.row.ISBUSINESS == 1">是</span>
					            		<span v-else>否</span>
					                </template>
					            </el-table-column>
					            <el-table-column prop="BELONG" label="归属科室" align="center"></el-table-column>
					            <el-table-column prop="EMAIL" label="邮箱" align="center"></el-table-column>
					            <el-table-column prop="CONTACTPHONE" label="电话" align="center"></el-table-column>
					            <el-table-column label="操作" align="center">
					                <template scope="scope">
					                    <el-button size="mini" @click="editDept(scope.row.DEPTID)"><i class="el-icon-edit"></i>编辑</el-button>
					                    <el-button size="mini" type="danger" @click="delDept(scope.row.DEPTID)"><i class="el-icon-delete"></i>删除</el-button>
					                </template>
					            </el-table-column>
					        </el-table>
							<page @change="pagechange" :total="deptPager.total"></page>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		
		<!--员工编辑-->
		<el-dialog title="员工编辑" :visible.sync="editPersonDialog" width="30%" :close-on-click-modal="false" :show-close="false">
		  <edit-person v-if="editPersonDialog" @refreshEmp="selectPoseson()" @closePersonDialog="editPersonDialog=false" :empId="id"></edit-person>
		</el-dialog>
		<!--部门编辑-->
		<el-dialog title="部门编辑" :visible.sync="editDeptDialog" width="30%" :close-on-click-modal="false" :show-close="false">
		  <edit-dept v-if="editDeptDialog" @refreshDept="selectDept"  @closeDeptDialog="editDeptDialog=false" :deptId="id"></edit-dept>
		</el-dialog>
	</div>
</template>

<script>
	import elHead from '../../common/Header.vue';
	import editPerson from '../person/editPerson.vue';
	import editDept from '../person/editDept.vue';
	import Page from '../../common/Page.vue';
	export default {
		components:{
			elHead,
			editPerson,
			editDept,
			Page
       	},
        data: function(){
            return {
            	index: 1,
            	id:'',
            	condition: {
            		USERNAME: '',
            		DEPT: '',
            		ROLE: '',
            		JOB: '',
            	},
            	dep: {
            		DEPTNAME: '',
            		ISBUSINESS:'1',
            		BELONG: '',
            		page:1,
            		pageSize:10
            	},
            	dataPerson: [],
            	dataDept: [],
            	editPersonDialog: false,
            	editDeptDialog: false,
            	deptPager: {
            		total:0,
            		page:1,
            		pageSize:10
            	},
            	emp:{
            		total:0,
            		page:1,
            		pageSize:10
            	}
            }
        },
        methods: {
        	selectPoseson(page,pageSize){ // 人员查询
        		if(page){
        			this.condition.page = page;
        		}else{
        			this.condition.page = this.deptPager.page;
        		}
        		if(pageSize){
        			this.condition.pageSize = pageSize;
        		}else{
        			this.condition.pageSize = this.deptPager.pageSize;
        		}
        		this.$http.post('/user/userList',this.condition).then(res=>{
        			if(res.code == 10000){
        				this.emp.total = res.data.totalSize;
        				this.dataPerson = res.data.rows;
        			}else{
        				this.$message.error(res.msg);
        				this.dataPerson = [];
        			}
        		})
        	},
        	pagechangeEmp(page,pageSize){
        		this.selectPoseson(1,pageSize);
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
        	eidtPerson(id) {
        		this.id=id;
        		this.editPersonDialog=true;
        	},
        	exportEmp(){
//      		location.href = this.$hostUrl+'/user/export?USERNAME='+this.condition.USERNAME;
				this.$http({
				    method: 'post',
				    url: '/user/export',
				    data: {},
				    responseType: 'blob'
				}).then(res=>{
					console.log(res)
        		}).catch(err =>{
					console.log(err)
				})
        	},
        	selectDept(page,pageSize) { // 部门查询
        		if(page){
        			this.dep.page = page;
        		}else{
        			this.dep.page = this.deptPager.page;
        		}
        		if(pageSize){
        			this.dep.pageSize = pageSize;
        		}else{
        			this.dep.pageSize = this.deptPager.pageSize;
        		}
        		this.$http.post('/dept/listDept',this.dep).then(res=>{
        			if(res.code == 10000){
        				this.deptPager.total = res.data.totalSize;
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
        	editDept(deptId) {
        		this.id=deptId;
        		this.editDeptDialog=true;
        	},
        	loadData(index) {
		        this.index = index;
		    },
		    pagechange(page,pageSize) {
		    	this.selectDept(1,pageSize);
		    }
        },
        mounted() {
        	this.selectPoseson(this.deptPager.page,this.deptPager.pageSize);
        	this.selectDept(this.deptPager.page,this.deptPager.pageSize);
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