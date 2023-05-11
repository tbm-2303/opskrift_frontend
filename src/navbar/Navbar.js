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
                    
                    <MenuLink to="/CreateRecipeNew" ativestyle="true">
                        Create Recipe New
                    </MenuLink>
                    
                    }
                
                    {isAdmin &&
                    
                    <MenuLink to="/createRecipe" ativestyle="true">
                        create Recipe
                    </MenuLink>
                    
                    }

                

                    <MenuLink to="/ingredients" ativestyle="true">
                        ingredients
                    </MenuLink>

                    <MenuLink to="/recipes" ativestyle="true">
                        recipes
                    </MenuLink>

                    <MenuLink to="/reviews" ativestyle="true">
                        reviews
                    </MenuLink>

                    <MenuLink to="/" ativestyle="true">
                        Home
                    </MenuLink>

                    <MenuLink to="/about" ativestyle="true">
                        About
                    </MenuLink>

                    
                    {loggedIn ? (<MenuLink to="/" ativestyle="true" onClick={logout}> Logout </MenuLink> ) : (<MenuLink to="/login" ativestyle="true"> Login </MenuLink>)}

                   
                </Menu>
            </PrimaryNav>
        </>
  )
}
export default Navbar