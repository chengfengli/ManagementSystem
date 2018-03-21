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
window.Promise = Promise
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
Vue.prototype.$validation = function(val,type){
	if(val != null && val != undefined){
    	val = val.toString();
	}
	var bool = true;
	if(type=='required'){
	    if(val == null || val == undefined || val == '' || val.trim() == ''){
	        bool = true;
	    }else{
	        bool = false;
	    }
	}else if(type=='email'){
		var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    	if(!reg.test(val)){
			bool = false;
		}
	}else if(type=='phone'){
		var reg = new RegExp("^((13[0-9])|(17[3-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9]))\\d{8}$");
    	if(!reg.test(val)){
			bool = false;
		}
	}
	return bool;
	
}
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
