import React from 'react';

import axios from 'axios';
import {message} from 'antd';


export default function Test(){
  //自己配置axios 配置  axios 拦截器

  const axiosInstance =axios.create({
    timeout:20000, //请求超时时间
    baseURL: '/api' , //基础路径
    header:{
      //公共的请求头   且必须写死
    }
  });
  //设置拦截器 
   //请求拦截器（ 在发送之前调用）

    // 添加请求拦截器
    axiosInstance.interceptors.request.use(
      //在发送之前做些什么
      config=>{
        if (token) {
          config.headers.authorization  = `Bearer ${token}`;

        }
        if (config.method === 'post') {
          const keys = Object.keys(config.data);
          const data =keys
            .reduce((prev,curr) =>{
              prev += `&${curr}=${config.data[curr]}`;
              return prev;
            },'')
            .slice(1);
            config.data=data;
            config.headers['content-type'] = 'application/x-www-form-urlencoded';

        }
        return config;
    })

    // 添加响应拦截器
    axiosInstance.interceptors.response.use(
      //请求响应成功 --2XX
      response =>{
        if (response.data.status===0) {
            return response.data.data;
        }else{
          return Promise.reject('response.data.msg');
        }
      },
      //请求响应失败 --4XX  5XX
      
      err =>{
        const errCode={
          401: '没有权限访问当前接口',
          403: '禁止访问当前接口',
          404: '当前资源未找到',
          500: '服务器发生未知错误，请联系管理员'
        };

        let errorMessage='';

        if (err.message.indexOf('Network Error') !== -1){
          errMessage ='网络连接错误，请重试啊';
        }else if(err.message.indexOf('timeout') !== -1){
          errMessage = '网络超时，请链接重试';
        }
      }
      return Promise.reject(errMessage || '请联系程序员解决问题');
      }
    );
    let token ='';
    let id= '';
    
    const handleClick1 = () =>{
      axiosInstance({
        method:POST;
        url:'/login';
        data:{
          username:'admin';
          password:'admin';
        }
      })
      .then(response=>{
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
        message.error(err);
        
      });
    
    };
    
    const handleClick2 =() =>{
      axiosInstance({
        method:'POST';
        url:'/categoly/add',
        data:{
          categolyName:'弟弟'
        }
      })
      .then(response=>{
        if (response.data.status===0) {
          id = response.data.data._id;
          message.success('t添加成功')
        }else{
          message.error(response.data.msg);
        }
      })
      .catch(err=>{
        console.log(err);
        message.error(response.data.msg);
        
      });
    };
    const handleClick3= ()=>{
      axiosInstance({
        method:'POST';
        url :'/category/delete',
        data:{
          categolyId:id
        }
      })
      .then(response=>{
        if (response.data.status===0) {
          message.success('删除成功了')
        }else{
          console.log(err);
          message.error('response.data.msg')；      
        }
      })
      .catch(err=>{
        console.log(err);
        message.error('网络出现错误')
        
      })
    }
    
    return (<div>
       <button onClick={handleClick1}>按钮1</button>
       <button onClick={handleClick2}>按钮2</button>
       <button onClick={handleClick3}>按钮3</button>
    </div>
     
    );
};

