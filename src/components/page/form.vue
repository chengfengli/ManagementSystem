<template>
	<div>
		<el-form label-width="80px">
			<el-form-item v-for="item in dataList" :label="item.name">
				<el-radio-group v-model="form['ele_'+item.id]">
				    <el-radio :label="3">备选项</el-radio>
					<el-radio :label="6">备选项</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
	<el-button id="temporary-btn" type="primary" @click="save" size="mini">暂存</el-button>
	<el-button id="submit-btn" type="primary" size="mini">提交</el-button>
	</div>
</template>

<script>
	export default{
		data: function(){
            return {
            	dataList:[],
            	form:{},
            }
        },
        methods: {
        	save(){
        		var form2 = {}
        		form2['ele_1']='';
        		form2['ele_2']='';
        		this.form=form2;
        		this.dataList.push({id:1,name:'adfad',value:''});
        		this.dataList.push({id:2,name:'hjdhd',value:''});
        	}
        },
        mounted() {
        }
	}
</script>

<style>
</style>