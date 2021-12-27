import React from 'react';
import {Outlet} from 'react-router-dom';
import SideMenu from '../../components/SandBox/SideMenu';
import TopHeader from '../../components/SandBox/TopHeader';

function SandBox(props) {
    return (
        <div>
            <SideMenu/>
            <TopHeader/>
            <Outlet/>
        </div>
    );
}

export default SandBox;
