import React from 'react';
import axios from 'axios';

import {Form, Button, Input, message} from 'antd';

import {UserOutlined, LockOutlined,} from '@ant-design/icons';

import './index.css';
import {useNavigate} from 'react-router-dom';

function Login(props) {

    const navigate = useNavigate();

    const onFinish = (values) => {
        const {username, password} = values;
        axios.get(`http://localhost:5000/users?username=${username}&password=${password}&roleState=true&_expand=role`)
            .then(res => {
                if (res.data.length === 0) {
                    message.error('用户名和密码不匹配');
                } else {
                    localStorage.setItem('token', JSON.stringify(res.data[0]));
                    navigate('/', {replace: true});
                }
            })
    }

    return (
        <div style={{backgroundColor: 'rgb(35,39,65)', height: '100%'}}>
            <div className='loginContent'>
                <div className='loginTitle'>全球新闻发布管理系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
