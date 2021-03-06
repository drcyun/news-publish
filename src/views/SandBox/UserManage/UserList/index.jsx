import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Button, Table, Modal, Switch} from 'antd';
import {DeleteOutlined, ExclamationCircleOutlined, EditOutlined} from '@ant-design/icons';

import AddUser from '../../../../components/User-Manage/AddUser';

const {confirm} = Modal;

function UserList(props) {

    const [users, setUsers] = useState([]);

    const [roleList, setRoleList] = useState([]);

    const [regionList, setRegionList] = useState([]);

    const [isAddVisible, setIsAddVisible] = useState(false);

    const [isUpdateVisible, setIsUpdateVisible] = useState(false);

    const [isAddRegionDisabled, setIsAddRegionDisabled] = useState(false);

    const [isUpdateRegionDisabled, setIsUpdateRegionDisabled] = useState(false);

    const [currentUpdateUser, setCurrentUpdateUser] = useState(null);

    const addUserRef = useRef(null);

    const updateUserRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5000/users?_expand=role').then(res => {
            setUsers(res.data);
        })
        axios.get('http://localhost:5000/roles').then(res => {
            setRoleList(res.data);
        })
        axios.get('http://localhost:5000/regions').then(res => {
            setRegionList(res.data);
        })
    }, [])

    const showAddUserModal = () => {
        setIsAddVisible(true);
    }

    const showUpdateUserModal = (item) => {
        setTimeout(() => {
            setIsUpdateVisible(true);
            if (item.roleId === 1) {
                setIsUpdateRegionDisabled(true);
            } else {
                setIsUpdateRegionDisabled(false);
            }
            updateUserRef.current.setFieldsValue(item);
        },0)
        setCurrentUpdateUser(item);
    }

    const handleAddOk = () => {
        addUserRef.current.validateFields().then(res => {
            setIsAddVisible(false);
            addUserRef.current.resetFields();
            axios.post(`http://localhost:5000/users`, {
                ...res,
                'roleState': true,
                'default': false
            }).then(res => {
                setUsers(
                    [
                        ...users,
                        {...res.data, role: roleList.filter((item) => item.id === res.data.roleId)[0]}
                    ]
                );
            })
        })
    }

    const handleAddCancel = () => {
        setIsAddVisible(false);
        addUserRef.current.resetFields();
        setIsAddRegionDisabled(!isAddRegionDisabled);
    }

    const handleUpdateOk = () => {
        updateUserRef.current.validateFields().then(res => {
            setIsUpdateVisible(false);
            setUsers(users.map((data) => {
                if (data.id === currentUpdateUser.id) {
                    return {
                        ...data,
                        ...res,
                        role: roleList.filter((data) => data.id === res.roleId)[0]
                    }
                }
                return data;
            }))
            axios.patch(`http://localhost:5000/users/${currentUpdateUser.id}`,res)
        })
    }

    const handleUpdateCancel = () => {
        setIsUpdateVisible(false);
        setIsUpdateRegionDisabled(!isUpdateRegionDisabled);
    }

    const deleteUser = (item) => {
        setUsers(users.filter((data) => {
           return data.id !== item.id;
        }))
        axios.delete(`http://localhost:5000/users/${item.id}`);
    }

    const isConfirmDelete = (item) => {
        confirm({
            title: '??????????????????????',
            icon: <ExclamationCircleOutlined />,
            okText: '??????',
            cancelText: '??????',
            onOk() {
                deleteUser(item);
            },
            onCancel() {
                console.log('??????');
            },
        });
    }

    const changeRoleState = (item) => {
        setUsers(users.map((user) => {
            if (user.id === item.id) {
                user.roleState = !item.roleState
            }
            return user;
        }))
        axios.patch(`http://localhost:5000/users/${item.id}`,{
            roleState: item.roleState
        })
    }


    const columns = [
        {
            title: '??????',
            dataIndex: 'region',
            filters: [
                {
                    text: '??????',
                    value: '??????'
                },
                ...regionList.map((item) => {
                    return {
                        text: item.title,
                        value: item.value
                    }
                })
            ],
            onFilter: (value, item) => {
                return value === '??????' ? item.region === '' : item.region === value
            },
            render: (region) => {
                return (
                    <b>{region || '??????'}</b>
                )
            }
        },
        {
            title: '????????????',
            dataIndex: 'role',
            render: (role) => {
                return (
                    role?.roleName
                )
            }
        },
        {
            title: '?????????',
            dataIndex: 'username'
        },
        {
            title: '????????????',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return (
                    <Switch checked={roleState}
                            disabled={item.default}
                            onChange={() => changeRoleState(item)}
                    />
                )
            }
        },
        {
            title: '??????',
            render: (item) => {
                return (
                    <div>
                        <Button danger
                                type='primary'
                                shape='circle'
                                disabled={item.default}
                                icon={<DeleteOutlined/>}
                                onClick={() => isConfirmDelete(item)}
                        />
                        <Button type='primary'
                                shape='circle'
                                disabled={item.default}
                                icon={<EditOutlined/>}
                                onClick={() => showUpdateUserModal(item)}
                        />
                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <Button type='primary'
                    style={{margin: '0 0 5px 0'}}
                    onClick={showAddUserModal}
            >
                ????????????
            </Button>
            <Table dataSource={users}
                   columns={columns}
                   rowKey={(item) => item.id}
                   pagination={{pageSize: 5}}
            />
            <Modal
                visible={isAddVisible}
                title='????????????'
                okText='??????'
                cancelText='??????'
                onCancel={handleAddCancel}
                onOk={handleAddOk}
            >
                <AddUser
                    roleList={roleList}
                    regionList={regionList}
                    ref={addUserRef}
                    isAddRegionDisabled={isAddRegionDisabled}
                />
            </Modal>
            <Modal
                visible={isUpdateVisible}
                title='????????????'
                okText='??????'
                cancelText='??????'
                onCancel={handleUpdateCancel}
                onOk={handleUpdateOk}
            >
                <AddUser
                    roleList={roleList}
                    regionList={regionList}
                    ref={updateUserRef}
                    isUpdateRegionDisabled={isUpdateRegionDisabled}
                />
            </Modal>
        </div>
    );
}

export default React.memo(UserList);
