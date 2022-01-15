import React, {forwardRef, useState, useEffect} from 'react';
import {Form, Input, Select} from 'antd';

const AddUser = forwardRef((props, ref) => {

    const {regionList, roleList, isAddRegionDisabled, isUpdateRegionDisabled} = props;

    const [isDisabled, setIsdisabled] = useState(false);

    useEffect(() => {
        setIsdisabled(isAddRegionDisabled)
    }, [isAddRegionDisabled])

    useEffect(() => {
        setIsdisabled(isUpdateRegionDisabled)
    }, [isUpdateRegionDisabled]);

    const updateRegionIsDisabled = (value) => {
        if (value === 1) {
            setIsdisabled(true);
            ref.current.setFieldsValue({
                region: ''
            })
        } else {
            setIsdisabled(false);
        }
    }

    return (
        <Form layout="vertical" ref={ref}>
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色类型"
                rules={[{ required: true, message: '请选择角色类型' }]}
            >
                <Select onChange={(value) => updateRegionIsDisabled(value)}>
                    {
                        roleList.map((item) => {
                            return (
                                <Select.Option value={item.id} key={item.id} >
                                    {item.roleName}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisabled ? [] : [{ required: true, message: '请选择区域' }]}
            >
                <Select disabled={isDisabled}>
                    {
                        regionList.map((item) => {
                            return (
                                <Select.Option value={item.value} key={item.id}>
                                    {item.value}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    );
})

export default React.memo(AddUser);
