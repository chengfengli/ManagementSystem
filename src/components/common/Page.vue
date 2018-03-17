<template>
	<div class="pageComponet">
		<table>
			<tr>
				<td>第</td>
				<td class="page"><el-input v-model="page" @keyup.enter.native="go(page)" size="mini"></el-input></td>
				<td>页</td>
				<td class="last"><el-button @click="prev" :disabled="isPrev" type="primary" size="mini">上一页</el-button></td>
				<td class="next"><el-button @click="next" :disabled="isNext" type="primary" size="mini">下一页</el-button></td>
				<td class="limit">
					<el-select @change="changePageSize" v-model="pageSize" size="mini">
					    <el-option v-for="item in limits" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</td>
				<td>共</td>
				<td class="total">{{total}}</td>
				<td>条记录</td>
				<td class="pages">{{pages}}</td>
				<td>页</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'Page',
		props: {
			page: {// 当前页码
				type :Number,
            	default : 1
			},
			total: {
				type :Number, //总记录数
            	default : 0
			},
			limits: {
				type: Array,
				default:[10,20,30,50], //每页数量
			}
		},
		data: function(){
            return {
            	isPrev: false,// 是否有上一页
            	isNext: false,// 是否有下一页
				pageSize: 10
            }
        },
        methods: {
        	prev(){ //上一页
	            if (this.page > 1) {
	                this.go(this.page - 1)
	            }
	        },
	        next(){ // 下一页
	            if (this.page < this.pages) {
	                this.go(this.page + 1)
	            }
	        },
	        go(page) {
	        	page = parseInt(page);
	        	if(page>this.pages){
	        		this.$message.error('请输入有效的页码值');
	        		return;
	        	}
	        	this.page = page;
	        	if(page==1){
	        		this.isPrev = true
	        	}else{
	        		this.isPrev = false
	        	}
	        	if(page==this.pages){
	        		this.isNext = true
	        	}else{
	        		this.isNext = false
	        	}
	            this.$emit('change', page,this.pageSize)
	        },
	        changePageSize(pageSize){
	        	this.pageSize = pageSize;
	        	this.go(1);
	        }
        },
		mounted() {
			if(this.page==1){
        		this.isPrev = true
        	}else{
        		this.isPrev = false
        	}
        	if(this.page==this.pages){
        		this.isNext = true
        	}else{
        		this.isNext = false
        	}
        	this.pageSize = this.limits[0];
		},
		computed: {
			pages(){
				if(Math.ceil(this.total/this.pageSize)!=0){
					return Math.ceil(this.total/this.pageSize);
				}else{
					return 1;
				}
	       	}
		}
	}
</script>

<style scoped>
	.pageComponet{ display: inline-block;}
	.pageComponet .page{
		width: 40px;
	}
	.pageComponet .limit{
		width: 60px;
	}
	.pageComponet .total,.pageComponet .pages{
		color:#F56C6C;
		padding: 0 3px;
		font-weight: bold;
	}
</style>