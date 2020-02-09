/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 * 目的是为了方便 存储 和reducers复用会储存到  actions-types 中
 */

import {
  reqLogin,
  reqGetCategoryList,
  reqAddCategory,
  reqUpdateCategory,
  reqDeleteCategory,
  reqGetRoleList,
  reqAddRole
   } from '../api';


import { setItem } from '../utils/storage';
import { 
  SAVE_USER,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ROLE_LIST,
  ADD_ROLE
   } from './action-types';

export const changeLanguage =lang =>({type:CHANGE_LANGUAGE,data:lang})

const saveUser = user => ({ type: SAVE_USER, data: user });

export const removeUser = () => ({ type: REMOVE_USER });

export const saveUserAsync = (username, password) => {
  return dispatch => {
    // 当前函数返回值，作为将来组件调用时的返回值
    // 异步操作
    return reqLogin(username, password).then(response => {
      // 登录成功
      /*
          存储用户数据和token

          存在redux中（内存存储，一旦刷新就没了）
          还需要持久化存储：localStorage
            因为频繁操作 localStorage 性能不好，如果存储在redux，性能更好

          存储：localStorage 和 redux
          读取：先从 localStorage 中读取，存在 redux 中，后面通过 redux 读取使用
        */
      setItem('user', response);
      // 触发更新
      dispatch(saveUser(response));
    });
  };
};

//同步action
const getCategoryList = categories => ({
  type:GET_CATEGORY_LIST,
  data:categories
});
//异步action
export const getCategoryListAsync = () => {
  return dispatch => {
     // 发送请求
    // 不加return，getCategoryListAsync方法就没有返回值
    // 加上return，getCategoryListAsync方法就是return的返回值
    // 请求成功，最终返回值是成功的promise
    // 请求失败，最终返回值是失败的promise
    return reqGetCategoryList().then (response => {
      //此时调用dispath   触发更新
      dispatch(getCategoryList(response));
    });
  };
};

//同步action
const addCategory = category => ({
  type:ADD_CATEGORY,
  data:category
});
//异步action
export const addCategoryAsync = categoryName => {
  return dispatch => {
     //发送请求
    return reqAddCategory(categoryName).then(response => {
       //此时也是调用dispath,  触发更新
       dispatch(addCategory(response));
    });
  }; 
};



//同步action 
const updateCategory = category => ({
  type:UPDATE_CATEGORY,
  data:category
})

//异步action
export const updateCategoryAsync = (categoryId,categoryName) => {
  return dispatch => {
    //发送给请求
    return reqUpdateCategory(categoryId,categoryName).then(response => {
      //此时也是调用dispath,  触发更新
      dispatch(updateCategory(response));
    });
  };
};



const deleteCategory = id => ({
  type:DELETE_CATEGORY,
  data:id
})

export const deleteCategoryAsync = categoryId => {
  return dispatch => {
    return reqDeleteCategory(categoryId).then (response => {
      //调用dispath ,,触发更新
      dispatch(deleteCategory(response));
    });
  };
};


const getRoleList = roles => ({
  type:GET_ROLE_LIST,
  data:roles
})

export const getRoleListAsync = () =>{
  return dispatch => {
    return reqGetRoleList( ).then(response => {
      dispatch(getRoleList(response));
    })
  }
};


const addRole = role => ({
  type:ADD_ROLE,
  data:role
})

export const addRoleAsync = (name) => {
  return dispatch => {
    //执行异步操作
    return reqAddRole(name).then(response => {
      //请求成功，更新redux状态
      dispatch(addRole(response));
    }) 
  }
}