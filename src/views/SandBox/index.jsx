import React from 'react';
import {Layout} from 'antd';

import SideMenu from '../../components/SandBox/SideMenu';
import TopHeader from '../../components/SandBox/TopHeader';
import MainContent from '../../components/SandBox/MainContent';

import './index.css';

function SandBox(props) {
    return (
        <Layout>
            <SideMenu/>
            <Layout className="site-layout">
                <TopHeader/>
                <MainContent/>
            </Layout>
        </Layout>
    );
}

export default React.memo(SandBox);
