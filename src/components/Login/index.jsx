import React, { Component } from 'react';
import {Form ,Button ,Icon ,Input,message } from 'antd';
import {reqLogin } from '../../api';


import logo from './lo.jpg';


import './index.less';



@Form.create()
class Login extends Component {
  // 自定义表单校验规则
  validator = (rule, value, callback) => {
    /*
      rule.field 获取表单key
      value 获取表单value
    */
    // console.log(rule, value);

    const name = rule.field === 'username' ? '用户名' : '密码';

    const reg = /^\w+$/;

    if (!value) {
      // 输入值为空
      callback(`${name}不能为空`);
    } else if (value.length < 4) {
      callback(`${name}必须大于4位`);
    } else if (value.length > 15) {
      callback(`${name}必须小于15位`);
    } else if (!reg.test(value)) {
      callback(`${name}只能包含英文、数字、下划线`);
    }
    /*
      callback() 调用不传参，代表表单校验成功
      callback(message) 调用传参，代表表单校验失败，会提示message错误
    */
    // 必须要调用，否则会出问题
    callback();
  };
  login =e =>{
    //阻止默认行为
    e.preventDefault();
    //表单校验
    //手机表单数据并收集数据
    this.props.form.validateFields((err, values) => {
        /*
          err 错误对象
            如果表单校验失败，就有错误，值是对象
            如果表单校验成功，就没有错误，值是null
          values
            收集的表单数据
        */
      if(!err){
        //表单校验成功
        const {username,password} =values;
        //发送请求
        axios
        .post('/api/login',{username,password})
        .then(response=>{
          //请求成功   判断是否登录成功
          if (response.data.status === 0){
            //说明登录成功   跳转到我们的Home界面
            this.props.history.replace('/');
          }else{
            //else  表明登录失败  返回一些提示给用户
            message.err(response.data.msg);
            //登录失败，把密码框清空  让用户重新输入
            this.props.form.resetFields(['password']);
          }
        })
        .catch(err=>{
          //提示错误
          message.error('网络出现错误');
          //清空密码框
          this.props.form.resetFields(['password']);
        });
      }
  });
};


  render() {
    // getFieldDecorator 高阶组件：用来表单校验
    const { getFieldDecorator } = this.props.form;

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt='logo' />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-section'>
          <h3>用户登录</h3>
          <Form className='login-form' onSubmit={this.login}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  /* {
                    required: true,
                    message: '用户名不能为空'
                  },
                  {
                    min: 4,
                    message: '用户名必须大于3位'
                  },
                  {
                    max: 15,
                    message: '用户名必须小于15位'
                  },
                  {
                    pattern: /^\w+$/,
                    message: '用户名只能包含英文、数字、下划线'
                  } */

                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='用户名'
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='密码'
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button className='login-form-btn' type='primary' htmlType='submit'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

// Form.create()(Login) 高阶组件：给Login传递form属性
// export default Form.create()(Login);
export default Login;