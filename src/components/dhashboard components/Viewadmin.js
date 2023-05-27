import { useContext, useEffect, useState, React } from 'react';
import { Descriptions } from 'antd';
export default function Viewadmin() {
    const [admins, setAdmins] = useState({})
    var count = 1;


    useEffect(async () => {
        try {
            const res = await fetch("http://localhost:7100/getAdmins", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();

            setAdmins(data)

        } catch (err) {
            console.log('err in info card :>> ', err);
        }
    }, [])
    return (
        <>
            <div>

                <h4 align="center">Admins</h4>
                {
                    Object.keys(admins).map((admin) => {
                        return (

                            <div className='admins mt-5'>

                                <Descriptions
                                    title={count++ + ".  Admin ID :-  " + admins[admin]._id}
                                    bordered
                                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                >
                                    <Descriptions.Item label="name">{admins[admin].aName}</Descriptions.Item>
                                    <Descriptions.Item label="id">{admins[admin].aId}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{admins[admin].aEmail}</Descriptions.Item>
                                    <Descriptions.Item label="gender">{admins[admin].aGender}</Descriptions.Item>
                                    <Descriptions.Item label="mobile">{admins[admin].aMobile}</Descriptions.Item>
                                    <Descriptions.Item label="adhaar">{admins[admin].aAdhaar}</Descriptions.Item>
                                    <Descriptions.Item label="birth date">{admins[admin].aBday}</Descriptions.Item>
                                    <Descriptions.Item label="Address">{admins[admin].aAddress}</Descriptions.Item>
                                </Descriptions>
                            </div>


                        )
                    })
                }
            </div >
        </>
    )
}