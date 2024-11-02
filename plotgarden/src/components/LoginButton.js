import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {

    const { loginWithRedirect, isAuthenticaed } = useAuth0();

    return(
        !isAuthenticaed && (
            <button onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        )
    )
}

export default LoginButton;