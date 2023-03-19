import React, { useState, useEffect } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch, Descriptions, Spin } from 'antd';
const { Meta } = Card;

export default function InfoCard() {

    const [adminData, setAdminData] = useState({})
    const [load, setLoad] = useState(false)
    const getInformation = async () => {
        try {
            setLoad(true)
            const res = await fetch("http://localhost:7100/getData", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (data.aId) setLoad(false)
            console.log('data :>> ', data);
            setAdminData(data);

        } catch (err) {
            console.log('err in info card :>> ', err);
        }
    }
    useEffect(() => {
        getInformation();
    }, [])
    if (load) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin tip="Fetching Admin data...." size="large" />
                </div>
            </>
        )
    } else {
        return (
            <>

                <form method='GET'>
                    <div className="" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h4>Admin Information</h4>

                        <Card className='infoCard mt-0 pt-0'>
                            <Meta
                                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                                title={adminData.aName}

                            />
                            <div className="info">
                                <Descriptions title="Information">
                                    <Descriptions.Item label="ID">{adminData.aId}</Descriptions.Item>
                                    <Descriptions.Item label="Mobile">{adminData.aMobile}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{adminData.aEmail}</Descriptions.Item>
                                    <Descriptions.Item label="Adhhar card">{adminData.aAdhaar}</Descriptions.Item>
                                    <Descriptions.Item label="Gender">{adminData.aGender}</Descriptions.Item>
                                    <Descriptions.Item label="Birth Date">{adminData.aBday}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{adminData.aAddress}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        </Card>
                    </div>
                </form>



            </>
        )
    }
}
