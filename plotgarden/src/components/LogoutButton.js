import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {

    const { logout, isAuthenticaed } = useAuth0();
    return(
        isAuthenticaed && (
            <button onClick={() => logout}>
                Sign Out
            </button>
        )
    )
}

export default LogoutButton;