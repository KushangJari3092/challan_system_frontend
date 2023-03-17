import React, { useEffect } from 'react'
import { Layout, Menu, theme, message, Result } from 'antd';

export default function ErrorPage() {
    const [messageApi, contextHolder] = message.useMessage();

    const ErrorMsg = () => {
        messageApi.open({
            type: 'error',
            content: (
                <Result
                    status="error"
                    title="Authentication Error"
                />
            ),
            duration: 2,
            style: {
                marginTop: '10vh',
            },
        });

    };
    useEffect(() => {
        ErrorMsg();
    }, []);
    return (
        <div style={{ color: 'red', textAlign: 'center', paddingTop: '15vh' }}>
            {contextHolder}
            <h1>Error...</h1>
            <h4>You are not authenticated</h4>
            <h3 >Only admin can access this page </h3>
        </div>
    )
}
