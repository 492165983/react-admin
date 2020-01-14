/** 
 * 
 * 封装函数（请求功能）
 */

 import axiosInstance  from './request';

 export const reqLogin =(username,password)=>{
    return axiosInstance({
      url:'/login',
      method:'POST',
      data:{
        username,
        password
      }
    });
 };