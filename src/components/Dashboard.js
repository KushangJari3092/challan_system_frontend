import React from 'react'
import { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom"
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
import { color } from '@mui/system';
import { Layout, Menu, theme } from 'antd';
import Register from './Register';
import InfoCard from './dhashboard components/InfoCard';
const { Header, Content, Footer, Sider } = Layout;


export default function Dashboard() {
    // const location = useLocation();
    // const currentPath = location.pathname;
    // alert(currentPath);
    const [collapsed, setCollapsed] = useState(false);
    const [sliderItem, setSliderItem] = useState('dashboard')
    const [registerFor, setRegisterFor] = useState('')
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const history = useHistory()
    return (
        <>
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
                        <Content className='dashboardContent'>
                            <div className="dashboardContainer">
                                <div style={{ padding: 20, }}>
                                    {/* <p>long content</p> */}
                                    {sliderItem === 'registration' && <Register registerFor={registerFor} />}
                                    {sliderItem === 'dashboard' && <InfoCard />}
                                </div>
                            </div>
                        </Content>
                        <Footer className='footer'>
                            Challan System - Design Engineering ©20cp026 by Kushang Jariwala
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        </>
    )
}
