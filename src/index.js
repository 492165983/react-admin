/**
 * 
 * 入口文件    每个项目的一个必备 入口  需引入  App  以及store   
 * provider 给子组件传递数据
 */
import React from 'react';
import ReactDOM from 'react-dom';



import {Provider} from 'react-redux';
import App from './App';

import store from './redux/store';
import './index.less';



ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
,
document.getElementById('root'));

