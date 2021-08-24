import {useState} from 'react'
import { Nav, NavBtn, NavBtnLink, NavMenuBar, NavLink, NavMenu, Bars, Cross } from './NavbarElements'

const Navbar = () => {
    const [menuOpened, toggleMenu] = useState(false)
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
                    <NavBtnLink to='/signin' className="Btn">Sign In</NavBtnLink>
                </NavMenuBar>
                <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </div>
    )
}

export default Navbar
