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
                
                    {loggedIn && 
                        <MenuLink to="/createRecipe" ativestyle="true">
                            create Recipe
                        </MenuLink>
                    }
                    
                   
                    {loggedIn &&
                        <MenuLink to= "/myRecipes" ativestyle="true">
                            My recipes
                        </MenuLink>
                    }
                   
                    {loggedIn && isAdmin &&
                        <MenuLink to="/ingredients" ativestyle="true">
                            ingredients
                        </MenuLink>
                    }
                 
                    {loggedIn && isAdmin &&
                        <MenuLink to="/createIngredient" ativestyle="true">
                            create ingredient
                        </MenuLink>
                    }
                    
                    {loggedIn &&
                        <MenuLink to="/recipes" ativestyle="true">
                            recipes
                        </MenuLink>
                    }
                    
                    {loggedIn &&
                        <MenuLink to="/" ativestyle="true">
                            Home
                        </MenuLink>
                    }
                  
                    {loggedIn &&
                        <MenuLink to="/about" ativestyle="true">
                            About
                        </MenuLink>
                    }
                   

                    
                    {loggedIn ? (<MenuLink to="/" ativestyle="true" onClick={logout}> Logout </MenuLink> ) : (<MenuLink to="/login" ativestyle="true"> Login </MenuLink>)}

                   
                </Menu>
            </PrimaryNav>
        </>
  )
}
export default Navbar