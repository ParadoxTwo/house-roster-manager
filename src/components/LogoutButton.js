import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'

const LogoutButton = () => {
    const {logout} = useAuth0()
    return (
        <Button style={{height: '40px'}} variant = {'contained'} color = {'primary'} onClick = {()=>logout()}>
            Sign Out
        </Button>
    )
}

export default LogoutButton
