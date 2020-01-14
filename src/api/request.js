/**
 * 封装 axios 的模块
 */

import axios from 'axios';
import errCode from '../config/error-code';

//创建 axios 实例

const axiosInstance = axios.create({
  timeout:20000,
  baseUrl:'/api',
  headers:{

  }
});

//请求拦截器

axiosInstance.interceptors.request.use(config=>{
  let token = '';
  if (token) {
    config.headers.authorization =`bearer ${token}`;

  }

  if (config.method==='post'){
    config.data = Object .keys(config.data)
    .reduce((p,c)=>{
      p+=`&${c}=${config.data[c]}`;
      return p;
    },'')
    .slice(1);
    config.headers['content-type']= 'application/x-www-form-urlencoded';

  }
  return config;
});

//响应拦截器
axiosInstance.interceptors.request.use(
  response=>{
    if (response.data.status===0){
      return response.data.data;
    }else{
      return Promise.reject(response.data.msg);
    }
  },
  err=>{
    /**
     * 根据不同的错误原因，返回不停的错误
     */
    let errMsg='';

    if(err.response){
      errMsg=errCode[err.response.status];
    }else{
      if (err.message.indexOf('Network Error') !== -1) {
        errMsg = '网络连接失败，请重新连接网络试试';
      } else if (err.message.indexOf('timeout') !== -1) {
        errMsg = '网络连接超时，请连上wifi试试';
      }
    }
    return Promise.reject(errMsg || '请不要联系别人，自己解决吧')
  }

);
export default axiosInstance;
