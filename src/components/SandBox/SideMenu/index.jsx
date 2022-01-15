import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Layout, Menu} from 'antd';

import './index.css';
import {useLocation, useNavigate} from 'react-router-dom';

const {Sider} = Layout;
const {SubMenu} = Menu;



function SideMenu() {

    const [collapsed] = useState(false);

    const [menuList, setMenuList] = useState([]);

    const {role: {rights}} = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then(res => {
            setMenuList(res.data);
        })
    },[])

    const navigate = useNavigate();
    const location = useLocation();
    const openKeys = ['/' + location.pathname.split('/')[1]];

    const renderMenu = (menuList) => {
        return menuList.map(menu => {
            if (menu.pagepermisson && rights.includes(menu.key)) {
                return (menu.children?.length > 0 ?
                    <SubMenu key={menu.key} title={menu.title}>
                        {renderMenu(menu.children)}
                    </SubMenu>
                    :
                    <Menu.Item key={menu.key} onClick={() => {navigate(menu.key, {replace: true})}}>{menu.title}</Menu.Item>)
            }
            return null;
        })
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
                <div className="logo">全球新闻发布管理系统</div>
                <div style={{flex: 1, overflow: 'auto'}}>
                    <Menu theme="dark" mode="inline" selectedKeys={location.pathname} defaultOpenKeys={openKeys}>
                        {
                            renderMenu(menuList)
                        }
                    </Menu>
                </div>
            </div>
        </Sider>
    );
}

export default React.memo(SideMenu);
