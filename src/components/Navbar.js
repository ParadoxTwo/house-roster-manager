import {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { Nav, NavBtn, NavMenuBar, NavLink, NavMenu, Bars, Cross } from './NavbarElements'

const Navbar = () => {
    const [menuOpened, toggleMenu] = useState(false)
    const {user} = useAuth0()
    const [loggedIn, toggleLogin] = useState(user&&true)

    useEffect(()=>{
        toggleLogin(user&&true)
    },[user])

    return (
        <div>
            <Nav>
                <NavLink to='/'>
                    <img height='60px' src='logo192.png'/>
                    <h1>Croso</h1>
                </NavLink>
                <Bars onClick={()=>toggleMenu(!menuOpened)}/>
                <NavMenu>
                    <NavLink to='/home' activeStyle>
                        HOME
                    </NavLink>
                    <NavLink to='/about' activeStyle>
                        ABOUT
                    </NavLink>
                    <NavLink to='/contact-us' activeStyle>
                        CONTACT US
                    </NavLink>
                </NavMenu>
                <NavMenuBar menuOpened={menuOpened}>
                    <Cross onClick={()=>toggleMenu(!menuOpened)}/>
                    <NavLink to='/home' onClick={()=>toggleMenu(!menuOpened)} activeStyle>
                        HOME
                    </NavLink>
                    <NavLink to='/about' onClick={()=>toggleMenu(!menuOpened)} activeStyle>
                        ABOUT
                    </NavLink>
                    <NavLink to='/contact-us' onClick={()=>toggleMenu(!menuOpened)} activeStyle>
                        CONTACT US
                    </NavLink>
                    {loggedIn?<LogoutButton/>:
                    <LoginButton/>}
                </NavMenuBar>
                <NavBtn>
                    {loggedIn?<LogoutButton/>:
                    <LoginButton/>}
                </NavBtn>
            </Nav>
        </div>
    )
}

export default Navbar
