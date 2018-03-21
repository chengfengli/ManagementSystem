<template>
	<div id="eventCenter">
		<el-row>
		  	<el-col :span="2">
		  		<ul>
		  			<li>申明内容：</li>
		  			<li>总事件：</li>
		  			<li>l级事件：</li>
		  			<li>ll级事件：</li>
		  			<li>ll级事件：</li>
		  			<li>lll级事件：</li>
		  			<li>lV级事件：</li>
		  			<li>个人建议：</li>
		  			<li>点赞：</li>
		  		</ul>
		  	</el-col>
		  	<el-col :offset="1" :span="21">
		  		<el-form :model="form" label-width="80px">
		  			<el-form-item label="事件类型" size="mini">
					    <el-select v-model="form.type" placeholder="">
					      	<el-option label="区域一" value="shanghai"></el-option>
					      	<el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="当事科室" size="mini">
					    <el-select v-model="form.region">
					      	<el-option label="区域一" value="shanghai"></el-option>
					      	<el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="事件等级" size="mini">
					    <el-select v-model="form" multiple size="mini">
						    <el-option label="区域一" value="shanghai"></el-option>
					      	<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
		  		</el-form>
		  		<div style="margin-top: 20px">
				    <el-radio-group @change="orderbyGet" v-model="orderby" size="mini">
				      	<el-radio-button label="tiem">发布时间</el-radio-button>
				      	<el-radio-button label="2">点赞数</el-radio-button>
				      	<el-radio-button label="3">评论数</el-radio-button>
				    </el-radio-group>
			  	</div>
		  	</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data: function(){
            return {
            	form: {
            		
            	},
            	orderby:'2'
            }
        },
        methods: {
        	orderbyGet(value) {
        		alert(value)
        	}
        },
		mounted() {
		}
	}
</script>

<style>
</style>