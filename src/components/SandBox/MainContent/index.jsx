import React from 'react';
import {Outlet} from 'react-router-dom';

import {Layout} from 'antd';
const {Content} = Layout;

function MainContent(props) {
    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                overflow: 'auto'
            }}

        >
            <Outlet/>
        </Content>
    );
}

export default React.memo(MainContent);
