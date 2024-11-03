import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

const LoginMessage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <p>Please log in to access this page.</p>
            <div className="login-message-btn">
                <LoginButton/>
            </div>
        </div>
    )
}

export default LoginMessage;