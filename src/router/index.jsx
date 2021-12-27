import React from 'react';
// import {HashRouter as Router, useRoutes, Navigate} from 'react-router-dom';
import {HashRouter as Router, Navigate, useRoutes} from 'react-router-dom';

import Login from '../views/Login';
import SandBox from '../views/SandBox';
import Home from '../views/SandBox/Home';
import UserList from '../views/SandBox/UserManage/UserList';
import RightList from '../views/SandBox/RightManage/RightList';
import RoleList from '../views/SandBox/RightManage/RoleList';
import NoPermission from '../views/SandBox/NoPermission';

function IndexRouter() {
    return useRoutes([
        {
            path: '/',
            // element: localStorage.getItem('token') ? <SandBox/> : <Navigate replace to='/login'/>,
            element: <SandBox/>,
            children: [
                {
                    path: '/home',
                    element: <Home/>
                },
                {
                    path: '/user-manage/list',
                    element: <UserList/>
                },
                {
                    path: '/right-manage/right/list',
                    element: <RightList/>
                },
                {
                    path: '/right-manage/role/list',
                    element: <RoleList/>
                },
                {
                    path: '/',
                    element: <Navigate replace to='/home'/>
                },
                {
                    path: '*',
                    element: <NoPermission/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login/>
        }
    ])
}

const RouterWrapper = () => {
    return (
        <Router>
            <IndexRouter/>
        </Router>
    )
}

export default RouterWrapper;
