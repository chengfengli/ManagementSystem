<template>
	<div id="deptList">
		<div class="emp">
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
						<el-button @click="selectDept(1)" type="primary" size="mini">查询</el-button>
					</td>
				</tr>
			</table>
		</div>
		<div style="border: 1px solid #ebeef5;">
			<el-button size="mini" type="text" @click="editDept('')"><i class="el-icon-circle-plus-outline"></i>新增</el-button>
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
	        <el-pagination  v-if="dep.total!=0" @size-change="changeDept" @current-change="currentChangeDept" :current-page="dep.page"
	        	:page-sizes="[10,20,30,50]" :page-size="dep.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="dep.total"></el-pagination>
		</div>
		<!--部门编辑-->
		<el-dialog title="部门编辑" :visible.sync="editDeptDialog" width="30%" :close-on-click-modal="false" :show-close="false">
		  <edit-dept v-if="editDeptDialog" @refreshDept="selectDept"  @closeDeptDialog="editDeptDialog=false" :deptId="id"></edit-dept>
		</el-dialog>
	</div>
</template>

<script>
	import editDept from '../person/editDept.vue';
	export default {
		components:{
			editDept,
       	},
        data: function(){
            return {
            	id:'',
            	dep: {
            		DEPTNAME: '',
            		ISBUSINESS:null,
            		BELONG: '',
            		total:0,
            		page:1,
            		pageSize: 10
            	},
            	dataDept: [],
            	editDeptDialog: false,
            }
        },
        methods: {
        	selectDept(page) { // 部门查询
        		if(page){
        			this.dep.page = page;
        		}
        		this.$http.post('/dept/listDept',this.dep).then(res=>{
        			if(res.code == 10000){
        				this.dep.total = res.data.totalSize;
        				this.dataDept = res.data.rows;
        			}else{
        				this.$message.error(res.msg);
        				this.dataDept = [];
        			}
        		})
        	},
        	delDept(id){ // 删除部门
        		this.$confirm('确定删除该数据吗?', '温馨提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning',
		          	showClose: false,
		          	center: true
		        }).then(() => {
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
		        }).catch(res=>{});
        	},
        	editDept(deptId) {
        		this.id=deptId;
        		this.editDeptDialog=true;
        	},
        	changeDept(pageSize) {
        		this.dep.pageSize = pageSize;
        		this.selectDept();
        	},
        	currentChangeDept(currentPage) {
        		this.dep.page = currentPage;
        		this.selectDept();
        	}
        },
        mounted() {
        	this.selectDept();
        }
    }
</script>

<style>
	#deptList .emp table{
		width: 100%;
		margin-bottom: 20px;
	}
	#deptList .emp table td{
		text-align: right;
		padding: 0 2px;
	}
	#deptList .emp table td .el-select{
		width: 100%;
	}
</style>