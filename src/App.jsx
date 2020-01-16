import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {IntlProvider} from 'react-intl';

import  { connect} from 'react-redux';    //引入高阶组件 connect

import Home from './components/home';
import Login from './containers/Login';

import BasicLayout from './components/basic-layout';
import{en,zhCN} from './locales';

@connect(
  state=>({ language:state.language}),null)  //这里只需要使用，不需要更新
 class App extends Component { 
  render() {

    const language=this.props.language;
    const messages = language ==='en' ? en : zhCN;
    return (
      <IntlProvider
       locale={language}   //选择语言
       messages={ messages}  //选择语言包
      >  
        <Router>
          <Switch>
            <Route path='/login' exact component={Login}/>
            <BasicLayout>
              <Route path='/' exact component={Home}/>
            </BasicLayout>
          </Switch>
        </Router>
      </IntlProvider>
     
    )
  }
}
export default App;