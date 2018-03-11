import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import { Loading,Message } from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
//import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/public.css';
import "babel-polyfill";
let loadingInstance;
Vue.use(ElementUI);
axios.defaults.baseURL = httpConfig.hostURL;
axios.defaults.withCredentials=true;
//axios.defaults.headers.sessionId = '2ED26A180C309E2C55A54609F5F4FF26';

axios.interceptors.request.use(config => {
	loadingInstance = Loading.service();
	return config;
})
axios.interceptors.response.use(res => {
	loadingInstance.close();
	if(res.data.code == 10008){
		location.href = '#/login'
		return null;
	}else{
		return res.data;	
	}
},err => {
	loadingInstance.close();
//	if(err.response){
//		var status = err.response.status;
//		Message.error({message:httpConfig[status],type:'error'});
//	}else{
//		Message.error({message:'其它异常',type:'error'});
//	}
	
	return Promise.reject(err);
})
Vue.prototype.$http = axios;
Vue.prototype.$httpHeader = axios.defaults.headers;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');