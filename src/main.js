import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import { Loading,Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/public.css'
Vue.use(ElementUI)
let loadingInstance;
Vue.config.productionTip = false

axios.defaults.baseURL = httpConfig.hostURL;
axios.defaults.withCredentials=true;
axios.interceptors.request.use(config => {
	loadingInstance = Loading.service({
		background: 'rgba(0,0,0,0.3)'
	});
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
Vue.prototype.$hostUrl = httpConfig.hostURL;
Vue.prototype.$http = axios;
Vue.prototype.$httpHeader = axios.defaults.headers;
Vue.prototype.$load = Loading;
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
