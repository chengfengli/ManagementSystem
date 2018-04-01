<template>
	<div id="eventFillIndex-page">
		<div id="heade">
			<el-head></el-head>
		</div>
		<div class="eventFillIndex-body">
			<div class="current">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'index' }">首页</el-breadcrumb-item>
				  	<el-breadcrumb-item>事件填报</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="data-box body">
				<table cellspacing="0" @mouseleave="name=-1">
					<tr v-for="item in dataList" :keys="item.ID" @mouseover="name=item.ID">
						<td class="title"><a @click="details(item.ID)" href="javascript:void(0)">{{item.NAME}}</a></td>
						<td class="remakes">
							<div v-if="name==item.ID"><a class="child" v-for="child in item.CHILDS" :keys="child.ID" href="javascript:void(0)" @click="details(child.ID)">{{child.NAME}}</a></div>
							<span v-else>{{item.MARK}}</span>
						</td>
					</tr>
				</table>
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
            	dataList: [],
            	name:0,
            }
        },
        methods: {
        	details(id) {
        		this.$router.push({
        			path: 'eventFill',
        			name: 'eventFill',
        			query:{ 
		                id: id
		            }
        		});
        	}
        },
		mounted() {
			this.$http.post('/event/fillTypes').then(res=>{
        		if(res.code == 10000){
        			this.dataList = res.data;
        		}else{
        			this.$message.error(res.msg);
        		}
        	});
		}
	}
</script>

<style scoped>
	#eventFillIndex-page .child{
		margin-right: 20px;
	}
	#eventFillIndex-page .child:hover{
		text-decoration: underline;
	}
</style>