<template>
	<div id="editPerson">
		{{data}}
		<el-button @click="getdata">默认按钮</el-button>
	</div>
</template>

<script>
	export default{
		name: 'editPerson',
		props: {
			'data':Object
		},
		data: function() {
			return {
				
			}
		},
		methods: {
			getdata() {
				this.$emit('closeDeptDialog');
			}
		},
		mounted() {
		}
	}
</script>

<style>
</style>