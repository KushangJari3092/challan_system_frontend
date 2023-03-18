import React from 'react'
import { useState, useContext, useEffect } from 'react';
import context from "../Context/userContext";
import { useHistory, NavLink, useLocation } from "react-router-dom"
import '../style/dashboard.css'
import {
    QuestionCircleOutlined,
    DashboardOutlined,
    SnippetsOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    UnorderedListOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import Cookies from "js-cookie";
import { Layout, Menu, theme, message, Result } from 'antd';
import Register from './Register';
import InfoCard from './dhashboard components/InfoCard';
const { Header, Content, Footer, Sider } = Layout;


export default function Dashboard() {

    const { user, setUser, nav, setNav, setLogged } = useContext(context);
    const [collapsed, setCollapsed] = useState(false);
    const [sliderItem, setSliderItem] = useState('dashboard')
    const [registerFor, setRegisterFor] = useState('')
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [messageApi, contextHolder] = message.useMessage();

    const SuccessMsg = () => {
        messageApi.open({
            type: 'success',
            content: (
                <Result
                    status="success"
                    title={Cookies.get('person') + " Login successful"}
                />
            ),
            duration: 3,
            style: {
                marginTop: '10vh',
            },
        });

    };
    useEffect(() => {
        setNav(false);
        if (Cookies.get('person')) { setLogged(true) } else { setLogged(false) }
        SuccessMsg();
    }, []);


    const history = useHistory()
    if (!user._id) {
        return (
            <>
                <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>loading...</h2>
                    <NavLink to='../' className='nav-link'>Go to Home</NavLink>
                </div>
            </>
        )
    } else {
        return (
            <>
                {/* {contextHolder} */}
                <div className='dashboard'>
                    <Layout hasSider className='main'>
                        <Sider className='sider' collapsible trigger={null} collapsed={collapsed} width={210}>
                            <div
                                style={{
                                    height: 32,
                                    margin: 15,
                                    borderRadius: '7px',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    textAlign: "center",
                                    color: 'white',
                                }}
                            >
                                Logo
                            </div>

                            <div className="menubar">

                                <div className="up">
                                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}
                                        items={[
                                            {
                                                key: '1',
                                                icon: <UsergroupAddOutlined />,
                                                label: 'Registration',
                                                children: [
                                                    {
                                                        key: 'admin',
                                                        icon: <UserOutlined />,
                                                        label: 'Admin',
                                                        onClick: () => {
                                                            setSliderItem('registration')
                                                            setRegisterFor('Admin')
                                                        }
                                                    },
                                                    {
                                                        key: 'police',
                                                        icon: <UserOutlined />,
                                                        label: 'Policeman',
                                                        onClick: () => {
                                                            setSliderItem('registration')
                                                            setRegisterFor('Police')
                                                        }
                                                    }
                                                ],

                                            },
                                            {
                                                key: 'manage',
                                                icon: <SettingOutlined />,
                                                label: 'Manage',
                                                children: [
                                                    {
                                                        key: 'admin manage',
                                                        icon: <UserOutlined />,
                                                        label: 'Admin',
                                                        onClick: () => {
                                                            setSliderItem('manage')
                                                        }
                                                    },
                                                    {
                                                        key: 'police manage',
                                                        icon: <UserOutlined />,
                                                        label: 'Policeman',
                                                        onClick: () => {
                                                            setSliderItem('manage')
                                                        }
                                                    }
                                                ],
                                                onClick: () => {

                                                }
                                            },
                                            {
                                                key: 'challans',
                                                icon: <UnorderedListOutlined />,
                                                label: 'View Challans',
                                                children: [
                                                    {
                                                        key: 'all',
                                                        icon: <SnippetsOutlined />,
                                                        label: 'All',
                                                        onClick: () => {
                                                            setSliderItem('view challans')
                                                        }
                                                    },
                                                    {
                                                        key: 'new',
                                                        icon: <PlusCircleOutlined />,
                                                        label: 'New',
                                                        onClick: () => {
                                                            setSliderItem('view challans')
                                                        }
                                                    },
                                                    {
                                                        key: 'pending',
                                                        icon: <ExclamationCircleOutlined />,
                                                        label: 'Pending',
                                                        onClick: () => {
                                                            setSliderItem('view challans')
                                                        }
                                                    }
                                                ],
                                                onClick: () => {
                                                    setSliderItem('')
                                                }
                                            },
                                            {
                                                key: 'about',
                                                icon: <QuestionCircleOutlined />,
                                                label: 'About Challans',

                                                onClick: () => {
                                                    setSliderItem('info')
                                                }
                                            },
                                            {
                                                key: 'dashboard',
                                                icon: <DashboardOutlined />,
                                                label: 'Dashboard',
                                                onClick: () => {
                                                    setSliderItem('dashboard')
                                                }
                                            },

                                        ]} />
                                </div>
                                <div className="down">
                                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}
                                        items={[

                                            {
                                                key: 'home',
                                                icon: <HomeOutlined />,
                                                label: 'Home',
                                                onClick: () => {
                                                    setNav(true)
                                                    setSliderItem('home')
                                                    history.push('/')
                                                },
                                            },
                                        ]} />
                                </div>
                            </div>

                        </Sider>

                        <Layout
                            className="site-layout"
                            style={{
                                marginLeft: 15,
                                marginRight: 15,
                                minHeight: '100vh'
                            }}
                        >
                            <Header className='header'>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })}
                                <h4>Admin Dashboard</h4>
                            </Header>
                            <Content className='dashboardContent' style={{ padding: 0, paddingBottom: 20 }}>
                                <div className="dashboardContainer">
                                    <div style={{ padding: 20 }}>
                                        {sliderItem === 'registration' && <Register registerFor={registerFor} />}
                                        {sliderItem === 'dashboard' && <InfoCard />}
                                    </div>
                                </div>
                            </Content>
                            <Footer className='footer'>
                                Challan System - Design Engineering ©20cp026-20cp034-20cp016
                            </Footer>
                        </Layout>
                    </Layout>
                </div>
            </>
        )
    }
}
