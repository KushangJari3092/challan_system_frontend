import { useContext, useEffect, useState, React } from 'react';

import { Descriptions } from 'antd';
export default function ViewChallan({ status }) {
    const [challans, setChallans] = useState({})
    console.log('status :>> ', status);
    var count = 1;
    useEffect(async () => {
        try {
            // setLoad(true)
            const res = await fetch("http://localhost:7100/getChallans", {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            // console.log('data in view challans :>> ', data);

            // if (data[0].user) setLoad(false)
            setChallans(data)

        } catch (err) {
            console.log('err in info card :>> ', err);
        }
    }, [])
    return (
        <>
            <div>

                <h4 align="center">{status} </h4>
                {
                    Object.keys(challans).map((challan) => {
                        return (

                            <div className='challans'>
                                {status === 'All Challans' &&

                                    <Descriptions Descriptions
                                        title={count++ + ".  Challan ID :-  " + challans[challan]._id
                                        }
                                        bordered
                                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                    >
                                        <Descriptions.Item label="License number">{challans[challan].licenseNo}</Descriptions.Item>
                                        <Descriptions.Item label="Mobile number">{challans[challan].mobile}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{challans[challan].email}</Descriptions.Item>
                                        <Descriptions.Item label="Vehicle type">{challans[challan].vehicleType}</Descriptions.Item>
                                        <Descriptions.Item label="Offense">{challans[challan].offense}</Descriptions.Item>
                                        <Descriptions.Item label="time">{challans[challan].time}</Descriptions.Item>
                                        <Descriptions.Item label="date">{challans[challan].date}</Descriptions.Item>
                                        <Descriptions.Item label="Due Date" ><span style={{ color: 'red' }}>{challans[challan].dueDate}</span></Descriptions.Item>
                                        <Descriptions.Item label="Amount"><b>{challans[challan].amount}</b></Descriptions.Item>
                                        <Descriptions.Item label="Status">
                                            <span style={challans[challan].status === 'pending' ? { color: 'red' } : { color: 'green' }}>{challans[challan].status}</span>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Police officer">{challans[challan].policeName}</Descriptions.Item>
                                        <Descriptions.Item label="Place">{challans[challan].place}</Descriptions.Item>
                                    </Descriptions>
                                }
                                {status === 'Pending Challans' && challans[challan].status === 'pending' &&

                                    <Descriptions Descriptions
                                        title={count++ + ".  Challan ID :-  " + challans[challan]._id
                                        }
                                        bordered
                                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                    >
                                        <Descriptions.Item label="License number">{challans[challan].licenseNo}</Descriptions.Item>
                                        <Descriptions.Item label="Mobile number">{challans[challan].mobile}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{challans[challan].email}</Descriptions.Item>
                                        <Descriptions.Item label="Vehicle type">{challans[challan].vehicleType}</Descriptions.Item>
                                        <Descriptions.Item label="Offense">{challans[challan].offense}</Descriptions.Item>
                                        <Descriptions.Item label="time">{challans[challan].time}</Descriptions.Item>
                                        <Descriptions.Item label="date">{challans[challan].date}</Descriptions.Item>
                                        <Descriptions.Item label="Due Date" ><span style={{ color: 'red' }}>{challans[challan].dueDate}</span></Descriptions.Item>
                                        <Descriptions.Item label="Amount"><b>{challans[challan].amount}</b></Descriptions.Item>
                                        <Descriptions.Item label="Status">
                                            <span style={challans[challan].status === 'pending' ? { color: 'red' } : { color: 'green' }}>{challans[challan].status}</span>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Police officer">{challans[challan].policeName}</Descriptions.Item>
                                        <Descriptions.Item label="Place">{challans[challan].place}</Descriptions.Item>
                                    </Descriptions>
                                }

                            </div>


                        )
                    })
                }
            </div >
        </>
    )
}
