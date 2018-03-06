import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import { Loading,Message } from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
let loadingInstance;
Vue.use(ElementUI);
axios.defaults.baseURL = httpConfig.hostURL;
axios.interceptors.request.use(config => {
	loadingInstance = Loading.service();
	return config;
})
axios.interceptors.response.use(res => {
	loadingInstance.close();
	return res;
},err => {
	loadingInstance.close();
	Message.error({message:'系统异常',type:'error'});
	return Promise.reject(err);
})
Vue.prototype.$http = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');