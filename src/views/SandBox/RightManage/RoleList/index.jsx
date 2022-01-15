import React, {useEffect, useState} from 'react';

import axios from 'axios';

import {Button, Table, Modal, Tree} from 'antd';
import {DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

function RoleList(props) {

    const [dataSource, setDataSource] = useState([]);

    const [rightsList, setRightsList] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [currentId, setCurrentId] = useState(0);

    const [currentRights, setCurrentRights] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/roles').then(res => {
            setDataSource(res.data);
        })
        axios.get('http://localhost:5000/rights?_embed=children').then(res => {
            setRightsList(res.data);
        })
    }, []);

    const deleteRole = (item) => {
        setDataSource(dataSource.filter((data => {
            return data.id !== item.id;
        })))
        axios.delete(`http://localhost:5000/roles/${item.id}`);
    }

    const isConfirmDelete = (item) => {
        confirm({
            title: '您确定要删除吗?',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                deleteRole(item);
            },
            onCancel() {
                console.log('取消');
            },
        });
    }

    const showModal = (item) => {
        setIsModalVisible(true);
        setCurrentRights(item.rights);
        setCurrentId(item.id);
    }

    const onCheck = (checkedKeys) => {
        setCurrentRights(checkedKeys.checked);
    }

    const handleOk = () => {
        setIsModalVisible(false);
        setDataSource(dataSource.map((data) => {
            if (data.id === currentId) {
                return {
                    ...data,
                    rights: currentRights
                }
            }
            return data;
        }))
        axios.patch(`http://localhost:5000/roles/${currentId}`,{
            rights: currentRights
        })
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return (
                    <b>{id}</b>
                )
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button danger
                                type='primary'
                                shape='circle'
                                icon={<DeleteOutlined/>}
                                onClick={() => isConfirmDelete(item)}
                        />
                        <Button type='primary'
                                shape='circle'
                                icon={<UnorderedListOutlined/>}
                                onClick={() => showModal(item)}
                        />
                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <Table dataSource={dataSource}
                   columns={columns}
                   rowKey={(item) => item.id}
                   pagination={{pageSize: 5}}
            />
            <Modal title='权限列表'
                   visible={isModalVisible}
                   okText='确定'
                   cancelText='取消'
                   onOk={handleOk}
                   onCancel={handleCancel}
            >
                <Tree
                    checkable
                    checkStrictly
                    checkedKeys={currentRights}
                    treeData={rightsList}
                    onCheck={onCheck}
                />
            </Modal>
        </div>
    );
}

export default React.memo(RoleList);
