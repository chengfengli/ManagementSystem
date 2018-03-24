<template>
	<div id="empList">
		<div class="emp">
			<table cellspacing="0">
				<tr>
					<td class="form-title">姓名</td>
					<td><el-input v-model="emp.USERNAME" size="mini"></el-input></td>
					<td class="form-title">部门</td>
					<td><el-input v-model="emp.DEPT" size="mini"></el-input></td>
					<td class="form-title">角色</td>
					<td><el-input v-model="emp.ROLE" size="mini"></el-input></td>
					<td class="form-title">职务</td>
					<td><el-input v-model="emp.JOB" size="mini"></el-input></td>
					<td style="width: 170px;">
						<el-button @click="selectPoseson(1)" type="primary" size="mini">查询</el-button>
						<el-button type="success" @click="exportEmp()" size="mini">导出</el-button>
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
	        <el-pagination @size-change="changeEmp" @current-change="currentChangeEmp" :current-page="emp.page"
	        	:page-sizes="[10,20,30,50]" :page-size="emp.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="emp.total"></el-pagination>
		</div>
		<!--员工编辑-->
		<el-dialog title="员工编辑" :visible.sync="editPersonDialog" width="30%" :close-on-click-modal="false" :show-close="false">
		  <edit-person v-if="editPersonDialog" @refreshEmp="selectPoseson()" @closePersonDialog="editPersonDialog=false" :empId="id"></edit-person>
		</el-dialog>
	</div>
</template>

<script>
	import editPerson from '../person/editPerson.vue';
	export default {
		components:{
			editPerson,
       	},
       	data:function(){
       		return {
       			id: '',
       			emp: {
            		USERNAME: '',
            		DEPT: '',
            		ROLE: '',
            		JOB: '',
            		total:0,
            		page:1,
            		pageSize:10
            	},
            	dataPerson: [],
            	editPersonDialog: false,
       		}
       	},
       	methods: {
       		eidtPerson(id){
        		this.id=id;
        		this.editPersonDialog=true;
        	},
        	selectPoseson(page){ // 人员查询
        		if(page){
        			this.emp.page = page;
        		}
        		this.$http.post('/user/userList',this.emp).then(res=>{
        			if(res.code == 10000){
        				this.emp.total = res.data.totalSize;
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
        	exportEmp(){// 人员导出
				var params = {
					USERNAME: this.emp.USERNAME,
					DEPT: this.emp.DEPT,
					ROLE: this.emp.ROLE,
					JOB: this.emp.JOB
				}
				this.$http({
				    method: 'post',
				    url: '/user/export',
				    data: params,
				}).then(res=>{
					if(res.code==10000){
						location.href = res.data.downPath;
					}else{
						this.$message.error(res.msg);
					}
        		}).catch(err =>{
					console.log(err)
				})
        	},
        	changeEmp(pageSize) { // 每页数量发生改变——员工
        		this.emp.pageSize = pageSize;
        		this.selectPoseson();
        	},
        	currentChangeEmp(currentPage) {// 每页页码发生改变——员工
        		this.emp.page = currentPage;
        		this.selectPoseson();
        	},
       	},
       	mounted() {
        	this.selectPoseson();
        }
   }
</script>

<style scoped="scoped">
	#empList .emp table{
		width: 100%;
		margin-bottom: 20px;
	}
	#empList .emp table td{
		text-align: right;
		padding: 0 2px;
	}
	#empList .emp table td .el-select{
		width: 100%;
	}
</style>