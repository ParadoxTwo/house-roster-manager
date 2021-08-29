import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'

const LoginButton = () => {
    const {loginWithRedirect} = useAuth0()
    return (
        <Button style={{height: '40px'}}  variant = {'contained'} color = {'primary'} onClick = {()=>loginWithRedirect()}>
            Sign In / Sign Up
        </Button>
    )
}

export default LoginButton
