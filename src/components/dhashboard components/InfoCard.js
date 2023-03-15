import React, { useState, useEffect } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch, Descriptions } from 'antd';
const { Meta } = Card;

export default function InfoCard() {
    const [loading, setLoading] = useState(false);
    const onChange = (checked) => {
        setLoading(!checked);
    };
    const getInformation = async () => {
        // const res = await fetch('')
    }
    useEffect(() => {
        getInformation();
    }, [])
    return (
        <>
            {/* <Switch checked={!loading} onChange={onChange} /> */}

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h4>Admin Information</h4>

                <Card className='infoCard' loading={loading}>
                    <Meta
                        avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                        title="Admin name"
                        description=""
                    />
                    <div className="info">
                        <Descriptions title="Information">
                            <Descriptions.Item label="ID">Zhou Maomao</Descriptions.Item>
                            <Descriptions.Item label="Mobile">1810000000</Descriptions.Item>
                            <Descriptions.Item label="Email">Hangzhou, Zhejiang</Descriptions.Item>
                            <Descriptions.Item label="Adhhar card">empty</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                            </Descriptions.Item>
                        </Descriptions>

                    </div>
                </Card>
            </div>



        </>
    )
}
