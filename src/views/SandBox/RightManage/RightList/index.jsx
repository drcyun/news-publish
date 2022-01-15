import React, {useState, useEffect} from 'react';

import {Table, Tag, Button, Modal, Popover, Switch} from 'antd';
import axios from 'axios';

import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function RightList(props) {

    const [dataSource,setDataSource] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then(res => {
            const list = res.data.map((item) => {
                if (item.children.length === 0) {
                    item.children = null;
                }
                return item;
            });
            setDataSource(list);
        })
    },[])

    const deleteRight = (item) => {
        // 当前页面同步状态 + 同步后端
        if (item.grade === 1) {
            setDataSource(dataSource.filter((data) => {
                return data.id !== item.id;
            }))
            axios.delete(`http://localhost:5000/rights/${item.id}`);
        } else {
            setDataSource(dataSource.map((data) => {
               if (data.id === item.rightId) {
                   data.children = data.children.filter((data) => {
                        return data.id !== item.id
                   })
               }
               return data;
            }))
            axios.delete(`http://localhost:5000/children/${item.id}`);
        }

    }

    const isConfirmDelete = (item) => {
        confirm({
            title: '您确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                deleteRight(item);
            },
            onCancel() {
                console.log('取消');
            },
        });
    }

    const switchChange = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
        setDataSource([...dataSource]);

        if (item.grade === 1) {
            axios.patch(`http://localhost:5000/rights/${item.id}`,{
                pagepermisson: item.pagepermisson
            })
        } else {
            axios.patch(`http://localhost:5000/children/${item.id}`,{
                pagepermisson: item.pagepermisson
            })
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color='orange'>{key}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button danger type='primary' shape='circle' icon={<DeleteOutlined/>}
                        onClick={() => isConfirmDelete(item)}/>
                        <Popover
                            content={
                                <div style={{textAlign: 'center'}}>
                                    <Switch checked={item.pagepermisson}
                                            onChange={() => switchChange(item)}
                                    />
                                </div>
                            }
                            title="页面配置项"
                            trigger={item.pagepermisson === undefined ? '' : 'click'}
                        >
                            <Button type='primary'
                                    shape='circle'
                                    icon={<EditOutlined/>}
                                    disabled={item.pagepermisson === undefined}
                            />
                        </Popover>
                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 5}} />
        </div>
    );
}

export default React.memo(RightList);
