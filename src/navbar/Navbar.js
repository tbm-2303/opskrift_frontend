import React from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger } from './NavElement'

const Navbar = ({user, loggedIn, logout}) => {
    let isAdmin = false;
    if(user.roles.includes("admin") ){
        isAdmin = true;
    }
    return (
        <>
            <PrimaryNav>
                <Hamburger/>
                <Menu>
                    {isAdmin &&
                    
                    <MenuLink to="/admin method1" ativestyle="true">
                        admin method1
                    </MenuLink>
                    
                    }
                
                {isAdmin &&
                    
                    <MenuLink to="/admin method2" ativestyle="true">
                        admin method2
                    </MenuLink>
                    
                    }

                    <MenuLink to="/ingredients" ativestyle="true">
                        ingredients
                    </MenuLink>
                
                    <MenuLink to="/listtest1" ativestyle="true">
                        list test 1
                    </MenuLink>

                    <MenuLink to="/test" ativestyle="true">
                        test
                    </MenuLink>

                    <MenuLink to="/recipes" ativestyle="true">
                        recipes
                    </MenuLink>

                    <MenuLink to="/" ativestyle="true">
                        Home
                    </MenuLink>
                    <MenuLink to="/about" ativestyle="true">
                        About
                    </MenuLink>
                    <MenuLink to="/joke" ativestyle="true">
                        Joke
                    </MenuLink>
                    {loggedIn ? (<MenuLink to="/" ativestyle="true" onClick={logout}> Logout </MenuLink> ) : (<MenuLink to="/login" ativestyle="true"> Login </MenuLink>)}

                   
                </Menu>
            </PrimaryNav>
        </>
  )
}
export default Navbar