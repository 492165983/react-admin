

/**
 * 
 * 用来根据prevState 和action 生成 newState 函数模块
 */

 import {combineReducers} from 'redux';

 function aa(prevState=1 ,action){
    switch (action.type){
      default:
        return prevState
    }
 }

 export default combineReducers({
   aa
 });