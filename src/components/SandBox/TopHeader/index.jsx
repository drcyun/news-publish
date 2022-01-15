import React, {useState, useCallback} from 'react';
import {Layout, Dropdown, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

const {Header} = Layout;

function TopHeader(props) {

    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const {username} = JSON.parse(localStorage.getItem('token'));

    const toggle = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed])

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login', {replace: true})
    }

    const menu = (
        <Menu>
            <Menu.Item key="0" danger onClick={logout}>
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <Header className="site-layout-background" style={{padding: '0 16px'}}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={toggle}/> : <MenuFoldOutlined onClick={toggle}/>
            }
            <div style={{float: 'right', marginRight: '20px'}}>
                欢迎
                <Dropdown overlay={menu} trigger={['click']}>
                    <span style={{textDecoration: 'underline', color: 'red'}}>{username}</span>
                </Dropdown>
                回来
            </div>

        </Header>
    );
}

export default React.memo(TopHeader);
